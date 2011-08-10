var gmailgenerator_Options = new function()
{
    this.load = function()
    {
        gmailgenerator_Prefs.init();
        emailOperator.init(gmailgenerator_Prefs);
        var pagesList = document.getElementById("gmailgenerator-options-listbox");
        var pageFrame = document.getElementById("gmailgenerator-options-iframe");
        pageFrame.setAttribute("src", pagesList.firstChild.value);
    }
    
    this.loadEmails = function() {
        var pageDocument = document.getElementById("gmailgenerator-options-iframe").contentDocument;
        var emails = emailOperator.getEmails();
        var emailList = pageDocument.getElementById("gmailgenerator-options-templates-listbox");
        while (emailList.getRowCount() > 0){
          emailList.removeItemAt(0);
        }
        for(var i=0; i<emails.length; i++) {
            if (emails[i].getName() && emails[i].getName() != "") {      
                var emailItem = pageDocument.createElement("listitem");
                emailItem.setAttribute("name", emails[i].getName());
                emailItem.setAttribute("id", emails[i].getId());
                emailList.appendChild(emailItem);
            }
        }
    }
    
    this.templatesAdd = function()
    {
      window.openDialog("chrome://gmailgenerator/content/email.xul", "template", "centerscreen,chrome,modal");
    }
    
    this.templatesModify = function()
    {
      window.openDialog("chrome://gmailgenerator/content/email.xul", "template", "centerscreen,chrome,modal","2011-7-3-7-44-50-521");
    }
}