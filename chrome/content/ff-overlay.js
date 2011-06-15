gmailgenerator.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){gmailgenerator.showFirefoxContextMenu(e);}, false);
};

gmailgenerator.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-gmailgenerator").hidden = gmailgenerator.isHiddenContextMenu(event);
};


gmailgenerator.isHiddenContextMenu = function(event) {
  var strDocumentUrl = document.commandDispatcher.focusedWindow.document.URL;
  if (strDocumentUrl.indexOf("mail.google.com") == -1) {
      return true;
  }
  
  var canvasFrame = window.content.document.getElementById("canvas_frame");
  if (!canvasFrame) {
      return true;
  }
  var canvasDoc = canvasFrame.contentDocument;
  var toElems = canvasDoc.getElementsByName("to");
  if (!toElems || toElems.length < 1) {
      return true;
  }
  this.toEle = toElems[0];
  var subElems = canvasDoc.getElementsByName("subject");
  if (!subElems || subElems.length < 1) {
      return true;
  }
  this.subjectEle = subElems[0];
  var bodyElems = canvasDoc.getElementsByName("body");
  if (!bodyElems || bodyElems.length < 1) {
      return true;
  }
  this.bodyEle = bodyElems[0];
  return false;
};


window.addEventListener("load", function () {gmailgenerator.onFirefoxLoad();}, false);
