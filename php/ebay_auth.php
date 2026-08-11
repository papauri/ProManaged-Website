<?php
// Load environment variables manually
function loadEnv($filePath) {
    if (!file_exists($filePath)) {
        throw new Exception("Environment file not found at: $filePath");
    }

    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0 || empty(trim($line))) {
            continue;
        }

        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);

        putenv("$key=$value");
    }
}

// Load the `.env` file
loadEnv('/home/p601229/public_html/.env');

// Refresh eBay OAuth token
function refreshEbayAuthToken() {
    $clientId = getenv('EBAY_CLIENT_ID');
    $clientSecret = getenv('EBAY_CLIENT_SECRET');

    $tokenUrl = "https://api.ebay.com/identity/v1/oauth2/token";
    $credentials = base64_encode("$clientId:$clientSecret");

    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => $tokenUrl,
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            "Authorization: Basic $credentials",
            "Content-Type: application/x-www-form-urlencoded",
        ],
        CURLOPT_POSTFIELDS => http_build_query([
            "grant_type" => "client_credentials",
            "scope" => "https://api.ebay.com/oauth/api_scope",
        ]),
    ]);

    $response = curl_exec($curl);

    if (!$response) {
        throw new Exception("Failed to fetch eBay OAuth token: " . curl_error($curl));
    }

    $data = json_decode($response, true);
    if (!isset($data['access_token'])) {
        throw new Exception("Invalid response from eBay OAuth API: " . $response);
    }

    // Save the token and expiry in a file
    file_put_contents("ebay_token.json", json_encode([
        "access_token" => $data['access_token'],
        "expiry" => time() + $data['expires_in'],
    ]));

    return $data['access_token'];
}

// Retrieve eBay OAuth token
function getEbayAuthToken() {
    $tokenFile = "ebay_token.json";

    if (file_exists($tokenFile)) {
        $tokenData = json_decode(file_get_contents($tokenFile), true);

        if ($tokenData && time() < $tokenData['expiry']) {
            return $tokenData['access_token'];
        }
    }

    return refreshEbayAuthToken();
}
?>
