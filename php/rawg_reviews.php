<?php

header("Content-Type: application/json");

// Load environment variables
$dotenvPath = '/home/p601229/public_html'; // Adjust the path if needed
$envFile = $dotenvPath . '/.env';

// Function to load environment variables
function loadEnv($envFile) {
    if (!file_exists($envFile)) {
        throw new Exception("Environment file not found: {$envFile}");
    }

    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue; // Skip comments
        putenv(trim($line));
    }
}

try {
    // Load .env variables
    loadEnv($envFile);

    // Get the RAWG API key from the environment
    $rawgApiKey = getenv('RAWG_API_KEY');

    if (!$rawgApiKey) {
        throw new Exception("RAWG API key is missing in the environment variables.");
    }

    // Determine the endpoint (games or platforms)
    $endpoint = $_GET['endpoint'] ?? 'games'; // Default to 'games' if not provided
    $validEndpoints = ['games', 'platforms'];
    if (!in_array($endpoint, $validEndpoints)) {
        throw new Exception("Invalid endpoint. Use 'games' or 'platforms'.");
    }

    // Build the base URL
    $baseURL = "https://api.rawg.io/api/{$endpoint}";
    $params = [
        'key' => $rawgApiKey,
    ];

    // Add optional parameters for games endpoint
    if ($endpoint === 'games') {
        $params['dates'] = $_GET['dates'] ?? '2024-01-01,2026-09-30'; // Default date range
        $params['platforms'] = $_GET['platforms'] ?? '18,1,7'; // Default platforms
    }

    // Build the full URL with query parameters
    $queryString = http_build_query($params);
    $url = $baseURL . '?' . $queryString;

    // Initialize cURL
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
    ]);

    // Execute the cURL request
    $response = curl_exec($ch);

    if (!$response) {
        throw new Exception("Failed to fetch RAWG data: " . curl_error($ch));
    }

    // Decode the JSON response
    $data = json_decode($response, true);

    if (isset($data['error'])) {
        throw new Exception("RAWG API Error: " . $data['error']);
    }

    // Output the results
    echo json_encode($data);
} catch (Exception $e) {
    // Handle errors
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    if (isset($ch)) {
        curl_close($ch);
    }
}

?>
