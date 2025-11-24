<?php
// footer.php - Text Tools Common Footer
?>
<footer>
  <div class="footer-container">
    <div class="social-links">
      <a href="https://twitter.com/" target="_blank" title="Twitter"><span>🐦</span></a>
      <a href="https://facebook.com/" target="_blank" title="Facebook"><span>📘</span></a>
      <a href="https://linkedin.com/" target="_blank" title="LinkedIn"><span>💼</span></a>
      <a href="https://youtube.com/" target="_blank" title="YouTube"><span>▶️</span></a>
    </div>
    <a class="sitemap-link" href="sitemap.php">HTML Sitemap</a>
    <div style="font-size:0.95rem;color:#cbd5e1;margin-top:0.5rem;">&copy; <?php echo date('Y'); ?> Text Tools. All rights reserved.</div>
  </div>
</footer>
<script src="assets/js/common.js"></script>
<?php if (isset($page_js)): ?>
<script src="assets/js/<?php echo $page_js; ?>"></script>
<?php endif; ?>
</body>
</html>
