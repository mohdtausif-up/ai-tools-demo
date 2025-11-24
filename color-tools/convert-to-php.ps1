# PowerShell Script to Convert HTML Color Tools to PHP
# This script converts all .html files to .php format with header/footer includes

$colorToolsPath = "c:\DEV\tools\color-tools"
Set-Location $colorToolsPath

# Get all HTML files except index.html (already converted)
$htmlFiles = Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -ne "index.html" }

Write-Host "Found $($htmlFiles.Count) HTML files to convert" -ForegroundColor Green
Write-Host ""

foreach ($file in $htmlFiles) {
    $htmlPath = $file.FullName
    $phpFileName = $file.Name -replace '\.html$', '.php'
    $phpPath = Join-Path $colorToolsPath $phpFileName
    
    Write-Host "Converting: $($file.Name) -> $phpFileName" -ForegroundColor Cyan
    
    # Read the HTML content
    $content = Get-Content $htmlPath -Raw -Encoding UTF8
    
    # Extract title from HTML
    if ($content -match '<title>(.*?)</title>') {
        $title = $matches[1]
    } else {
        $title = "Color Tool"
    }
    
    # Extract description from meta tag
    if ($content -match '<meta name="description" content="(.*?)"') {
        $description = $matches[1]
    } else {
        $description = "Professional color tool for designers and developers"
    }
    
    # Generate tool name for breadcrumb
    $toolName = $file.BaseName -replace '-', ' '
    $toolName = (Get-Culture).TextInfo.ToTitleCase($toolName)
    
    # Extract the body content (remove head and wrapping html/body tags)
    # Find the body content
    if ($content -match '(?s)<body>(.*)</body>') {
        $bodyContent = $matches[1].Trim()
    } else {
        $bodyContent = $content
    }
    
    # Extract styles from head
    $styles = ""
    if ($content -match '(?s)<style>(.*?)</style>') {
        $styles = $matches[1]
    }
    
    # Extract scripts from body
    $scripts = ""
    if ($content -match '(?s)<script>(.*?)</script>') {
        $scripts = $matches[1]
    }
    
    # Remove the old head, html, and body tags from bodyContent
    $bodyContent = $bodyContent -replace '(?s)<!DOCTYPE.*?<body[^>]*>', ''
    $bodyContent = $bodyContent -replace '</body>.*?</html>', ''
    
    # Create PHP content with header and footer includes
    $phpContent = @"
<?php 
`$page_title = '$title';
`$page_description = '$description';
`$breadcrumbs = [
  ['title' => '$toolName', 'url' => '']
];
include 'header.php'; 
?>

<div class="main-content">
$bodyContent
</div>

<style>
$styles
</style>

<script>
$scripts
</script>

<?php include 'footer.php'; ?>
"@

    # Write the PHP file
    $phpContent | Out-File -FilePath $phpPath -Encoding UTF8
    
    Write-Host "  Created: $phpPath" -ForegroundColor Green
}

Write-Host ""
Write-Host "Conversion complete! Converted $($htmlFiles.Count) files." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Test the PHP files in a web server (Apache/Nginx with PHP)" -ForegroundColor Yellow
Write-Host "2. You may need to manually adjust some files for proper formatting" -ForegroundColor Yellow
Write-Host "3. The HTML files are still present - delete them after verifying PHP files work" -ForegroundColor Yellow
