<?php
$page_title = 'Color Palette Exporter';
$page_description = 'Export color palettes to ASE, SVG, PNG, CSS, and JSON formats.';
include 'header.php';
?>
// Backend export logic
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'export') {
  $palette = isset($_POST['palette']) ? trim($_POST['palette']) : '';
  $format = isset($_POST['format']) ? $_POST['format'] : 'json';
  $colors = preg_split('/[\s,]+/', $palette);
  $result = '';
  switch ($format) {
    case 'json':
      $result = '<pre>' . htmlspecialchars(json_encode($colors, JSON_PRETTY_PRINT)) . '</pre>';
      break;
    case 'css':
      $css = ".palette {\n";
      foreach ($colors as $i => $color) {
        $css .= "  --color-$i: $color;\n";
      }
      $css .= "}";
      $result = '<pre>' . htmlspecialchars($css) . '</pre>';
      break;
    case 'svg':
      $svg = '<svg width="300" height="40">';
      $w = 300 / max(count($colors), 1);
      foreach ($colors as $i => $color) {
        $svg .= '<rect x="' . ($i * $w) . '" y="0" width="' . $w . '" height="40" fill="' . htmlspecialchars($color) . '" />';
      }
      $svg .= '</svg>';
      $result = $svg;
      break;
    case 'png':
      // PNG export placeholder
      $result = '<div class="alert alert-info">PNG export not implemented in demo.</div>';
      break;
    case 'ase':
      // ASE export placeholder
      $result = '<div class="alert alert-info">ASE export not implemented in demo.</div>';
      break;
    default:
      $result = '<div class="alert alert-danger">Unknown format.</div>';
  }
  echo $result;
  exit;
}
<div class="container">
  <h1>Color Palette Exporter</h1>
  <p>Export your palette to multiple formats for use in design tools and code.</p>
  <form id="paletteExportForm">
    <textarea name="palette" id="paletteInput" rows="6" placeholder="Paste your palette colors here (HEX, RGB, etc.)"></textarea>
    <div>
      <label>Export Format:</label>
      <select id="exportFormat">
        <option value="ase">ASE</option>
        <option value="svg">SVG</option>
        <option value="png">PNG</option>
        <option value="css">CSS</option>
        <option value="json">JSON</option>
      </select>
    </div>
    <button type="button" onclick="exportPalette()">Export</button>
  </form>
  <div id="exportResult"></div>
</div>
<script src="assets/js/color-palette-exporter.js"></script>
<?php include 'footer.php'; ?>
