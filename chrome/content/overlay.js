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
    openComposeWindow("domestic");
    
    //this.toEle.value = "ToEmailAddress";
    //this.subjectEle.value = "subject";
    //this.bodyEle.value = "test body content";
  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    gmailgenerator.onMenuItemCommand(e);
  },
  
  openComposeWindow: function(travelType) {
    var currentURL = document.commandDispatcher.focusedWindow.document.URL;
    window.open (currentURL.replace(/\?\S*$/, "?view=cm&fs=1&tf=1&source=mailto&travelType="+travelType));
  }

};

window.addEventListener("load", function(){gmailgenerator.onLoad();}, true);


