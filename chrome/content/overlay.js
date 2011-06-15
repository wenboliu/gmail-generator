var gmailgenerator = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.toEle = null;
    this.subjectEle = null;
    this.bodyEle = null;
    this.strings = document.getElementById("gmailgenerator-strings");
  },

  onMenuItemCommand: function(e) {
    this.toEle.value = "ToEmailAddress";
    this.subjectEle.value = "subject";
    this.bodyEle.value = "test body content";
  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    gmailgenerator.onMenuItemCommand(e);
  }


};

window.addEventListener("load", function(){ gmailgenerator.onLoad(); }, true);


