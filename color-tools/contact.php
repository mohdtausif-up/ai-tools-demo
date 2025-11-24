
<?php
$page_title = 'Contact Us - Color Tools Collection';
$page_description = 'Get in touch with the Color Tools team. We\'re here to help with questions, feedback, and support.';
$breadcrumbs = [
  ['title' => 'Contact Us', 'url' => '']
];
include 'header.php';

// CSRF validation for POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    echo '<div class="form-message error">Invalid CSRF token. Please reload the page and try again.</div>';
    exit;
  }
  // ...existing form processing logic...
}
?>

<div class="main-content">
  <div class="page-container">
    <div class="content-card">
      <h1>Contact Us</h1>
      <p class="subtitle">We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
      
      <div class="contact-layout">
        <div class="contact-form-section">
          <form id="contactForm" class="contact-form" method="post">
            <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf_token); ?>">
            <div class="form-group">
              <label for="name">Name *</label>
              <input type="text" id="name" name="name" required placeholder="Your name">
            </div>
            
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" name="email" required placeholder="your@email.com">
            </div>
            
            <div class="form-group">
              <label for="subject">Subject *</label>
              <input type="text" id="subject" name="subject" required placeholder="What's this about?">
            </div>
            
            <div class="form-group">
              <label for="message">Message *</label>
              <textarea id="message" name="message" rows="6" required placeholder="Your message here..."></textarea>
            </div>
            
            <button type="submit" class="submit-btn">
              <span class="btn-text">Send Message</span>
              <span class="btn-icon">→</span>
            </button>
          </form>
          
          <div id="formMessage" class="form-message" style="display: none;"></div>
        </div>
        
        <div class="contact-info-section">
          <div class="info-card">
            <h3>📧 Email</h3>
            <p>support@colortools.com</p>
          </div>
          
          <div class="info-card">
            <h3>💬 Support Hours</h3>
            <p>Monday - Friday<br>9:00 AM - 5:00 PM EST</p>
          </div>
          
          <div class="info-card">
            <h3>🚀 Quick Help</h3>
            <p>Check our <a href="sitemap.php">sitemap</a> to find the tool you need</p>
          </div>
          
          <div class="info-card">
            <h3>📱 Social Media</h3>
            <p>Follow us on our social channels for updates and tips</p>
            <div class="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="faq-section">
        <h2>Frequently Asked Questions</h2>
        
        <div class="faq-item">
          <h3>Are all tools really free?</h3>
          <p>Yes! All our color tools are completely free to use with no registration or payment required.</p>
        </div>
        
        <div class="faq-item">
          <h3>Do I need to install anything?</h3>
          <p>No installation needed. All tools work directly in your web browser on any device.</p>
        </div>
        
        <div class="faq-item">
          <h3>Is my data safe?</h3>
          <p>Absolutely! All processing happens locally in your browser. We don't collect, store, or transmit any of your data.</p>
        </div>
        
        <div class="faq-item">
          <h3>Can I use these tools for commercial projects?</h3>
          <p>Yes, you can use all our tools for personal and commercial projects without any restrictions.</p>
        </div>
      </div>
    </div>
  </div>
</div>





<?php include 'footer.php'; ?>

