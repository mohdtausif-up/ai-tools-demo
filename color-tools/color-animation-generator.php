<?php
$page_title = 'Color Animation Generator';
$page_description = 'Create CSS/JS animations for color transitions.';
include 'header.php';
?>
// Backend logic for color animation generation
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'generate') {
  $colors = isset($_POST['colors']) ? trim($_POST['colors']) : '';
  $type = isset($_POST['type']) ? $_POST['type'] : 'fade';
  $colorArr = preg_split('/[\s,]+/', $colors);
  $css = '';
  if ($type === 'fade') {
    $css = '@keyframes colorFade {\n';
    foreach ($colorArr as $i => $color) {
      $percent = round($i * 100 / max(count($colorArr)-1,1));
      $css .= "  $percent% { background: $color; }\n";
    }
    $css .= '}\n.fade-anim { animation: colorFade 3s infinite; }';
  } elseif ($type === 'slide') {
    $css = '@keyframes colorSlide {\n';
    foreach ($colorArr as $i => $color) {
      $percent = round($i * 100 / max(count($colorArr)-1,1));
      $css .= "  $percent% { background: $color; }\n";
    }
    $css .= '}\n.slide-anim { animation: colorSlide 3s infinite linear; }';
  } elseif ($type === 'loop') {
    $css = '@keyframes colorLoop {\n';
    foreach ($colorArr as $i => $color) {
      $percent = round($i * 100 / max(count($colorArr)-1,1));
      $css .= "  $percent% { background: $color; }\n";
    }
    $css .= '}\n.loop-anim { animation: colorLoop 5s infinite alternate; }';
  } else {
    $css = 'Unknown animation type.';
  }
  echo '<pre>' . htmlspecialchars($css) . '</pre>';
  exit;
}
<div class="container">
  <h1>Color Animation Generator</h1>
  <p>Create beautiful color transition animations for web projects.</p>
  <form id="animationForm">
    <input type="text" name="colors" id="colorsInput" placeholder="Enter colors (comma separated)">
    <select id="animationType">
      <option value="fade">Fade</option>
      <option value="slide">Slide</option>
      <option value="loop">Loop</option>
    </select>
    <button type="button" onclick="generateAnimation()">Generate Animation</button>
  </form>
  <div id="animationResult"></div>
</div>
<script src="assets/js/color-animation-generator.js"></script>
<?php include 'footer.php'; ?>
