# Batch enhance all seo-tools PHP files with 10-point features
$toolsPath = "c:\DEV\tools\seo-tools"
$phpFiles = Get-ChildItem -Path $toolsPath -Filter *.php | Where-Object { $_.Name -notmatch '^(header|footer|about|contact|sitemap|index)\.php$' }
foreach ($phpFile in $phpFiles) {
    $toolName = ($phpFile.BaseName -replace '-', ' ')
    $toolUrl = $phpFile.Name
    $phpContent = Get-Content $phpFile.FullName -Raw -Encoding UTF8
    $page_description = "Free online $toolName tool."
    $seoMeta = @"
<!-- SEO Meta Tags -->
<meta property='og:title' content='$toolName | SEO Tools'>
<meta property='og:description' content='$page_description'>
<meta property='og:type' content='website'>
<meta property='og:url' content='https://yourdomain.com/seo-tools/$toolUrl'>
<meta property='og:image' content='https://yourdomain.com/assets/img/$toolUrl-og.png'>
<meta name='twitter:card' content='summary_large_image'>
<meta name='twitter:title' content='$toolName | SEO Tools'>
<meta name='twitter:description' content='$page_description'>
<meta name='twitter:image' content='https://yourdomain.com/assets/img/$toolUrl-og.png'>
<!-- JSON-LD Schema for Tool -->
<script type='application/ld+json'>
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "$toolName",
  "url": "https://yourdomain.com/seo-tools/$toolUrl",
  "description": "$page_description",
  "applicationCategory": "Productivity",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
"@
    $shareFavHtml = @'
  <div class="d-flex justify-content-end mb-3" style="gap:1rem;">
    <button id="share-btn" class="btn btn-outline-secondary" title="Share this tool"><span>🔗</span> Share</button>
    <button id="fav-btn" class="btn btn-outline-warning" title="Add to Favourites"><span>⭐</span> Add to Favourites</button>
  </div>
'@
    $howToFaqHtml = @'
  <section class="mt-5">
    <h2>How to Use</h2>
    <ol>
      <li>Fill in the required fields and options for your tool.</li>
      <li>Click the main action button to get results.</li>
      <li>Review the output and use additional features as needed.</li>
      <li>Use the Share or Add to Favourites buttons for quick access.</li>
    </ol>
  </section>
  <section class="mt-5">
    <h2>Frequently Asked Questions (FAQ)</h2>
    <div class="faq-list">
      <h3>How does this tool work?</h3>
      <p>This tool runs entirely in your browser. No data is sent to any server.</p>
      <h3>Can I use this tool on mobile?</h3>
      <p>Yes, all SEO Tools are fully responsive and work on all devices.</p>
      <h3>How do I add a tool to favourites?</h3>
      <p>Click the <span>⭐</span> Add to Favourites button above the form.</p>
    </div>
  </section>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does this tool work?",
        "acceptedAnswer": { "@type": "Answer", "text": "This tool runs entirely in your browser. No data is sent to any server." }
      },
      {
        "@type": "Question",
        "name": "Can I use this tool on mobile?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, all SEO Tools are fully responsive and work on all devices." }
      },
      {
        "@type": "Question",
        "name": "How do I add a tool to favourites?",
        "acceptedAnswer": { "@type": "Answer", "text": "Click the ⭐ Add to Favourites button above the form." }
      }
    ]
  }
  </script>
'@
  $phpContent = $phpContent -replace "<?php include 'header.php'; ?>", "<?php include 'header.php'; ?>`n$seoMeta"
    $phpContent = $phpContent -replace '(<h1.*?>.*?</h1>)', "$1`n$shareFavHtml"
    $phpContent = $phpContent -replace '(</main>)', "$howToFaqHtml`n$1"
    Set-Content -Path $phpFile.FullName -Value $phpContent -Encoding UTF8
}
Write-Host "All SEO tool PHP files updated with enhanced features!" -ForegroundColor Green
