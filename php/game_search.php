<?php
header("Content-Type: application/json");

try {
    $title = $_GET['title'] ?? '';

    if (empty($title)) {
        throw new Exception("Title parameter is required.");
    }

    $apiUrl = "https://www.cheapshark.com/api/1.0/games?title=" . urlencode($title);

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
    ]);

    $response = curl_exec($ch);

    if (!$response) {
        throw new Exception("Failed to fetch games: " . curl_error($ch));
    }

    $data = json_decode($response, true);

    if (!is_array($data)) {
        throw new Exception("Invalid response from CheapShark API.");
    }

    echo json_encode($data);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
