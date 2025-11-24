<?php
// about.php - SEO Tools About Page
$page_title = 'About Us';
$page_description = 'Learn more about our SEO tools and mission.';
$breadcrumbs = [
  ['title' => 'Home', 'url' => 'index.php'],
  ['title' => 'About Us', 'url' => '']
];
$page_css = 'about.css';
include 'header.php';
?>
<main style="max-width:900px;margin:2rem auto;padding:1rem;">
  <h1>About SEO Tools</h1>
  <p>SEO Tools is a suite of free, easy-to-use utilities for webmasters, marketers, and developers. Our mission is to help you optimize your website, improve search rankings, and analyze technical SEO issues with simple online tools.</p>
  <section style="margin-top:2rem;">
    <h2>Features</h2>
    <ul>
      <li>Meta Tag Analyzer</li>
      <li>Keyword Density Checker</li>
      <li>Robots.txt Generator</li>
      <li>Schema Markup Validator</li>
      <li>And many more!</li>
    </ul>
  </section>
  <section style="margin-top:2rem;">
    <h2>Why Use Us?</h2>
    <ul>
      <li>Completely free, no registration required</li>
      <li>Fast, accurate results</li>
      <li>Mobile-friendly and easy to use</li>
      <li>Regularly updated with new tools</li>
    </ul>
  </section>
</main>
<?php include 'footer.php'; ?>
