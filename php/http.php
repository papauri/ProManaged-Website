<?php
/* Shared request/response helpers for the public form endpoints.
 *
 * The contract with js/form_intake.js:
 *   - every response is JSON, with an explicit Content-Type;
 *   - the HTTP status is the real signal (2xx accepted, 4xx caller error,
 *     5xx our fault);
 *   - "message" is a human sentence the frontend may show verbatim, so it must
 *     never contain server internals, SMTP output or file paths.
 */

/**
 * Send the single JSON response for this request and stop.
 *
 * The status code is set BEFORE any output. The previous endpoints echoed first
 * and called http_response_code() afterwards, which only worked while the SAPI
 * happened to still be buffering; with output_buffering=0 the headers are
 * already gone and every rejection silently degrades to "200 OK" — which the
 * frontend reads as success and shows a confirmation for a submission that was
 * actually thrown away.
 */
function pm_respond($status, $ok, $message, array $extra = []) {
    if (!headers_sent()) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        header('X-Content-Type-Options: nosniff');
    }
    echo json_encode(
        array_merge(['ok' => (bool) $ok, 'message' => $message], $extra),
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
    );
    exit;
}

/**
 * Coerce a submitted value to valid UTF-8.
 *
 * The pages declare UTF-8 and browsers honour it, but this must not depend on
 * that: every sanitiser below uses a /u regex, and preg_replace() returns NULL
 * on malformed UTF-8. Without this repair a single stray byte silently empties
 * the field, and the visitor is told their valid submission is incomplete.
 * The mail is also declared UTF-8, so bad bytes would otherwise arrive as
 * mojibake.
 */
function pm_to_utf8($value) {
    $value = (string) $value;
    if ($value === '' || mb_check_encoding($value, 'UTF-8')) {
        return $value;
    }
    // A client that ignored the declared charset has almost always sent
    // Windows-1252 (the usual source of smart quotes and dashes). Convert it
    // rather than discard the content.
    $converted = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');
    if (is_string($converted) && mb_check_encoding($converted, 'UTF-8')) {
        return $converted;
    }
    // Last resort: substitute whatever still cannot be represented.
    return mb_convert_encoding($value, 'UTF-8', 'UTF-8');
}

/**
 * Strip anything that could break out of a header, plus other control
 * characters, and collapse runs of whitespace.
 *
 * PHPMailer already strips CR/LF from the Subject and validates addresses, so
 * this is defence in depth rather than the only guard — but values from here
 * also land in email bodies and log lines, where a stray control character is
 * still unwanted.
 */
function pm_clean_line($value, $maxLength) {
    $value = pm_to_utf8($value);
    // ?? '' keeps a pathological input from becoming NULL further down.
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '';
    $value = trim(preg_replace('/\s+/u', ' ', $value) ?? '');
    return mb_substr($value, 0, $maxLength);
}

/** Same, but for a multi-line free-text block: keep newlines, drop the rest. */
function pm_clean_text($value, $maxLength) {
    $value = pm_to_utf8($value);
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    // Everything except LF (\x0A).
    $value = preg_replace('/[\x00-\x09\x0B-\x1F\x7F]+/u', ' ', $value) ?? '';
    // Never more than two consecutive blank lines.
    $value = preg_replace("/\n{3,}/", "\n\n", $value) ?? '';
    return mb_substr(trim($value), 0, $maxLength);
}

/**
 * Validate a submitted email address.
 * Returns the normalised address, or '' if it is not usable.
 */
function pm_valid_email($value) {
    $value = pm_clean_line($value, 254);
    // A space cannot survive into a header; reject rather than silently repair.
    if ($value === '' || strpos($value, ' ') !== false) {
        return '';
    }
    if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
        return '';
    }
    return $value;
}

/** Best-effort client identifier for throttling. Never shown to the visitor. */
function pm_client_key() {
    $ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown';
    return hash('sha256', $ip);
}

/**
 * Lightweight per-client submission throttle.
 *
 * The forms relay through an authenticated mailbox, so an unthrottled endpoint
 * is an open relay for anyone willing to skip the honeypot — and the fastest
 * way to get the sending domain blacklisted.
 *
 * Deliberately fails OPEN: if the storage directory is not writable the forms
 * keep working rather than breaking for everyone. The limit is generous because
 * whole offices legitimately share one NAT address.
 */
function pm_throttle_exceeded($limit = 5, $windowSeconds = 600) {
    $dir = sys_get_temp_dir() . '/pm-intake';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return false;
    }

    $file = $dir . '/' . pm_client_key() . '.json';
    $now = time();

    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        return false;
    }
    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        return false;
    }

    $raw = stream_get_contents($handle);
    $stamps = json_decode((string) $raw, true);
    if (!is_array($stamps)) {
        $stamps = [];
    }

    // Keep only hits inside the sliding window.
    $stamps = array_values(array_filter($stamps, function ($t) use ($now, $windowSeconds) {
        return is_int($t) && ($now - $t) < $windowSeconds;
    }));

    $exceeded = count($stamps) >= $limit;
    if (!$exceeded) {
        $stamps[] = $now;
    }

    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($stamps));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);

    return $exceeded;
}
