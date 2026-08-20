<?php
require_once __DIR__ . '/env.php';
require_once __DIR__ . '/vendor/PHPMailer/Exception.php';
require_once __DIR__ . '/vendor/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/vendor/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

/* -----------------------------------------------------------------------------
 * ProManaged mail layer.
 *
 * Two audiences, one template system:
 *   - the INTERNAL notification, built to be triaged at a glance;
 *   - the CUSTOMER confirmation, built to read as a considered reply.
 *
 * Rules that must not be relaxed:
 *   - Every dynamic value passes through pm_esc() before it reaches HTML. Submitted
 *     text is never trusted, so a message containing markup renders as characters
 *     and can never become live HTML in a mailbox.
 *   - The palette is inlined as literal hex here on purpose. Mail clients strip
 *     <style> blocks and do not support custom properties, so css/tokens.css cannot
 *     reach an email; these values mirror it deliberately.
 *   - Layout is table-based with inline styles for broad client support. No
 *     JavaScript, no external stylesheet, no web font, no remote image: the mail has
 *     to survive images-off and a stripped-down renderer.
 *   - Nothing about SMTP, credentials, file paths or server internals is ever put
 *     into a message body.
 * -------------------------------------------------------------------------- */

/** Palette mirrored from css/tokens.css (see note above on why it is duplicated). */
const PM_INK        = '#1c1b19';
const PM_INK_SOFT   = '#56514a';
const PM_MUTED      = '#6e675e';
const PM_PAPER      = '#fffdfa';
const PM_IVORY      = '#f7f3ec';
const PM_STONE      = '#ece5da';
const PM_LINE       = '#e3dbcf';
const PM_EARTH      = '#96502c';
const PM_EARTH_SOFT = '#f0e4d9';
const PM_BLUE       = '#1d4ed8';

/** Wrapping guard for any style that will hold submitted text. */
const PM_WRAP = 'word-break:break-word;overflow-wrap:break-word;';

