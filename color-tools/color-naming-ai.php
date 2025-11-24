<?php
$page_title = 'Color Naming AI';
$page_description = 'Suggest creative names for custom colors using AI.';
include 'header.php';
?>
// Backend logic for color naming
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'suggest') {
  $color = isset($_POST['color']) ? trim($_POST['color']) : '';
  // Simple mock AI naming logic
  $names = [
    '#667eea' => 'Indigo Breeze',
    '#ff6f61' => 'Luscious Red',
    '#43b0a9' => 'Verdigris',
    '#e2b044' => 'Sundial',
    '#bb2649' => 'Vivid Magenta',
  ];
  $name = $names[strtolower($color)] ?? 'Custom Color ' . strtoupper($color);
  echo '<div class="alert alert-success">Suggested Name: <strong>' . htmlspecialchars($name) . '</strong></div>';
  exit;
}
<div class="container">
  <h1>Color Naming AI</h1>
  <p>Get creative and unique names for your colors.</p>
  <form id="namingForm">
    <input type="text" name="color" id="colorInput" placeholder="#667eea or rgb(102,126,234)">
    <button type="button" onclick="suggestColorName()">Suggest Name</button>
  </form>
  <div id="nameResult"></div>
</div>
<script src="assets/js/color-naming-ai.js"></script>
<?php include 'footer.php'; ?>
