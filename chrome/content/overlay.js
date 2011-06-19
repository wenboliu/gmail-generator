var gmailgenerator = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.canvasDoc = null;
    this.toEle = null;
    this.subjectEle = null;
    this.bodyEle = null;
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
  
  getPromptService: function() {
      return Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
	                                 .getService(Components.interfaces.nsIPromptService);
  }
  
};

window.addEventListener("load", function(){gmailgenerator.onLoad();}, true);


