<?php
$page_title = 'HTML Sitemap';
$page_description = 'Browse all time tools and pages.';
$breadcrumbs = [
  ['title' => 'Home', 'url' => 'index.php'],
  ['title' => 'HTML Sitemap', 'url' => '']
];
$page_css = 'sitemap.css';
include 'header.php';
?>
<main style="max-width:900px;margin:2rem auto;padding:1rem;">
  <h1>HTML Sitemap</h1>
  <ul style="margin-top:1.5rem;">
    <li><a href="index.php">Home</a></li>
    <li><a href="about.php">About Us</a></li>
    <li><a href="contact.php">Contact Us</a></li>
    <!-- Add tool links here -->
  </ul>
</main>
<?php include 'footer.php'; ?>
