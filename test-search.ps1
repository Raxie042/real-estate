# Test Search API Endpoints

$baseUrl = "http://localhost:4000/api"
$headers = @{"Content-Type" = "application/json"}

Write-Host "=== Testing Search Endpoints ===" -ForegroundColor Green

# Test 1: Radius Search
Write-Host "`nTest 1: Radius Search (NYC, 50km)" -ForegroundColor Cyan
$radiusBody = @{
    latitude  = 40.7589
    longitude = -73.9851
    radiusKm  = 50
    limit     = 5
    sortBy    = 'distance'
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "$baseUrl/search/radius" -Method Post -Headers $headers -Body $radiusBody
    Write-Host "✅ Success - Found $(($result.data | Measure-Object).Count) listings" -ForegroundColor Green
    $result | ConvertTo-Json -Depth 2
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Advanced Search
Write-Host "`nTest 2: Advanced Search (Miami properties)" -ForegroundColor Cyan
$advancedBody = @{
    query   = 'miami'
    minPrice = 500000
    limit   = 3
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "$baseUrl/search/advanced" -Method Post -Headers $headers -Body $advancedBody
    Write-Host "✅ Success - Found $(($result.data | Measure-Object).Count) listings" -ForegroundColor Green
    $result | ConvertTo-Json -Depth 2
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Search Suggestions
Write-Host "`nTest 3: Search Suggestions (beach*)" -ForegroundColor Cyan
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/search/suggestions?query=beach" -Method Get -Headers $headers
    Write-Host "✅ Success - Found $($result.Count) suggestions" -ForegroundColor Green
    $result | ConvertTo-Json -Depth 2
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Bounds Search
Write-Host "`nTest 4: Bounds Search (Florida area)" -ForegroundColor Cyan
$boundsBody = @{
    north    = 30.0
    south    = 25.0
    east     = -80.0
    west     = -87.0
    limit    = 5
    sortBy   = 'price'
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "$baseUrl/search/bounds" -Method Post -Headers $headers -Body $boundsBody
    Write-Host "✅ Success - Found $(($result.data | Measure-Object).Count) listings" -ForegroundColor Green
    $result | ConvertTo-Json -Depth 2
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== All Tests Completed ===" -ForegroundColor Green
