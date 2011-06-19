gmailgenerator.onFirefoxLoad = function(event) {
    document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){gmailgenerator.showFirefoxContextMenu(e);}, false);
    gBrowser.addEventListener('DOMContentLoaded', function (e) {
        gmailgenerator.composeTravelMail(e);
    }, false);
};

gmailgenerator.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-gmailgenerator").hidden = gmailgenerator.isHiddenContextMenu(event);
};


gmailgenerator.isHiddenContextMenu = function(event) {
  if (gmailgenerator.getCurrentURL().indexOf("mail.google.com") == -1) {
      return true;
  }
  var canvasFrame = window.content.document.getElementById("canvas_frame");
  if (!canvasFrame) {
      return true;
  }
  this.canvasDoc = canvasFrame.contentDocument;
  
//  var toElems = canvasDoc.getElementsByName("to");
//  if (!toElems || toElems.length < 1) {
//      return true;
//  }
//  this.toEle = toElems[0];
//  var subElems = canvasDoc.getElementsByName("subject");
//  if (!subElems || subElems.length < 1) {
//      return true;
//  }
//  this.subjectEle = subElems[0];
//  var bodyElems = canvasDoc.getElementsByName("body");
//  if (!bodyElems || bodyElems.length < 1) {
//      return true;
//  }
//  this.bodyEle = bodyElems[0];
  return false;
};

gmailgenerator.composeTravelMail = function(event) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                 .getService(Components.interfaces.nsIPromptService);
    var position = gmailgenerator.getCurrentURL().indexOf("&travelType=");
    if ( position > -1) {
        var travelType = getCurrentURL().replace(/\S*&travelType=/,"");
        gmailgenerator.getPromptService().alert(window, this.strings.getString("helloMessageTitle"),
                                travelType);
    }
};

window.addEventListener("load", function () {gmailgenerator.onFirefoxLoad();}, false);
