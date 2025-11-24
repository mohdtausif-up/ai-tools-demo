# PowerShell script to properly convert HTML to PHP and extract CSS/JS
$toolsPath = "c:\DEV\tools\seo-tools"

Write-Host "Starting SEO Tools HTML to PHP conversion and CSS/JS extraction..." -ForegroundColor Cyan

# Get all HTML files (excluding index.html which we handle separately)
$htmlFiles = Get-ChildItem -Path $toolsPath -Filter *.html | Where-Object { $_.Name -ne 'index.html' }

Write-Host "Found $($htmlFiles.Count) tool HTML files to process" -ForegroundColor Yellow

foreach ($htmlFile in $htmlFiles) {
    $toolName = $htmlFile.BaseName
    $phpFilePath = Join-Path $toolsPath "$toolName.php"
    $cssFilePath = Join-Path $toolsPath "assets\css\$toolName.css"
    $jsFilePath = Join-Path $toolsPath "assets\js\$toolName.js"
    
    Write-Host "`nProcessing: $toolName" -ForegroundColor Green
    
    # Read HTML content
    $htmlContent = Get-Content $htmlFile.FullName -Raw -Encoding UTF8
    
    # Extract page title from <title> tag
    if ($htmlContent -match '<title>(.*?)</title>') {
        $pageTitle = $matches[1]
    } else {
        $pageTitle = $toolName -replace '-', ' '
    }
    
    # Extract page description from meta description
    if ($htmlContent -match '<meta name="description" content="(.*?)"') {
        $pageDescription = $matches[1]
    } else {
        $pageDescription = ''
    }
    
    # Format breadcrumb title (capitalize words)
    $breadcrumbTitle = ($toolName -split '-' | ForEach-Object { 
        $_.Substring(0,1).ToUpper() + $_.Substring(1) 
    }) -join ' '
    
    # Extract CSS (everything between <style> and </style>)
    $cssContent = ''
    if ($htmlContent -match '(?s)<style>(.*?)</style>') {
        $cssContent = $matches[1].Trim()
    }
    
    # Extract JavaScript (everything between <script> and </script>, excluding external scripts)
    $jsContent = ''
    if ($htmlContent -match '(?s)<script>(.*?)</script>') {
        $jsContent = $matches[1].Trim()
    }
    
    # Extract body content (remove DOCTYPE, html, head, body tags)
    $bodyContent = $htmlContent
    $bodyContent = $bodyContent -replace '(?s)<!DOCTYPE.*?>', ''
    $bodyContent = $bodyContent -replace '(?s)<html[^>]*>', ''
    $bodyContent = $bodyContent -replace '(?s)<head>.*?</head>', ''
    $bodyContent = $bodyContent -replace '(?s)<body[^>]*>', ''
    $bodyContent = $bodyContent -replace '(?s)</body>.*?</html>', ''
    $bodyContent = $bodyContent -replace '(?s)<style>.*?</style>', ''
    $bodyContent = $bodyContent -replace '(?s)<script>.*?</script>', ''
    $bodyContent = $bodyContent.Trim()
    
    # Create PHP file with proper header
    $phpContent = @"
<?php
`$page_title = '$pageTitle';
`$page_description = '$pageDescription';
`$breadcrumbs = [
    ['title' => 'Home', 'url' => 'index.php'],
    ['title' => '$breadcrumbTitle', 'url' => '']
];
`$page_css = '$toolName.css';
`$page_js = '$toolName.js';
include 'header.php';
?>
$bodyContent
<?php include 'footer.php'; ?>
"@
    
    # Write PHP file
    Set-Content -Path $phpFilePath -Value $phpContent -Encoding UTF8
    Write-Host "  Created: $phpFilePath" -ForegroundColor White
    
    # Write CSS file if content exists
    if ($cssContent) {
        Set-Content -Path $cssFilePath -Value $cssContent -Encoding UTF8
        Write-Host "  Created: $cssFilePath" -ForegroundColor White
    }
    
    # Write JS file if content exists
    if ($jsContent) {
        Set-Content -Path $jsFilePath -Value $jsContent -Encoding UTF8
        Write-Host "  Created: $jsFilePath" -ForegroundColor White
    }
}

Write-Host "`n✅ All tool files converted and CSS/JS extracted!" -ForegroundColor Green
Write-Host "  PHP files: $toolsPath" -ForegroundColor Cyan
Write-Host "  CSS files: $toolsPath\assets\css" -ForegroundColor Cyan
Write-Host "  JS files: $toolsPath\assets\js" -ForegroundColor Cyan