/** Escape a value for safe inclusion in HTML email. */
function pm_esc($value) {
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/**
 * Escape and preserve author line breaks for a free-text block.
 * nl2br runs AFTER escaping, so the <br> tags it adds are the only markup present.
 */
function pm_esc_multiline($value) {
    return nl2br(pm_esc($value), false);
}

/** A single label/value row inside an information block. */
function pm_row($label, $value) {
    if ($value === null || trim((string) $value) === '') {
        return '';
    }
    return '<tr>'
        . '<td style="padding:10px 0;border-bottom:1px solid ' . PM_LINE . ';'
        . 'font:600 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.08em;'
        . 'text-transform:uppercase;color:' . PM_MUTED . ';width:38%;vertical-align:top;">'
        . pm_esc($label) . '</td>'
        // word-break keeps a 200-character unbroken string from stretching the table
        // and destroying the layout in clients that do not honour table-layout:fixed.
        . '<td style="padding:10px 0;border-bottom:1px solid ' . PM_LINE . ';'
        . 'font:400 15px/1.5 Arial,Helvetica,sans-serif;color:' . PM_INK . ';'
        . 'word-break:break-word;overflow-wrap:break-word;vertical-align:top;">'
        . pm_esc($value) . '</td>'
        . '</tr>';
}

/** A titled block — the email equivalent of a bento surface. */
function pm_block($title, $innerHtml, $accent = false) {
    $bg     = $accent ? PM_EARTH_SOFT : PM_PAPER;
    $border = $accent ? PM_EARTH_SOFT : PM_LINE;
    return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"'
        . ' style="background:' . $bg . ';border:1px solid ' . $border . ';border-radius:10px;'
        . 'margin:0 0 16px 0;">'
        . '<tr><td style="padding:18px 20px;">'
        . '<p style="margin:0 0 12px 0;font:600 11px/1.4 Arial,Helvetica,sans-serif;'
        . 'letter-spacing:.1em;text-transform:uppercase;color:' . PM_EARTH . ';">'
        . pm_esc($title) . '</p>'
        . $innerHtml
        . '</td></tr></table>';
}

/**
 * The shared shell every ProManaged email is rendered into.
 * $chip is a short status word shown beside the wordmark.
 */
function pm_shell($preheader, $chip, $headline, $bodyHtml) {
    return '<!DOCTYPE html>'
    . '<html lang="en"><head><meta charset="utf-8">'
    . '<meta name="viewport" content="width=device-width,initial-scale=1">'
    . '<title>' . pm_esc($headline) . '</title></head>'
    . '<body style="margin:0;padding:0;background:' . PM_STONE . ';">'
    // Preheader: the preview line in an inbox list. Hidden in the body itself.
    . '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">'
    . pm_esc($preheader) . '</div>'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"'
    . ' style="background:' . PM_STONE . ';padding:24px 12px;">'
    . '<tr><td align="center">'
    . '<table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0"'
    . ' style="width:100%;max-width:640px;background:' . PM_IVORY . ';border-radius:14px;'
    . 'overflow:hidden;">'

    // --- Branded header. Text-based, so it survives images being blocked. ---
    . '<tr><td style="background:' . PM_INK . ';padding:22px 24px;">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>'
    . '<td style="font:700 17px/1.2 Arial,Helvetica,sans-serif;color:' . PM_PAPER . ';'
    . 'letter-spacing:-.01em;">ProManaged IT</td>'
    . '<td align="right" style="font:600 10px/1.4 Arial,Helvetica,sans-serif;'
    . 'letter-spacing:.1em;text-transform:uppercase;color:' . PM_EARTH_SOFT . ';">'
    . pm_esc($chip) . '</td>'
    . '</tr></table>'
    . '<p style="margin:4px 0 0 0;font:400 11px/1.4 Arial,Helvetica,sans-serif;'
    . 'letter-spacing:.08em;text-transform:uppercase;color:rgba(247,243,236,.6);">'
    . 'Build &middot; Source &middot; Support</p>'
    . '</td></tr>'

    // --- Headline + body ---
    . '<tr><td style="padding:26px 24px 8px 24px;">'
    . '<h1 style="margin:0 0 18px 0;font:700 22px/1.3 Arial,Helvetica,sans-serif;'
    . 'color:' . PM_INK . ';letter-spacing:-.02em;' . PM_WRAP . '">' . pm_esc($headline) . '</h1>'
    . $bodyHtml
    . '</td></tr>'

    // --- Footer ---
    . '<tr><td style="padding:8px 24px 26px 24px;">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">'
    . '<tr><td style="border-top:1px solid ' . PM_LINE . ';padding-top:16px;'
    . 'font:400 12px/1.6 Arial,Helvetica,sans-serif;color:' . PM_MUTED . ';">'
    . 'ProManaged IT &middot; Build, Source, Support<br>'
    . '<a href="mailto:info@promanaged-it.com" style="color:' . PM_BLUE . ';'
    . 'text-decoration:none;">info@promanaged-it.com</a><br>'
    . 'Company Registration Number 749512'
    . '</td></tr></table>'
    . '</td></tr>'

    . '</table></td></tr></table></body></html>';
}

/** Convert a label => value map into the plain-text alternative. */
function pm_text_rows(array $rows) {
    $out = '';
    foreach ($rows as $label => $value) {
        if ($value === null || trim((string) $value) === '') {
            continue;
        }
        $out .= $label . ': ' . $value . "\n";
    }
    return $out;
}

/* ---------------------------------------------------------------------------
 * Internal notification — an information board for triage.
 * ------------------------------------------------------------------------ */
function pm_internal_email($type, $chip, array $identity, array $details, $messageLabel, $messageBody, $nextAction) {
    $identityHtml = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"'
        . ' style="table-layout:fixed;">';
    foreach ($identity as $label => $value) {
        $identityHtml .= pm_row($label, $value);
    }
    $identityHtml .= '</table>';

    $detailHtml = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"'
        . ' style="table-layout:fixed;">';
    foreach ($details as $label => $value) {
        $detailHtml .= pm_row($label, $value);
    }
    $detailHtml .= '</table>';

    $body = '';
    if ($details) {
        // Booking-style structured fields are the priority block, so they lead.
        $body .= pm_block($type . ' details', $detailHtml, true);
    }
    $body .= pm_block('Who it is from', $identityHtml);

    if ($messageBody !== null && trim($messageBody) !== '') {
        $body .= pm_block($messageLabel,
            '<div style="font:400 15px/1.65 Arial,Helvetica,sans-serif;color:' . PM_INK . ';'
            . 'word-break:break-word;overflow-wrap:break-word;">'
            . pm_esc_multiline($messageBody) . '</div>');
    }

    $replyTo = isset($identity['Email']) ? $identity['Email'] : '';
    $body .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"'
        . ' style="background:' . PM_INK . ';border-radius:10px;"><tr>'
        . '<td style="padding:18px 20px;">'
        . '<p style="margin:0 0 6px 0;font:600 11px/1.4 Arial,Helvetica,sans-serif;'
        . 'letter-spacing:.1em;text-transform:uppercase;color:' . PM_EARTH_SOFT . ';">Next action</p>'
        . '<p style="margin:0;font:400 15px/1.6 Arial,Helvetica,sans-serif;color:' . PM_PAPER . ';'
        . PM_WRAP . '">' . pm_esc($nextAction) . '</p>';
    if ($replyTo !== '') {
        $body .= '<p style="margin:12px 0 0 0;font:400 14px/1.5 Arial,Helvetica,sans-serif;">'
            . '<a href="mailto:' . pm_esc($replyTo) . '" style="color:' . PM_EARTH_SOFT . ';">'
            . 'Reply to ' . pm_esc($replyTo) . '</a></p>';
    }
    $body .= '</td></tr></table>';

    $html = pm_shell(
        $type . ' from ' . (isset($identity['Name']) ? $identity['Name'] : 'the website'),
        $chip,
        $type,
        $body
    );

    $text = "PROMANAGED IT — " . strtoupper($type) . "\n"
        . str_repeat('=', 46) . "\n\n"
        . ($details ? strtoupper($type) . " DETAILS\n" . pm_text_rows($details) . "\n" : '')
        . "WHO IT IS FROM\n" . pm_text_rows($identity) . "\n"
        . (trim((string) $messageBody) !== ''
            ? strtoupper($messageLabel) . "\n" . $messageBody . "\n\n" : '')
        . "NEXT ACTION\n" . $nextAction . "\n\n"
        . str_repeat('-', 46) . "\n"
        . "ProManaged IT · info@promanaged-it.com\n";

    return ['html' => $html, 'text' => $text];
}

/* ---------------------------------------------------------------------------
 * Customer confirmation — a considered reply, not a receipt.
 * ------------------------------------------------------------------------ */
function pm_customer_email($chip, $headline, $openingLine, array $summary, $expectation, $closingLine) {
    $summaryHtml = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"'
        . ' style="table-layout:fixed;">';
    foreach ($summary as $label => $value) {
        $summaryHtml .= pm_row($label, $value);
    }
    $summaryHtml .= '</table>';

    $body = '<p style="margin:0 0 18px 0;font:400 16px/1.65 Arial,Helvetica,sans-serif;'
        . 'color:' . PM_INK_SOFT . ';' . PM_WRAP . '">' . pm_esc($openingLine) . '</p>'
        . pm_block('What we have', $summaryHtml)
        . '<p style="margin:0 0 18px 0;font:400 16px/1.65 Arial,Helvetica,sans-serif;'
        . 'color:' . PM_INK_SOFT . ';' . PM_WRAP . '">' . pm_esc($expectation) . '</p>'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"'
        . ' style="background:' . PM_EARTH_SOFT . ';border-radius:10px;"><tr>'
        . '<td style="padding:18px 20px;font:400 15px/1.6 Arial,Helvetica,sans-serif;'
        . 'color:' . PM_INK . ';' . PM_WRAP . '">' . pm_esc($closingLine)
        . '<br><a href="mailto:info@promanaged-it.com" style="color:' . PM_EARTH . ';'
        . 'font-weight:bold;text-decoration:none;">info@promanaged-it.com</a>'
        . '</td></tr></table>';

    $html = pm_shell($openingLine, $chip, $headline, $body);

    $text = "PROMANAGED IT\n" . str_repeat('=', 46) . "\n\n"
        . $headline . "\n\n"
        . $openingLine . "\n\n"
        . "WHAT WE HAVE\n" . pm_text_rows($summary) . "\n"
        . $expectation . "\n\n"
        . $closingLine . "\n"
        . "info@promanaged-it.com\n\n"
        . str_repeat('-', 46) . "\n"
        . "ProManaged IT · Build, Source, Support\n"
        . "Company Registration Number 749512\n";

    return ['html' => $html, 'text' => $text];
}

/* ---------------------------------------------------------------------------
 * Transport.
 * ------------------------------------------------------------------------ */

/**
 * Resolve and validate SMTP settings from the environment.
 * Returns null (and logs which keys are missing) rather than half-configuring a
 * connection that would fail later with an opaque socket error.
 *
 * Nothing here is ever echoed; SMTP_PASS is not logged, not returned in any
 * error path, and not written to the response.
 */
function pm_smtp_config() {
    loadEnv(__DIR__ . '/../.env');

    $config = [
        'host' => pm_env('SMTP_HOST'),
        'user' => pm_env('SMTP_USER'),
        'pass' => pm_env('SMTP_PASS'),
        'port' => pm_env('SMTP_PORT'),
        'secure' => pm_env('SMTP_SECURE'),
    ];

    $missing = [];
    foreach (['host', 'user', 'pass'] as $required) {
        if ($config[$required] === null || $config[$required] === '') {
            $missing[] = 'SMTP_' . strtoupper($required);
        }
    }
    if ($missing) {
        // Names only — never the values.
        error_log('ProManaged mail: missing SMTP configuration (' . implode(', ', $missing) . ').');
        return null;
    }

    $config['port'] = (int) $config['port'];
    if ($config['port'] <= 0 || $config['port'] > 65535) {
        $config['port'] = 465;
    }

    // Normalise the encryption mode. A stray "SSL", "SMTPS" or trailing space in
    // .env would otherwise leave SMTPSecure set to a value PHPMailer does not
    // recognise, which silently drops the connection to plaintext.
    $secure = strtolower(trim((string) $config['secure']));
    if ($secure === 'smtps' || $secure === 'implicit') {
        $secure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($secure === 'starttls') {
        $secure = PHPMailer::ENCRYPTION_STARTTLS;
    }
    if ($secure !== PHPMailer::ENCRYPTION_SMTPS && $secure !== PHPMailer::ENCRYPTION_STARTTLS) {
        // Fall back on the port convention: 465 is implicit TLS, 587 is STARTTLS.
        $secure = $config['port'] === 587
            ? PHPMailer::ENCRYPTION_STARTTLS
            : PHPMailer::ENCRYPTION_SMTPS;
    }
    // Port 465 is implicit TLS. STARTTLS on 465 is a protocol error, so the port
    // wins over a mismatched SMTP_SECURE rather than producing a hung handshake.
    if ($config['port'] === 465) {
        $secure = PHPMailer::ENCRYPTION_SMTPS;
    }
    $config['secure'] = $secure;

    return $config;
}

/**
 * The shared, already-connected PHPMailer instance.
 *
 * Every submission sends two messages (internal notification + customer
 * confirmation). Building a new PHPMailer per message meant two full TLS
 * handshakes and two AUTH round trips while the visitor waited on the spinner.
 * SMTPKeepAlive reuses one connection for both.
 *
 * Returns null if the transport cannot be configured.
 */
function pm_mailer() {
    static $mail = null;
    static $failed = false;

    if ($failed) {
        return null;
    }
    if ($mail instanceof PHPMailer) {
        return $mail;
    }

    $config = pm_smtp_config();
    if ($config === null) {
        $failed = true;
        return null;
    }

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = $config['host'];
    $mail->Port       = $config['port'];
    $mail->SMTPSecure = $config['secure'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['user'];
    $mail->Password   = $config['pass'];
    $mail->CharSet    = 'UTF-8';
    $mail->Encoding   = 'base64';

    // Without this the default is 300s: one unreachable mail server would hold
    // the PHP worker — and the visitor's request — open for five minutes.
    $mail->Timeout      = 15;
    $mail->SMTPKeepAlive = true;
    // Irrelevant under implicit TLS, but explicit so a future move to 587 does
    // not depend on an opportunistic upgrade succeeding.
    $mail->SMTPAutoTLS  = true;
    // Debug output would otherwise be echoed straight into the HTTP response.
    $mail->SMTPDebug    = 0;
    $mail->Debugoutput  = function ($str, $level) { /* discarded */ };

    // Close the connection cleanly at the end of the request instead of leaving
    // the server to time it out.
    register_shutdown_function(function () use ($mail) {
        try {
            $mail->smtpClose();
        } catch (Throwable $e) {
            // Nothing useful to do while shutting down.
        }
    });

    return $mail;
}

/**
 * Send one message.
 *
 * $body may be a plain string (legacy plain-text call) or an
 * ['html' => ..., 'text' => ...] pair from the template helpers above.
 *
 * Returns true on accepted delivery, false otherwise. Failure detail is written
 * to the server log only — the caller has no way to leak it to the browser.
 */
function sendSiteMail($toEmail, $subject, $body, $replyToEmail, $replyToName) {
    $mail = pm_mailer();
    if ($mail === null) {
        return false;
    }

    try {
        // The instance is shared, so recipients from the previous message must go.
        $mail->clearAllRecipients();
        $mail->clearReplyTos();
        $mail->clearAttachments();

        // From stays the authenticated SMTP account so SPF/DKIM continue to pass;
        // the visitor's address goes on Reply-To only. Sending as the visitor would
        // break deliverability and is deliberately avoided.
        $mail->setFrom($mail->Username, 'ProManaged IT Website');
        $mail->addAddress($toEmail);
        if ($replyToEmail && filter_var($replyToEmail, FILTER_VALIDATE_EMAIL)) {
            $mail->addReplyTo($replyToEmail, $replyToName ?: $replyToEmail);
        }

        // PHPMailer strips CR/LF from the Subject itself; stripping here too keeps
        // the value clean everywhere else it is used.
        $mail->Subject = trim(str_replace(["\r", "\n"], ' ', (string) $subject));

        if (is_array($body)) {
            $mail->isHTML(true);
            $mail->Body = $body['html'];
            // Plain-text alternative for clients that will not render HTML.
            $mail->AltBody = $body['text'];
        } else {
            $mail->isHTML(false);
            $mail->Body = $body;
            $mail->AltBody = '';
        }

        return $mail->send();
    } catch (PHPMailerException $e) {
        // Logged server-side only — the browser response never carries mail internals.
        error_log('ProManaged mail: send failed — ' . $mail->ErrorInfo);
        return false;
    } catch (Throwable $e) {
        // A non-PHPMailer failure (bad recipient type, stream error) must not
        // become an uncaught fatal: with display_errors on at the host that
        // would print a stack trace containing server paths into the response.
        error_log('ProManaged mail: unexpected transport error — ' . $e->getMessage());
        return false;
    }
}
