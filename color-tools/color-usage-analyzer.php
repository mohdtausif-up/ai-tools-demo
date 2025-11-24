<?php
$page_title = 'Color Usage Analyzer';
$page_description = 'Upload an image or CSS file and get a breakdown of color usage.';
include 'header.php';
?>
// Backend logic for color usage analysis
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'analyze') {
  if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $filename = $_FILES['file']['name'];
    $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    if ($ext === 'css') {
      // Mock: extract color codes from CSS file
      $css = file_get_contents($_FILES['file']['tmp_name']);
      preg_match_all('/#[0-9a-fA-F]{3,6}/', $css, $matches);
      $colors = array_count_values($matches[0]);
      echo '<h3>CSS Color Usage</h3><ul>';
      foreach ($colors as $color => $count) {
        echo '<li><span style="background:' . htmlspecialchars($color) . ';color:#fff;padding:2px 8px;border-radius:4px;">' . htmlspecialchars($color) . '</span> - ' . $count . ' times</li>';
      }
      echo '</ul>';
    } else {
      // Mock: image color analysis placeholder
      echo '<h3>Image Color Usage</h3><div class="alert alert-info">Image color analysis not implemented in demo.</div>';
    }
  } else {
    echo '<div class="alert alert-danger">File upload failed.</div>';
  }
  exit;
}
<div class="container">
  <h1>Color Usage Analyzer</h1>
  <p>Analyze color usage in images or CSS files.</p>
  <form id="usageForm" enctype="multipart/form-data">
    <input type="file" name="file" id="fileInput" accept="image/*,.css">
    <button type="button" onclick="analyzeUsage()">Analyze</button>
  </form>
  <div id="usageResult"></div>
</div>
<script src="assets/js/color-usage-analyzer.js"></script>
<?php include 'footer.php'; ?>
