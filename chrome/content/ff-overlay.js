gmailgenerator.onFirefoxLoad = function(event) {
    document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){gmailgenerator.showFirefoxContextMenu(e);}, false);
    gBrowser.addEventListener('DOMContentLoaded', function (e) {
        gmailgenerator.composeTravelMail(e);
    }, false);
    gmailgenerator_Prefs.init();
    emailOperator.init(gmailgenerator_Prefs);
};

gmailgenerator.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-gmailgenerator-domestic").hidden = true;
  document.getElementById("context-gmailgenerator-international").hidden = true;
  document.getElementById("context-gmailgenerator").hidden = gmailgenerator.isHiddenContextMenu(event);
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
    window.setTimeout(function(){   gmailgenerator.populateMailContent(); }, 3500);
};



gmailgenerator.populateMailContent = function() {
    //var template = gmailgenerator.getTemplate(gmailgenerator.travelType);
    var template;
    if (gmailgenerator.travelType == "international" || gmailgenerator.travelType == "domestic") {
       template = gmailgenerator.getTemplate(gmailgenerator.travelType);  
    }else {
       template = emailOperator.getEmail(gmailgenerator.travelType); 
    }
    var canvasFrame = gmailgenerator.getCanvasFrame();
    if (canvasFrame) {
        var canvasDoc = canvasFrame.contentDocument;
        if (canvasDoc) {
              var toElem = canvasDoc.getElementsByName("to");
              if (toElem.length > 0) {
                  canvasDoc.getElementById(":rf").childNodes[1].style.display = "";
    //              canvasDoc.getElementById(":re").style.display = "none";
                  toElem[0].value = template.getTo();
                  var ccElem = canvasDoc.getElementsByName("cc");
                  ccElem[0].value = template.getCc();
                  var subjectElem = canvasDoc.getElementsByName("subject");
                  subjectElem[0].value = template.getTitle();
                  try{
                    var iframes = canvasDoc.getElementsByTagName("iframe");
                    var find = false;
                    
                    if (iframes.length > 0) {
                        for(var i=0; i < iframes.length; i++){
                            if(iframes[i].className.indexOf("editable") > -1) {
                                var bodyElem = iframes[i].contentDocument.getElementsByTagName("body");
				bodyElem[0].innerHTML = "<br>" + template.getHtmlContent();
                                find = true;
                            }
                        }   
                    }
                    if (!find) {
                       try {
                        var bodyElem = canvasDoc.getElementsByName("body");
                        bodyElem[0].value = template.getTextContent();
                      }catch(e) {
                        gmailgenerator.loadingCheck();  
                      } 
                    }
                    //contentDocument.getElementById(":qa").innerHTML = "<br>" + template.getHtmlContent();
                  }catch(e) {
                      try {
                        var bodyElem = canvasDoc.getElementsByName("body");
                        bodyElem[0].value = template.getTextContent();
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

gmailgenerator.buildMenu = function(aPopup){
    gmailgenerator.clearKids(aPopup);
    var travelTypes = ["International Travel", "Domestic Travel"];
    var emailIds = ["international", "domestic"];
    for(var i=0; i< travelTypes.length; i++) {
        var menuitem = gmailgenerator.createMenuItem(travelTypes[i], "gmailgenerator.openComposeWindow('" + emailIds[i] + "')");
        aPopup.appendChild(menuitem);
    }
    var emails = emailOperator.getEmails();
    for(var i=0; i<emails.length; i++) {
        var email = emails[i];
        if (email.getName() && email.getName() != "") {
            var menuitem = gmailgenerator.createMenuItem(email.getName(), "gmailgenerator.openComposeWindow('" + email.getId() + "')");
            aPopup.appendChild(menuitem);
        }
    }
    aPopup.appendChild(document.createElement("menuseparator"));
    var menuitem = gmailgenerator.createMenuItem("templates", "window.openDialog('chrome://gmailgenerator/content/options.xul', 'options', 'centerscreen,chrome,modal,resizable');")
    aPopup.appendChild(menuitem);
    return true;
};

gmailgenerator.createMenuItem = function(label, command) {
    var menuitem = document.createElement("menuitem");
    menuitem.setAttribute("label", label);
    menuitem.setAttribute("oncommand", command);
    return menuitem;  
};

gmailgenerator.clearKids = function(aNode)
{
  if (aNode && aNode instanceof Node)
  {
    while (aNode.hasChildNodes())
      aNode.removeChild(aNode.lastChild);
  }
}


window.addEventListener("load", function () {gmailgenerator.onFirefoxLoad();}, false);
