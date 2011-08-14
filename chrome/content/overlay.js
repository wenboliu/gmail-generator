var gmailgenerator = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("gmailgenerator-strings");
  },

  onDomesticCommand: function(e) {
    gmailgenerator.openComposeWindow("domestic");
  },
  
  onInternationalCommand: function(e) {
    gmailgenerator.openComposeWindow("international");
  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    gmailgenerator.onDomesticCommand(e);
  },
  
  openComposeWindow: function(travelType) {
    var url = gmailgenerator.getCurrentURL().replace(/\?\S*$/, "?view=cm&fs=1&tf=1&source=mailto&travelType="+travelType);
    window.open(url);
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


