<?php
// header.php - SEO Tools Common Header
if (!isset($page_title)) $page_title = 'SEO Tools';
if (!isset($page_description)) $page_description = '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo htmlspecialchars($page_title); ?></title>
  <meta name="description" content="<?php echo htmlspecialchars($page_description); ?>">
    <?php if (isset($page_keywords)): ?>
    <meta name="keywords" content="<?php echo htmlspecialchars($page_keywords); ?>">
    <?php endif; ?>
    <?php if (isset($canonical_url)): ?>
    <link rel="canonical" href="<?php echo htmlspecialchars($canonical_url); ?>">
    <?php endif; ?>
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="<?php echo htmlspecialchars($page_title); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($page_description); ?>">
    <meta property="og:type" content="website">
    <?php if (isset($og_url)): ?>
    <meta property="og:url" content="<?php echo htmlspecialchars($og_url); ?>">
    <?php endif; ?>
    <?php if (isset($og_image)): ?>
    <meta property="og:image" content="<?php echo htmlspecialchars($og_image); ?>">
    <?php endif; ?>
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo htmlspecialchars($page_title); ?>">
    <meta name="twitter:description" content="<?php echo htmlspecialchars($page_description); ?>">
    <?php if (isset($twitter_image)): ?>
    <meta name="twitter:image" content="<?php echo htmlspecialchars($twitter_image); ?>">
    <?php endif; ?>
  <link rel="stylesheet" href="assets/css/common.css">
  <?php if (isset($page_css)): ?>
  <link rel="stylesheet" href="assets/css/<?php echo $page_css; ?>">
  <?php endif; ?>
    <?php if (isset($json_ld_schema)): ?>
    <script type="application/ld+json">
      <?php echo $json_ld_schema; ?>
    </script>
    <?php endif; ?>
</head>
<body>
<header>
  <div class="header-container">
    <div class="logo"><a href="index.php" style="color:#fff;text-decoration:none;">SEO Tools</a></div>
    <nav>
      <div class="menu">
        <a href="index.php">Home</a>
        <a href="about.php">About Us</a>
        <a href="contact.php">Contact Us</a>
      </div>
        <div class="favourite-tools-menu" id="favouriteToolsMenu" tabindex="0" aria-label="My Favourite Tools" role="button" style="margin-left:1rem;position:relative;">
          <span style="font-size:1.3rem;cursor:pointer;">&#9733; My Favourite Tools</span>
          <div id="favouriteToolsDropdown" style="display:none;position:absolute;top:2.2rem;right:0;background:#fff;color:#222;box-shadow:0 2px 8px rgba(0,0,0,0.12);border-radius:6px;min-width:220px;z-index:1000;padding:1rem;">
            <div id="favouriteToolsList">Loading...</div>
          </div>
        </div>
      <div class="hamburger" tabindex="0" aria-label="Open menu" role="button">
        <span></span>
        <span></span>
        <span></span>
      </div>
        <div class="social-media-links">
          <a href="https://facebook.com/yourpage" target="_blank" rel="noopener" aria-label="Facebook"><img src="assets/img/facebook.svg" alt="Facebook" style="height:24px;width:24px;"></a>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener" aria-label="Twitter"><img src="assets/img/twitter.svg" alt="Twitter" style="height:24px;width:24px;"></a>
          <a href="https://linkedin.com/company/yourcompany" target="_blank" rel="noopener" aria-label="LinkedIn"><img src="assets/img/linkedin.svg" alt="LinkedIn" style="height:24px;width:24px;"></a>
          <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener" aria-label="Instagram"><img src="assets/img/instagram.svg" alt="Instagram" style="height:24px;width:24px;"></a>
          <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener" aria-label="YouTube"><img src="assets/img/youtube.svg" alt="YouTube" style="height:24px;width:24px;"></a>
        </div>
          <div id="google_translate_element" style="margin-left:1.5rem;"></div>
    </nav>
  </div>
</header>
<?php if (isset($breadcrumbs) && is_array($breadcrumbs)): ?>
  <nav class="breadcrumbs">
    <?php foreach ($breadcrumbs as $i => $crumb): ?>
      <?php if (!empty($crumb['url'])): ?>
        <a href="<?php echo $crumb['url']; ?>"><?php echo htmlspecialchars($crumb['title']); ?></a>
      <?php else: ?>
        <span><?php echo htmlspecialchars($crumb['title']); ?></span>
      <?php endif; ?>
      <?php if ($i < count($breadcrumbs) - 1): ?><span>&gt;</span><?php endif; ?>
    <?php endforeach; ?>
  </nav>
<?php endif; ?>
