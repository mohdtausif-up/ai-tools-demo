<?php
$page_title = 'Color Accessibility Analyzer';
$page_description = 'Analyze palettes for WCAG compliance and get suggestions.';
include 'header.php';
?>
// Backend accessibility analysis logic
function hexToRgb($hex) {
  $hex = ltrim($hex, '#');
  if (strlen($hex) === 3) {
    $hex = $hex[0].$hex[0].$hex[1].$hex[1].$hex[2].$hex[2];
  }
  $int = hexdec($hex);
  return [($int >> 16) & 255, ($int >> 8) & 255, $int & 255];
}
function luminance($rgb) {
  foreach ($rgb as &$v) {
    $v /= 255;
    $v = $v <= 0.03928 ? $v / 12.92 : pow(($v + 0.055) / 1.055, 2.4);
  }
  return 0.2126 * $rgb[0] + 0.7152 * $rgb[1] + 0.0722 * $rgb[2];
}
function contrastRatio($rgb1, $rgb2) {
  $lum1 = luminance($rgb1);
  $lum2 = luminance($rgb2);
  return ($lum1 > $lum2)
    ? ($lum1 + 0.05) / ($lum2 + 0.05)
    : ($lum2 + 0.05) / ($lum1 + 0.05);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'analyze') {
  $palette = isset($_POST['palette']) ? trim($_POST['palette']) : '';
  $colors = preg_split('/[\s,]+/', $palette);
  $results = [];
  for ($i = 0; $i < count($colors); $i++) {
    for ($j = $i + 1; $j < count($colors); $j++) {
      $rgb1 = hexToRgb($colors[$i]);
      $rgb2 = hexToRgb($colors[$j]);
      $ratio = contrastRatio($rgb1, $rgb2);
      $wcag = $ratio >= 4.5 ? 'Pass' : 'Fail';
      $results[] = [
        'color1' => $colors[$i],
        'color2' => $colors[$j],
        'ratio' => round($ratio, 2),
        'wcag' => $wcag
      ];
    }
  }
  echo '<table class="table"><thead><tr><th>Color 1</th><th>Color 2</th><th>Contrast Ratio</th><th>WCAG AA</th></tr></thead><tbody>';
  foreach ($results as $r) {
    echo '<tr><td style="background:' . htmlspecialchars($r['color1']) . ';color:#fff">' . htmlspecialchars($r['color1']) . '</td>';
    echo '<td style="background:' . htmlspecialchars($r['color2']) . ';color:#fff">' . htmlspecialchars($r['color2']) . '</td>';
    echo '<td>' . $r['ratio'] . '</td>';
    echo '<td>' . $r['wcag'] . '</td></tr>';
  }
  echo '</tbody></table>';
  exit;
}
<div class="container">
  <h1>Color Accessibility Analyzer</h1>
  <p>Check your palette for accessibility issues and get WCAG compliance suggestions.</p>
  <form id="accessibilityForm">
    <textarea name="palette" id="paletteInput" rows="6" placeholder="Paste your palette colors here (HEX, RGB, etc.)"></textarea>
    <button type="button" onclick="analyzeAccessibility()">Analyze</button>
  </form>
  <div id="accessibilityResult"></div>
</div>
<script src="assets/js/color-accessibility-analyzer.js"></script>
<?php include 'footer.php'; ?>
