# PowerShell script to convert all text tool HTML files to PHP, extract CSS/JS, and add header/footer
$toolsPath = "c:\DEV\tools\text-tools"
$htmlFiles = Get-ChildItem -Path $toolsPath -Filter *.html | Where-Object { $_.Name -ne 'index.html' }
foreach ($htmlFile in $htmlFiles) {
    $toolName = $htmlFile.BaseName
    $phpFilePath = Join-Path $toolsPath "$toolName.php"
    $cssFilePath = Join-Path $toolsPath "assets\css\$toolName.css"
    $jsFilePath = Join-Path $toolsPath "assets\js\$toolName.js"
    $htmlContent = Get-Content $htmlFile.FullName -Raw -Encoding UTF8
    if ($htmlContent -match '<title>(.*?)</title>') {
        $pageTitle = $matches[1]
    } else {
        $pageTitle = $toolName -replace '-', ' '
    }
    if ($htmlContent -match '<meta name="description" content="(.*?)"') {
        $pageDescription = $matches[1]
    } else {
        $pageDescription = ''
    }
    $breadcrumbTitle = ($toolName -split '-' | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join ' '
    $cssContent = ''
    if ($htmlContent -match '(?s)<style>(.*?)</style>') {
        $cssContent = $matches[1].Trim()
    }
    $jsContent = ''
    if ($htmlContent -match '(?s)<script>(.*?)</script>') {
        $jsContent = $matches[1].Trim()
    }
    $bodyContent = $htmlContent
    $bodyContent = $bodyContent -replace '(?s)<!DOCTYPE.*?>', ''
    $bodyContent = $bodyContent -replace '(?s)<html[^>]*>', ''
    $bodyContent = $bodyContent -replace '(?s)<head>.*?</head>', ''
    $bodyContent = $bodyContent -replace '(?s)<body[^>]*>', ''
    $bodyContent = $bodyContent -replace '(?s)</body>.*?</html>', ''
    $bodyContent = $bodyContent -replace '(?s)<style>.*?</style>', ''
    $bodyContent = $bodyContent -replace '(?s)<script>.*?</script>', ''
    $bodyContent = $bodyContent.Trim()
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
    Set-Content -Path $phpFilePath -Value $phpContent -Encoding UTF8
    if ($cssContent) {
        Set-Content -Path $cssFilePath -Value $cssContent -Encoding UTF8
    }
    if ($jsContent) {
        Set-Content -Path $jsFilePath -Value $jsContent -Encoding UTF8
    }
}
Write-Host "All text tool files converted and CSS/JS extracted!" -ForegroundColor Green
