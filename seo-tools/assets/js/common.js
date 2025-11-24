// common.js - Shared navigation functionality for SEO Tools
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

  // Favourite tools logic
  function getFavouriteTools() {
    try {
      return JSON.parse(localStorage.getItem('favouriteTools') || '[]');
    } catch (e) { return []; }
  }
  function setFavouriteTools(tools) {
    localStorage.setItem('favouriteTools', JSON.stringify(tools));
  }
  function addFavouriteTool(tool) {
    var tools = getFavouriteTools();
    if (!tools.includes(tool)) {
      tools.push(tool);
      setFavouriteTools(tools);
    }
  }
  function removeFavouriteTool(tool) {
    var tools = getFavouriteTools().filter(t => t !== tool);
    setFavouriteTools(tools);
  }
  function renderFavouriteToolsMenu() {
    var listDiv = document.getElementById('favouriteToolsList');
    var tools = getFavouriteTools();
    if (!listDiv) return;
    if (tools.length === 0) {
      listDiv.innerHTML = '<div style="color:#888;text-align:center;">No favourite tools yet.<br>Add tools to favourites to show up here.</div>';
      return;
    }
    listDiv.innerHTML = '<ul style="list-style:none;padding:0;margin:0;">' +
      tools.map(tool => `<li style='margin-bottom:0.5rem;'><a href='${tool.url}' style='color:#3182ce;text-decoration:none;'>${tool.name}</a> <button onclick='removeFavouriteTool("${tool.url}");renderFavouriteToolsMenu();' style='background:none;border:none;color:#e53e3e;cursor:pointer;'>Remove</button></li>`).join('') + '</ul>';
  }
  document.addEventListener('DOMContentLoaded', function() {
    var favMenu = document.getElementById('favouriteToolsMenu');
    var favDropdown = document.getElementById('favouriteToolsDropdown');
    if (favMenu && favDropdown) {
      favMenu.addEventListener('click', function(e) {
        favDropdown.style.display = favDropdown.style.display === 'block' ? 'none' : 'block';
        renderFavouriteToolsMenu();
        e.stopPropagation();
      });
      document.addEventListener('click', function(e) {
        if (!favMenu.contains(e.target)) {
          favDropdown.style.display = 'none';
        }
      });
    }
  });
});
