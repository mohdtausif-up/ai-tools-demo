# PowerShell Script to Extract CSS and JS from PHP files
# This script extracts inline styles and scripts from PHP files into separate files

$colorToolsPath = "c:\DEV\tools\color-tools"
$cssPath = Join-Path $colorToolsPath "assets\css"
$jsPath = Join-Path $colorToolsPath "assets\js"

Set-Location $colorToolsPath

# Get all PHP files except header, footer, and main pages
$phpFiles = Get-ChildItem -Filter "*.php" | Where-Object { 
    $_.Name -notin @('header.php', 'footer.php', 'index.php', 'about.php', 'contact.php', 'sitemap.php')
}

Write-Host "Found $($phpFiles.Count) tool PHP files to process" -ForegroundColor Green
Write-Host ""

foreach ($file in $phpFiles) {
    $phpPath = $file.FullName
    $baseName = $file.BaseName
    $cssFile = "$baseName.css"
    $jsFile = "$baseName.js"
    
    Write-Host "Processing: $($file.Name)" -ForegroundColor Cyan
    
    # Read the PHP content
    $content = Get-Content $phpPath -Raw -Encoding UTF8
    
    # Extract CSS between <style> tags
    $cssMatches = [regex]::Matches($content, '(?s)<style>(.*?)</style>')
    if ($cssMatches.Count -gt 0) {
        $css = ""
        foreach ($match in $cssMatches) {
            $css += $match.Groups[1].Value.Trim() + "`n`n"
        }
        
        # Save CSS file
        $cssFilePath = Join-Path $cssPath $cssFile
        $css | Out-File -FilePath $cssFilePath -Encoding UTF8
        Write-Host "  Created: assets/css/$cssFile" -ForegroundColor Green
        
        # Remove <style> tags from PHP content
        $content = [regex]::Replace($content, '(?s)<style>.*?</style>', '')
    }
    
    # Extract JavaScript between <script> tags (excluding script src)
    $jsMatches = [regex]::Matches($content, '(?s)<script>(.*?)</script>')
    if ($jsMatches.Count -gt 0) {
        $js = ""
        foreach ($match in $jsMatches) {
            $js += $match.Groups[1].Value.Trim() + "`n`n"
        }
        
        # Save JS file
        $jsFilePath = Join-Path $jsPath $jsFile
        $js | Out-File -FilePath $jsFilePath -Encoding UTF8
        Write-Host "  Created: assets/js/$jsFile" -ForegroundColor Green
        
        # Remove <script> tags from PHP content
        $content = [regex]::Replace($content, '(?s)<script>.*?</script>', '')
    }
    
    # Update PHP file to add CSS and JS variables
    # Find the line with $breadcrumbs and add CSS/JS variables after it
    if ($content -match '(\$breadcrumbs\s*=.*?\];)') {
        $breadcrumbsLine = $matches[1]
        $replacement = $breadcrumbsLine + "`n"
        
        if ($cssMatches.Count -gt 0) {
            $replacement += "`$page_css = '$cssFile';`n"
        }
        if ($jsMatches.Count -gt 0) {
            $replacement += "`$page_js = '$jsFile';`n"
        }
        
        $content = $content -replace [regex]::Escape($breadcrumbsLine), $replacement
    }
    
    # Clean up extra blank lines
    $content = [regex]::Replace($content, '\n{3,}', "`n`n")
    
    # Save updated PHP file
    $content | Out-File -FilePath $phpPath -Encoding UTF8
    Write-Host "  Updated: $($file.Name) (removed inline styles/scripts)" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host ""
Write-Host "Extraction complete!" -ForegroundColor Green
Write-Host "  CSS files: $cssPath" -ForegroundColor Cyan
Write-Host "  JS files: $jsPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "All PHP files have been updated to reference external CSS and JS files." -ForegroundColor Green
