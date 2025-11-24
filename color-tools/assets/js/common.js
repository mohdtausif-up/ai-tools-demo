// Color Tools - Common JavaScript

// Toggle mobile menu
function toggleMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.getElementById('navMenu');
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Close menu on window resize to desktop size
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }
});
