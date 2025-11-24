<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($page_title) ? $page_title : 'Color Tools Collection'; ?></title>
  <meta name="description" content="<?php echo isset($page_description) ? $page_description : 'Professional color tools for designers and developers'; ?>">
  
  <!-- Common Styles -->
  <link rel="stylesheet" href="assets/css/common.css">
  
  <!-- Page-specific styles -->
  <?php if (isset($page_css)): ?>
  <link rel="stylesheet" href="assets/css/<?php echo $page_css; ?>">
  <?php endif; ?>
</head>
<body>
  <?php
    if (session_status() === PHP_SESSION_NONE) {
      session_start();
    }
    if (empty($_SESSION['csrf_token'])) {
      $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    $csrf_token = $_SESSION['csrf_token'];
  ?>
  <header class="site-header">
    <div class="header-container">
      <a href="index.php" class="logo">
        <span>🎨</span>
        <span>Color Tools</span>
      </a>
      <button class="hamburger" onclick="toggleMenu()" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav>
        <ul class="nav-menu" id="navMenu">
          <li><a href="index.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'active' : ''; ?>">Home</a></li>
          <li><a href="about.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'about.php' ? 'active' : ''; ?>">About Us</a></li>
          <li><a href="contact.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'contact.php' ? 'active' : ''; ?>">Contact Us</a></li>
          <li>
            <button id="favourites-menu-btn" title="My Favourite Tools" style="font-size:1.3rem;background:none;border:none;cursor:pointer;">⭐</button>
            <div id="favourites-list" style="display:none;position:absolute;top:60px;right:10px;background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08);padding:1rem;min-width:220px;z-index:999;color:#222;">
              <div id="favourites-content">No favourite tools yet. Add some to see them here!</div>
            </div>
          </li>
        </ul>
      </nav>
      <div id="google_translate_element" style="position:absolute;top:10px;right:10px;"></div>
    </div>
    <script type="text/javascript">
      function toggleFavouritesList() {
        var el = document.getElementById('favourites-list');
        el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
        var favs = JSON.parse(localStorage.getItem('favouriteColorTools') || '[]');
        var content = document.getElementById('favourites-content');
        if (favs.length === 0) {
          content.innerHTML = 'No favourite tools yet. Add some to see them here!';
        } else {
          content.innerHTML = favs.map(f => `<a href='${f.url}' style='display:block;padding:4px 0;'>${f.name}</a>`).join('');
        }
      }
      document.addEventListener('DOMContentLoaded', function() {
        var btn = document.getElementById('favourites-menu-btn');
        if (btn) btn.onclick = toggleFavouritesList;
      });
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
      }
    </script>
    <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
  </header>
  
  <?php if (isset($breadcrumbs) && !empty($breadcrumbs)): ?>
  <div class="breadcrumb">
    <div class="breadcrumb-container">
      <a href="index.php">🏠 Home</a>
      <?php foreach ($breadcrumbs as $index => $crumb): ?>
        <span class="breadcrumb-separator">›</span>
        <?php if ($index === count($breadcrumbs) - 1): ?>
          <span><?php echo htmlspecialchars($crumb['title']); ?></span>
        <?php else: ?>
          <a href="<?php echo htmlspecialchars($crumb['url']); ?>"><?php echo htmlspecialchars($crumb['title']); ?></a>
        <?php endif; ?>
      <?php endforeach; ?>
    </div>
  </div>
  <?php endif; ?>
