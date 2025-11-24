# Extract CSS and JS from main pages (about, contact, sitemap)

$colorToolsPath = "c:\DEV\tools\color-tools"
Set-Location $colorToolsPath

$files = @('about.php', 'contact.php', 'sitemap.php')

foreach ($file in $files) {
    Write-Host "Processing: $file" -ForegroundColor Cyan
    
    $content = Get-Content $file -Raw -Encoding UTF8
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file)
    
    # Extract CSS
    $cssMatches = [regex]::Matches($content, '(?s)<style>(.*?)</style>')
    if ($cssMatches.Count -gt 0) {
        $css = ""
        foreach ($match in $cssMatches) {
            $css += $match.Groups[1].Value.Trim() + "`n`n"
        }
        
        $cssFilePath = Join-Path "assets\css" "$baseName.css"
        $css | Out-File -FilePath $cssFilePath -Encoding UTF8
        Write-Host "  Created: assets/css/$baseName.css" -ForegroundColor Green
        
        # Remove <style> tags
        $content = [regex]::Replace($content, '(?s)<style>.*?</style>', '')
    }
    
    # Extract JS
    $jsMatches = [regex]::Matches($content, '(?s)<script>(.*?)</script>')
    if ($jsMatches.Count -gt 0) {
        $js = ""
        foreach ($match in $jsMatches) {
            $js += $match.Groups[1].Value.Trim() + "`n`n"
        }
        
        $jsFilePath = Join-Path "assets\js" "$baseName.js"
        $js | Out-File -FilePath $jsFilePath -Encoding UTF8
        Write-Host "  Created: assets/js/$baseName.js" -ForegroundColor Green
        
        # Remove <script> tags
        $content = [regex]::Replace($content, '(?s)<script>.*?</script>', '')
    }
    
    # Add CSS/JS variables after breadcrumbs
    if ($content -match '(\$breadcrumbs\s*=.*?\];)') {
        $breadcrumbsLine = $matches[1]
        $replacement = $breadcrumbsLine + "`n"
        
        if (Test-Path "assets\css\$baseName.css") {
            $replacement += "`$page_css = '$baseName.css';`n"
        }
        if (Test-Path "assets\js\$baseName.js") {
            $replacement += "`$page_js = '$baseName.js';`n"
        }
        
        $content = $content -replace [regex]::Escape($breadcrumbsLine), $replacement
    }
    
    # Clean up extra blank lines
    $content = [regex]::Replace($content, '\n{3,}', "`n`n")
    
    # Save updated file
    $content | Out-File -FilePath $file -Encoding UTF8
    Write-Host "  Updated: $file" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Done! All main pages updated." -ForegroundColor Green
