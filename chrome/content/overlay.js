var gmailgenerator = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.displayUrl = "www.google.com";
    this.displayMenu = false;
    this.strings = document.getElementById("gmailgenerator-strings");
  },
  onGeneratorContextMenu: function(event) 
  {
       var strDocumentUrl = document.commandDispatcher.focusedWindow.document.URL;
    promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                strDocumentUrl);
    promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                "ddd" + this.displayMenu);
                                
        var strDocumentUrl = document.commandDispatcher.focusedWindow.document.URL;
	
        this.displayMenu = false;
        
        promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                this.displayMenu);
        
        if(event.target.tagName == "TEXTAREA" ||
           event.target.tagName == "textarea" ||
           event.target.tagName == "input")
	{
            if (event.target.name == "to" || 
                event.target.name == "cc" ||
                event.target.name == "body" ||
                event.target.name == "subject")  
            {
                this.displayMenu = strDocumentUrl.indexOf(this.displayUrl) != -1;
            }
		
	}
        document.getElementById("context-gmailgenerator-up").setAttribute("hidden", this.displayMenu);
        document.getElementById("context-gmailgenerator").setAttribute("hidden", this.displayMenu);
         promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                this.displayMenu);
  },

  onMenuItemCommand: function(e) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                  .getService(Components.interfaces.nsIPromptService);
    var strDocumentUrl = document.commandDispatcher.focusedWindow.document.URL;
    promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                strDocumentUrl);
    promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                "ddd" + this.displayMenu);
  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    gmailgenerator.onMenuItemCommand(e);
  }


};

window.addEventListener("load", function(){ gmailgenerator.onLoad(); }, true);


