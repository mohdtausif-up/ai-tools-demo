// common.js - Shared navigation functionality for Text Tools
function toggleMenu() {
  var menu = document.querySelector('.menu');
  if (menu) menu.classList.toggle('open');
}
document.addEventListener('DOMContentLoaded', function() {
  var hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  document.addEventListener('click', function(e) {
    var menu = document.querySelector('.menu');
    if (menu && menu.classList.contains('open')) {
      if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.classList.remove('open');
      }
    }
  });
  window.addEventListener('resize', function() {
    var menu = document.querySelector('.menu');
    if (window.innerWidth > 768 && menu) {
      menu.classList.remove('open');
    }
  });
});
