// common.js - Shared navigation functionality for Time Tools
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
    var favMenu = document.getElementById('favourites-menu');
    var favList = document.getElementById('favourites-list');
    if (favList && favList.style.display === 'block' && favMenu && !favMenu.contains(e.target) && !favList.contains(e.target)) {
      favList.style.display = 'none';
    }
  });
  window.addEventListener('resize', function() {
    var menu = document.querySelector('.menu');
    if (window.innerWidth > 768 && menu) {
      menu.classList.remove('open');
    }
  });

  // Favourites menu logic
  var favMenu = document.getElementById('favourites-menu');
  var favList = document.getElementById('favourites-list');
  var favContent = document.getElementById('favourites-content');
  if (favMenu && favList) {
    favMenu.addEventListener('click', function(e) {
      e.preventDefault();
      favList.style.display = favList.style.display === 'block' ? 'none' : 'block';
      updateFavouritesList();
    });
  }
  function updateFavouritesList() {
    if (!favContent) return;
    var favs = JSON.parse(localStorage.getItem('favouriteTimeTools') || '[]');
    if (favs.length === 0) {
      favContent.textContent = 'No favourite tools yet. Add some to see them here!';
    } else {
      favContent.innerHTML = favs.map(function(tool) {
        return '<a href="' + tool.url + '" style="display:block;margin-bottom:8px;">' + tool.name + '</a>';
      }).join('');
    }
  }

  // Google Translate widget
  if (document.getElementById('google_translate_element')) {
    var gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(gtScript);
    window.googleTranslateElementInit = function() {
      new window.google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
    };
  }
});
