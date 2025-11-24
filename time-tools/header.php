<?php
// header.php - Time Tools Common Header
if (!isset($page_title)) $page_title = 'Time Tools';
if (!isset($page_description)) $page_description = '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo htmlspecialchars($page_title); ?></title>
  <meta name="description" content="<?php echo htmlspecialchars($page_description); ?>">
  <link rel="stylesheet" href="assets/css/common.css">
  <?php if (isset($page_css)): ?>
  <link rel="stylesheet" href="assets/css/<?php echo $page_css; ?>">
  <?php endif; ?>
  <script>
  // CSRF token helper for forms
  function getCSRFToken() {
    return '<?php session_start(); if(!isset($_SESSION["csrf_token"])){ $_SESSION["csrf_token"] = bin2hex(random_bytes(32)); } echo $_SESSION["csrf_token"]; ?>';
  }
  </script>
</head>
<body>
<header>
  <div class="header-container">
    <div class="logo"><a href="index.php" style="color:#fff;text-decoration:none;">Time Tools</a></div>
    <nav>
      <div class="menu">
        <a href="index.php">Home</a>
        <a href="about.php">About Us</a>
        <a href="contact.php">Contact Us</a>
        <a href="#" id="favourites-menu" title="My Favourite Tools" style="position:relative;">
          <span style="font-size:1.3rem;">⭐</span>
        </a>
      </div>
      <div class="hamburger" tabindex="0" aria-label="Open menu" role="button">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
    <div id="favourites-list" style="display:none;position:absolute;top:60px;right:10px;background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08);padding:1rem;min-width:220px;z-index:999;color:#222;">
      <div id="favourites-content">No favourite tools yet. Add some to see them here!</div>
    </div>
    <div id="google_translate_element" style="position:absolute;top:10px;right:10px;"></div>
      <!-- Social Media Links -->
      <div class="social-header-links" style="position:absolute;top:10px;left:10px;">
        <a href="https://twitter.com/" target="_blank" title="Twitter" rel="noopener"><span>🐦</span></a>
        <a href="https://facebook.com/" target="_blank" title="Facebook" rel="noopener"><span>📘</span></a>
        <a href="https://linkedin.com/" target="_blank" title="LinkedIn" rel="noopener"><span>💼</span></a>
        <a href="https://youtube.com/" target="_blank" title="YouTube" rel="noopener"><span>▶️</span></a>
      </div>
  </div>
</header>
  <script>
  // Favourites menu logic
  function updateFavouritesMenu() {
    const favs = JSON.parse(localStorage.getItem('favouriteTools') || '[]');
    const content = document.getElementById('favourites-content');
    if (favs.length === 0) {
      content.innerHTML = 'No favourite tools yet. Add some to see them here!';
    } else {
      content.innerHTML = '<ul>' + favs.map(f => `<li><a href="${f.url}">${f.name}</a></li>`).join('') + '</ul>';
    }
  }
  document.getElementById('favourites-menu').addEventListener('click', function(e) {
    e.preventDefault();
    const list = document.getElementById('favourites-list');
    list.style.display = (list.style.display === 'none' || !list.style.display) ? 'block' : 'none';
    updateFavouritesMenu();
  });
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#favourites-menu') && !e.target.closest('#favourites-list')) {
      document.getElementById('favourites-list').style.display = 'none';
    }
  });
  // Google Translate
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,es,fr,de,hi,zh-CN,ar,ru,pt,ja', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
  }
  </script>
  <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
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
