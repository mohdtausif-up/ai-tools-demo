<?php
$page_title = 'Batch Color Converter';
$page_description = 'Convert lists of colors between formats in bulk.';
include 'header.php';
?>
// Backend logic for batch color conversion
function hexToRgbStr($hex) {
  $hex = ltrim($hex, '#');
  if (strlen($hex) === 3) {
    $hex = $hex[0].$hex[0].$hex[1].$hex[1].$hex[2].$hex[2];
  }
  $int = hexdec($hex);
  $r = ($int >> 16) & 255;
  $g = ($int >> 8) & 255;
  $b = $int & 255;
  return "rgb($r, $g, $b)";
}
function rgbToHex($rgb) {
  if (preg_match('/rgb\((\d+),\s*(\d+),\s*(\d+)\)/', $rgb, $m)) {
    return sprintf("#%02x%02x%02x", $m[1], $m[2], $m[3]);
  }
  return $rgb;
}
function hexToHslStr($hex) {
  $hex = ltrim($hex, '#');
  if (strlen($hex) === 3) {
    $hex = $hex[0].$hex[0].$hex[1].$hex[1].$hex[2].$hex[2];
  }
  $int = hexdec($hex);
  $r = (($int >> 16) & 255) / 255;
  $g = (($int >> 8) & 255) / 255;
  $b = ($int & 255) / 255;
  $max = max($r, $g, $b);
  $min = min($r, $g, $b);
  $h = $s = $l = ($max + $min) / 2;
  if ($max == $min) {
    $h = $s = 0;
  } else {
    $d = $max - $min;
    $s = $l > 0.5 ? $d / (2 - $max - $min) : $d / ($max + $min);
    switch ($max) {
      case $r: $h = ($g - $b) / $d + ($g < $b ? 6 : 0); break;
      case $g: $h = ($b - $r) / $d + 2; break;
      case $b: $h = ($r - $g) / $d + 4; break;
    }
    $h /= 6;
  }
  return sprintf("hsl(%d, %d%%, %d%%)", round($h*360), round($s*100), round($l*100));
}
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'convert') {
  $colors = isset($_POST['colors']) ? trim($_POST['colors']) : '';
  $format = isset($_POST['format']) ? $_POST['format'] : 'hex';
  $colorArr = preg_split('/[\s,]+/', $colors);
  $converted = [];
  foreach ($colorArr as $color) {
    switch ($format) {
      case 'hex':
        $converted[] = rgbToHex($color);
        break;
      case 'rgb':
        $converted[] = hexToRgbStr($color);
        break;
      case 'hsl':
        $converted[] = hexToHslStr($color);
        break;
      case 'cmyk':
        $converted[] = 'CMYK conversion not implemented.';
        break;
      default:
        $converted[] = $color;
    }
  }
  echo '<pre>' . htmlspecialchars(implode("\n", $converted)) . '</pre>';
  exit;
}
<div class="container">
  <h1>Batch Color Converter</h1>
  <p>Convert multiple colors between HEX, RGB, HSL, and more.</p>
  <form id="batchConvertForm">
    <textarea name="colors" id="colorsInput" rows="6" placeholder="Paste your colors here (HEX, RGB, etc.)"></textarea>
    <select id="targetFormat">
      <option value="hex">HEX</option>
      <option value="rgb">RGB</option>
      <option value="hsl">HSL</option>
      <option value="cmyk">CMYK</option>
    </select>
    <button type="button" onclick="convertColors()">Convert</button>
  </form>
  <div id="convertResult"></div>
</div>
<script src="assets/js/batch-color-converter.js"></script>
<?php include 'footer.php'; ?>
