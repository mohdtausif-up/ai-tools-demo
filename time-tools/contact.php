<?php
$page_title = 'Contact Us';
$page_description = 'Get in touch with the Time Tools team.';
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
      <input type="hidden" name="csrf_token" value="<?php session_start(); if(!isset($_SESSION['csrf_token'])){ $_SESSION['csrf_token'] = bin2hex(random_bytes(32)); } echo $_SESSION['csrf_token']; ?>">
      <button type="submit">Send Message</button>
    </form>
  <div id="contact-success" style="display:none;color:#38b2ac;margin-top:1rem;">Thank you! Your message has been sent.</div>
</main>
<?php include 'footer.php'; ?>
<?php
// CSRF validation on POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  session_start();
  if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    die('Invalid CSRF token.');
  }
  // ...existing code to process form...
}
