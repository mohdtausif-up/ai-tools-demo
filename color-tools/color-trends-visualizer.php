<?php
$page_title = 'Color Trends Visualizer';
$page_description = 'See trending colors from design platforms and social media.';
include 'header.php';
?>
// Backend logic for trending colors
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'trends') {
  $trends = [
    ['name' => 'Digital Lavender', 'hex' => '#BFA2DB'],
    ['name' => 'Verdigris', 'hex' => '#43B0A9'],
    ['name' => 'Luscious Red', 'hex' => '#FF6F61'],
    ['name' => 'Tranquil Blue', 'hex' => '#6B9AC4'],
    ['name' => 'Sundial', 'hex' => '#E2B044'],
    ['name' => 'Vivid Magenta', 'hex' => '#BB2649'],
  ];
  echo '<div class="row">';
  foreach ($trends as $trend) {
    echo '<div class="col-md-4 mb-3"><div style="background:' . htmlspecialchars($trend['hex']) . ';color:#fff;padding:1rem;border-radius:8px;">';
    echo '<strong>' . htmlspecialchars($trend['name']) . '</strong><br>';
    echo htmlspecialchars($trend['hex']);
    echo '</div></div>';
  }
  echo '</div>';
  exit;
}
<div class="container">
  <h1>Color Trends Visualizer</h1>
  <p>Discover trending colors from popular design sources.</p>
  <div id="trendsResult"></div>
</div>
<script src="assets/js/color-trends-visualizer.js"></script>
<?php include 'footer.php'; ?>
