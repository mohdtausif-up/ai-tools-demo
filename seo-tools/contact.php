<?php
// contact.php - SEO Tools Contact Page
$page_title = 'Contact Us';
$page_description = 'Get in touch with the SEO Tools team.';
$breadcrumbs = [
  ['title' => 'Home', 'url' => 'index.php'],
  ['title' => 'Contact Us', 'url' => '']
];
$page_css = 'contact.css';
$page_js = 'contact.js';
include 'header.php';
?>
<main style="max-width:700px;margin:2rem auto;padding:1rem;">
  <h1>Contact Us</h1>
  <form id="contact-form" style="margin-top:1.5rem;">
    <label>Name:<br><input type="text" name="name" required></label><br><br>
    <label>Email:<br><input type="email" name="email" required></label><br><br>
    <label>Message:<br><textarea name="message" rows="5" required></textarea></label><br><br>
    <button type="submit">Send Message</button>
  </form>
  <div id="contact-success" style="display:none;color:#38b2ac;margin-top:1rem;">Thank you! Your message has been sent.</div>
</main>
<?php include 'footer.php'; ?>
