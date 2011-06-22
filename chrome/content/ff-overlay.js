gmailgenerator.onFirefoxLoad = function(event) {
    document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){gmailgenerator.showFirefoxContextMenu(e);}, false);
    gBrowser.addEventListener('DOMContentLoaded', function (e) {
        gmailgenerator.composeTravelMail(e);
    }, false);
};

gmailgenerator.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-gmailgenerator-domestic").hidden = gmailgenerator.isHiddenContextMenu(event);
  document.getElementById("context-gmailgenerator-international").hidden = gmailgenerator.isHiddenContextMenu(event);
};


gmailgenerator.isHiddenContextMenu = function(event) {
  if (gmailgenerator.getCurrentURL().indexOf("mail.google.com") == -1) {
      return true;
  }
  var canvasFrame = gmailgenerator.getCanvasFrame();
  if (!canvasFrame) {
      return true;
  }
  return false;
};

gmailgenerator.composeTravelMail = function(event) {
    var position = gmailgenerator.getCurrentURL().indexOf("&travelType=");
    if ( position > -1) {
        gmailgenerator.travelType = gmailgenerator.getCurrentURL().replace(/\S*&travelType=/,"");
        gmailgenerator.loadingCheck();
    }
};

gmailgenerator.loadingCheck = function(event) {
    window.setTimeout(function(){   gmailgenerator.populateMailContent(); }, 1000);
};



gmailgenerator.populateMailContent = function() {
    var template = gmailgenerator.getTemplate(gmailgenerator.travelType);
    var canvasFrame = gmailgenerator.getCanvasFrame();
    if (canvasFrame) {
        var canvasDoc = canvasFrame.contentDocument;
        if (canvasDoc) {
              var toElem = canvasDoc.getElementById(":qo");
              if (toElem) {
                  canvasDoc.getElementById(":rl").childNodes[1].style.display = "";
    //              canvasDoc.getElementById(":re").style.display = "none";
                  toElem.value = template.getEmailTo();
                  canvasDoc.getElementById(":qn").value = template.getEmailCc();
                  canvasDoc.getElementById(":ql").value = template.getSubject();
                  try{
                    canvasDoc.getElementById(":qa").contentDocument.getElementById(":qa").innerHTML = "<br>" + template.getHTMLContent();
                  }catch(e) {
                      try {
                        canvasDoc.getElementById(":pp").value = template.getContent();
                      }catch(e) {
                        gmailgenerator.loadingCheck();  
                      }
                  }
                  return;
              }
        }
    }
    gmailgenerator.loadingCheck();
    
};


window.addEventListener("load", function () {gmailgenerator.onFirefoxLoad();}, false);
