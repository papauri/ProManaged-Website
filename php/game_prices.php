<?php

header("Content-Type: application/json");

try {
    // Hardcoded exchange rate for USD to MWK
    $USD_TO_MWK = 2820;

    // Fetch data from CheapShark API
    $apiUrl = 'https://www.cheapshark.com/api/1.0/deals';

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
    ]);

    $response = curl_exec($ch);

    if (!$response) {
        throw new Exception("Failed to fetch data from CheapShark API: " . curl_error($ch));
    }

    $data = json_decode($response, true);

    if (!$data || !is_array($data)) {
        throw new Exception("Invalid response from CheapShark API.");
    }

    // Deduplicate games by title
    $uniqueGames = [];
    foreach ($data as $game) {
        if (!isset($uniqueGames[$game['title']])) {
            $uniqueGames[$game['title']] = [
                'title' => $game['title'] ?? 'Unknown Title',
                'salePrice' => $game['salePrice'] ?? '0.00',
                'normalPrice' => $game['normalPrice'] ?? '0.00',
                'priceMWK' => number_format(($game['salePrice'] ?? 0) * $USD_TO_MWK, 2),
                'normalPriceMWK' => number_format(($game['normalPrice'] ?? 0) * $USD_TO_MWK, 2),
                'thumb' => $game['thumb'] ?? 'https://via.placeholder.com/150',
                'dealID' => $game['dealID'] ?? 'N/A',
                'storeID' => $game['storeID'] ?? 'N/A',
            ];
        }
    }

    // Convert the unique games array to an indexed array
    $filteredGames = array_values($uniqueGames);

    echo json_encode($filteredGames);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
