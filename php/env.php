<?php
/* Loads KEY=VALUE pairs from .env into the process environment.
 *
 * No external dependency on purpose: the host is shared cPanel hosting with no
 * Composer autoloader in the deployed tree.
 *
 * Two things here are deliberate and easy to get wrong:
 *   - Inline "#" is NOT treated as a comment. Only a "#" in the FIRST column
 *     starts a comment line. Secrets routinely contain "#", and stripping from
 *     the first "#" onwards silently truncates a password into an
 *     authentication failure that looks like a server fault.
 *   - putenv() is disabled on some shared hosts. Values are therefore mirrored
 *     into $_ENV and $_SERVER, and pm_env() reads all three.
 */

/** Load a .env file once per path. */
function loadEnv($filePath) {
    // Keyed by path so a second file can still be loaded; the original single
    // static flag made any later call a silent no-op.
    static $loaded = [];

    $key = realpath($filePath);
    if ($key === false) {
        return false;
    }
    if (isset($loaded[$key])) {
        return true;
    }
    $loaded[$key] = true;

    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return false;
    }

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) {
            continue;
        }
        list($name, $value) = explode('=', $line, 2);

        // "export KEY=value" is valid in a .env people also source from a shell.
        $name = trim(preg_replace('/^export\s+/i', '', $name));
        if ($name === '') {
            continue;
        }

        $value = trim($value);
        // Strip one matching pair of surrounding quotes, leaving inner ones intact.
        $len = strlen($value);
        if ($len >= 2
            && (($value[0] === '"' && $value[$len - 1] === '"')
             || ($value[0] === "'" && $value[$len - 1] === "'"))) {
            $value = substr($value, 1, -1);
        }

        if (function_exists('putenv')) {
            @putenv("$name=$value");
        }
        $_ENV[$name] = $value;
        $_SERVER[$name] = $value;
    }

    return true;
}

/**
 * Read a configuration value.
 * Checks every store loadEnv() writes to, because putenv() may be unavailable.
 */
function pm_env($name, $default = null) {
    $value = getenv($name);
    if ($value === false || $value === '') {
        $value = isset($_ENV[$name]) ? $_ENV[$name] : null;
    }
    if ($value === null || $value === '') {
        $value = isset($_SERVER[$name]) ? $_SERVER[$name] : null;
    }
    if ($value === null || $value === '') {
        return $default;
    }
    return $value;
}
