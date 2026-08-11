<?php
require_once __DIR__ . '/env.php';
require_once __DIR__ . '/vendor/PHPMailer/Exception.php';
require_once __DIR__ . '/vendor/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/vendor/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

// Sends mail via the configured SMTP account. Returns true on success, false on failure.
function sendSiteMail($toEmail, $subject, $body, $replyToEmail, $replyToName) {
    loadEnv(__DIR__ . '/../.env');

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = getenv('SMTP_HOST');
        $mail->SMTPAuth = true;
        $mail->Username = getenv('SMTP_USER');
        $mail->Password = getenv('SMTP_PASS');
        $mail->SMTPSecure = getenv('SMTP_SECURE') ?: PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = getenv('SMTP_PORT') ?: 465;

        $mail->setFrom(getenv('SMTP_USER'), 'ProManaged IT Website');
        $mail->addAddress($toEmail);
        if ($replyToEmail) {
            $mail->addReplyTo($replyToEmail, $replyToName ?: $replyToEmail);
        }

        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->isHTML(false);

        $mail->send();
        return true;
    } catch (PHPMailerException $e) {
        error_log('sendSiteMail failed: ' . $mail->ErrorInfo);
        return false;
    }
}
