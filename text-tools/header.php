<?php
// header.php - Text Tools Common Header
if (!isset($page_title)) $page_title = 'Text Tools';
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
</head>
<body>
<header>
  <div class="header-container">
    <div class="logo"><a href="index.php" style="color:#fff;text-decoration:none;">Text Tools</a></div>
    <nav>
      <div class="menu">
        <a href="index.php">Home</a>
        <a href="about.php">About Us</a>
        <a href="contact.php">Contact Us</a>
         <a href="sitemap.php">Sitemap</a>
      </div>
        <div class="social-header">
          <a href="https://twitter.com/" target="_blank" title="Twitter"><span>🐦</span></a>
          <a href="https://facebook.com/" target="_blank" title="Facebook"><span>📘</span></a>
          <a href="https://linkedin.com/" target="_blank" title="LinkedIn"><span>💼</span></a>
          <a href="https://youtube.com/" target="_blank" title="YouTube"><span>▶️</span></a>
        </div>
        <div id="favourite-tools-menu" class="favourite-menu">
          <span onclick="toggleFavouriteMenu()" style="cursor:pointer;">⭐ My Favourite Tools</span>
          <div id="favourite-tools-list" class="favourite-list" style="display:none;"></div>
        </div>
      <div class="hamburger" tabindex="0" aria-label="Open menu" role="button">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
      <div id="google_translate_element" style="margin-top:10px;"></div>
      <script type="text/javascript">
      function toggleFavouriteMenu() {
        var list = document.getElementById('favourite-tools-list');
        if (list.style.display === 'none') {
          var favs = JSON.parse(localStorage.getItem('favouriteTools') || '[]');
          if (favs.length === 0) {
            list.innerHTML = '<div style="padding:10px;">No favourite tools yet. Add some to show up here.</div>';
          } else {
            list.innerHTML = '<ul>' + favs.map(function(tool) {
              return '<li><a href="' + tool.url + '">' + tool.name + '</a></li>';
            }).join('') + '</ul>';
          }
          list.style.display = 'block';
        } else {
          list.style.display = 'none';
        }
      }
      </script>
      <script type="text/javascript">
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
      }
      </script>
      <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
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
