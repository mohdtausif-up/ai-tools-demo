// contact.js - Handles contact form submission

document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('contact-form');
  var success = document.getElementById('contact-success');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    });
  }
});
