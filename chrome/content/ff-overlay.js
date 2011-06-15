gmailgenerator.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ gmailgenerator.showFirefoxContextMenu(e); }, false);
};

gmailgenerator.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-gmailgenerator").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { gmailgenerator.onFirefoxLoad(); }, false);
