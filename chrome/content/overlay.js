var gmailgenerator = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("gmailgenerator-strings");
  },

  onMenuItemCommand: function(e) {
    gmailgenerator.openComposeWindow("domestic");
    
    //this.toEle.value = "ToEmailAddress";
    //this.subjectEle.value = "subject";
    //this.bodyEle.value = "test body content";
  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    gmailgenerator.onMenuItemCommand(e);
  },
  
  openComposeWindow: function(travelType) {
    window.open (gmailgenerator.getCurrentURL().replace(/\?\S*$/, "?view=cm&fs=1&tf=1&source=mailto&travelType="+travelType));
  },
  
  getCurrentURL: function() {
      return document.commandDispatcher.focusedWindow.document.URL;
  },
  
  alertMessage: function(title,content) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                 .getService(Components.interfaces.nsIPromptService);
    promptService.alert(window, title, content);
  },
  
  getCanvasFrame: function() {
      return window.content.document.getElementById("canvas_frame");
  },
  
  getTemplate: function(travelType) {
      return new Template(travelType);
  }
  
};

window.addEventListener("load", function(){gmailgenerator.onLoad();}, true);


