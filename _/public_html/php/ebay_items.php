<?php
require_once '/home/p601229/public_html/php/ebay_auth.php';

header("Content-Type: application/json");

function getConditionName($conditionId) {
    $conditionNames = [
        '1000' => 'New',
        '1500' => 'New - Other',
        '2000' => 'Like New',
        '3000' => 'Used',
        '7000' => 'For Parts',
    ];
    return $conditionNames[$conditionId] ?? 'Unknown Condition';
}

function detectProductType($title) {
    // Define product types and associated keywords
    $keywordsMapping = [
        'ps5' => ['playstation 5', 'ps5', 'sony ps5', 'sony playstation 5'],
        'ps4' => ['playstation 4', 'ps4', 'sony ps4', 'sony playstation 4'],
        'xbox' => ['xbox series x', 'xbox series s', 'xbox one', 'microsoft xbox', 'xbox'],
        'accessories' => ['controller', 'accessory', 'headset', 'gaming mouse', 'keyboard', 'charger'],
    ];

    // Convert the title to lowercase for case-insensitive matching
    $titleLower = strtolower($title);

    // Loop through the keywords mapping
    foreach ($keywordsMapping as $productType => $keywords) {
        foreach ($keywords as $keyword) {
            if (strpos($titleLower, $keyword) !== false) {
                return $productType; // Return the product type as soon as a match is found
            }
        }
    }

    // Default: Return "other" if no matches are found
    return 'other';
}

try {
    $params = $_GET;

    $query = $params['query'] ?? 'Gaming Console';
    $limit = $params['limit'] ?? '20';
    $condition = $params['condition'] ?? null;
    $marketplace = $params['marketplace'] ?? 'GB'; // Default to United Kingdom

    // Region-specific marketplace configurations
    $marketplaceConfig = [
        'GB' => ['id' => 'EBAY_GB', 'country' => 'GB', 'zip' => 'SW1A1AA'],
        'DE' => ['id' => 'EBAY_DE', 'country' => 'DE', 'zip' => '10115'],
        'FR' => ['id' => 'EBAY_FR', 'country' => 'FR', 'zip' => '75001'],
        'IE' => ['id' => 'EBAY_IE', 'country' => 'IE', 'zip' => 'D01'],
    ];

    // Get the selected marketplace configuration
    $config = $marketplaceConfig[$marketplace] ?? $marketplaceConfig['GB'];

    $baseURL = 'https://api.ebay.com/buy/browse/v1/item_summary/search';
    $queryParams = [
        'q' => $query,
        'limit' => $limit,
        'marketplace_ids' => $config['id'],
    ];

    if ($condition) {
        $queryParams['filter'] = "conditionIds:{$condition}";
    }

    $url = $baseURL . '?' . http_build_query($queryParams);

    $authToken = getEbayAuthToken();
    $headers = [
        "Authorization: Bearer $authToken",
        "Content-Type: application/json",
        "X-EBAY-C-MARKETPLACE-ID: {$config['id']}",
        "X-EBAY-C-ENDUSERCTX: contextualLocation=country={$config['country']},zip={$config['zip']}",
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
    ]);

    $response = curl_exec($ch);

    if (!$response) {
        throw new Exception("Failed to fetch eBay items: " . curl_error($ch));
    }

    $data = json_decode($response, true);

    if (isset($data['errors'])) {
        throw new Exception("eBay API Error: " . json_encode($data['errors']));
    }

    $items = $data['itemSummaries'] ?? [];
    $formattedItems = array_map(function ($item) {
        return [
            'id' => $item['itemId'],
            'title' => $item['title'] ?? 'No Title Available',
            'originalPrice' => $item['price']['value'] . ' ' . $item['price']['currency'],
            'image' => $item['image']['imageUrl'] ?? 'https://via.placeholder.com/150',
            'feedbackPercentage' => $item['seller']['feedbackPercentage'] ?? 'N/A',
            'marketplace' => $item['itemLocation']['country'] ?? 'N/A',
            'condition' => getConditionName($item['conditionId']),
            'url' => $item['itemWebUrl'] ?? '#',
            // Pass only the title to detectProductType
            'productType' => detectProductType($item['title'] ?? ''),
        ];
    }, $items);

    echo json_encode($formattedItems);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
