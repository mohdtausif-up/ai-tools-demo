<?php
$page_title = 'Palette Similarity Finder';
$page_description = 'Find palettes similar to a given one using color distance metrics.';
include 'header.php';
?>
// Backend logic for palette similarity
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'find') {
  $palette = isset($_POST['palette']) ? trim($_POST['palette']) : '';
  $inputColors = preg_split('/[\s,]+/', $palette);
  // Mock similar palettes
  $similarPalettes = [
    ['name' => 'Sunset Glow', 'colors' => ['#ff6f61', '#e2b044', '#bb2649']],
    ['name' => 'Ocean Dream', 'colors' => ['#43b0a9', '#6b9ac4', '#bfa2db']],
    ['name' => 'Spring Meadow', 'colors' => ['#bfa2db', '#e2b044', '#43b0a9']],
  ];
  echo '<div class="row">';
  foreach ($similarPalettes as $palette) {
    echo '<div class="col-md-4 mb-3"><div style="padding:1rem;border-radius:8px;border:1px solid #eee;">';
    echo '<strong>' . htmlspecialchars($palette['name']) . '</strong><br>';
    foreach ($palette['colors'] as $color) {
      echo '<span style="display:inline-block;width:32px;height:32px;background:' . htmlspecialchars($color) . ';margin:2px;border-radius:4px;"></span> ' . htmlspecialchars($color) . '<br>';
    }
    echo '</div></div>';
  }
  echo '</div>';
  exit;
}
<div class="container">
  <h1>Palette Similarity Finder</h1>
  <p>Find similar palettes using color distance metrics.</p>
  <form id="similarityForm">
    <textarea name="palette" id="paletteInput" rows="6" placeholder="Paste your palette colors here (HEX, RGB, etc.)"></textarea>
    <button type="button" onclick="findSimilarPalettes()">Find Similar</button>
  </form>
  <div id="similarityResult"></div>
</div>
<script src="assets/js/palette-similarity-finder.js"></script>
<?php include 'footer.php'; ?>
