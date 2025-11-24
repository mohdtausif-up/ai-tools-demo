# PowerShell script to automate conversion of all .html SEO tool files to .php, add header/footer, and prepare for CSS/JS extraction
$toolsPath = "c:\DEV\tools\seo-tools"
$header = "<?php $page_title = ''; $page_description = ''; $breadcrumbs = []; include 'header.php'; ?>"
$footer = "<?php include 'footer.php'; ?>"

Get-ChildItem -Path $toolsPath -Filter *.html | ForEach-Object {
    $htmlFile = $_.FullName
    $phpFile = $htmlFile -replace ".html$", ".php"
    $content = Get-Content $htmlFile -Raw
    # Remove DOCTYPE and <html>/<head>/<body> wrappers
    $body = $content -replace '(?s)<!DOCTYPE.*?<body.*?>', '' -replace '(?s)</body>.*?</html>', ''
    # Prepare breadcrumbs (tool name)
    $toolName = $_.BaseName -replace '-', ' ' | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }
    $breadcrumbs = "<?php $breadcrumbs = [['title' => 'Home', 'url' => 'index.php'], ['title' => '$toolName', 'url' => '']]; ?>"
    # Compose PHP file
    $phpContent = "$header`n$breadcrumbs`n$body`n$footer"
    Set-Content -Path $phpFile -Value $phpContent
}
Write-Host "All .html SEO tool files converted to .php with header/footer."
