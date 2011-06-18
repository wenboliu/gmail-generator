var gmailgenerator = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.canvasDoc = null;
    this.toEle = null;
    this.subjectEle = null;
    this.bodyEle = null;
    this.currentURL = document.commandDispatcher.focusedWindow.document.URL;
    this.strings = document.getElementById("gmailgenerator-strings");
    if (this.currentURL.indexOf("&travelType=") > -1) {
        fillTemplate(this.currentURL.replace(/^\S*&travelType=/,""));
    }
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
    window.open (this.currentURL.replace(/\?\S*$/, "?view=cm&fs=1&tf=1&source=mailto&travelType="+travelType));
  },
  
  fillTemplate:function(travelType) {
      
  } 

};

window.addEventListener("load", function(){gmailgenerator.onLoad();}, true);


