var gmailgenerator_Options = new function()
{
    this.load = function()
    {
        gmailgenerator_Prefs.init();
        emailOperator.init(gmailgenerator_Prefs);
        //var pagesList = document.getElementById("gmailgenerator-options-listbox");
        var pageFrame = document.getElementById("gmailgenerator-options-iframe");
        //pageFrame.setAttribute("src", pagesList.firstChild.value);
        pageFrame.setAttribute("src", "chrome://gmailgenerator/content/emails.xul");
    }
    
    this.loadEmailOnPageLoad = function() {
        window.setTimeout(this.loadEmails, 1000);
    }
    
    this.loadEmails = function() {
        var pageDocument = this.getContentDocument();
        if (this.loadEmailListBox(pageDocument, emailOperator.getEmails()) == 0) {
            this.loadDefaultTemplate();
            this.loadEmailListBox(pageDocument, emailOperator.getEmails());
        }
    }
    
    this.loadEmailListBox = function(pageDocument, emails) {
        var emailList = this.getListBox(pageDocument);
        while (emailList.getRowCount() > 0){
          emailList.removeItemAt(0);
        }
        var count = 0;
        for(var i=0; i<emails.length; i++) {
            if (emails[i].getName() && emails[i].getName() != "") {      
                var emailItem = pageDocument.createElement("listitem");
                emailItem.setAttribute("name", emails[i].getName());
                emailItem.setAttribute("id", emails[i].getId());
                emailList.appendChild(emailItem);
                count ++;
            }
        }
        return count;
    }
    
    this.loadDefaultTemplate = function() {
        if(confirm("Are you want to load Domestic Email Template?")) {
            emailOperator.save(this.createTravelEmail("domestic"));
        }
        if(confirm("Are you want to load Domestic Email Template?")) {
            emailOperator.save(this.createTravelEmail("international"));
        }
    }
    
    this.createTravelEmail = function(travelType) {
        var template = new Template(travelType);
        var email = new Email();
        email.setName(travelType + " travel");
        email.setTo(template.getEmailTo());
        email.setCc(template.getEmailCc());
        email.setTitle(template.getSubject());
        email.setTextContent(template.getContent());
        email.setHtmlContent(template.getHTMLContent());
        return email;
    }
    
    this.selectEmail = function() {
        var pageDocument = this.getContentDocument();
        var emailsList = this.getListBox(pageDocument);
    
        pageDocument.getElementById("gmailgenerator-options-templates-move-up-button").disabled = (emailsList.selectedIndex == 0)
        pageDocument.getElementById("gmailgenerator-options-templates-move-down-button").disabled = (emailsList.selectedIndex == (emailsList.getRowCount() - 1));
        pageDocument.getElementById("gmailgenerator-options-templates-modify-button").disabled = (emailsList.selectedCount == 0);
        pageDocument.getElementById("gmailgenerator-options-templates-remove-button").disabled = (emailsList.selectedCount == 0);    
    }
    
    this.getContentDocument = function() {
        return document.getElementById("gmailgenerator-options-iframe").contentDocument;
    }
    
    this.getListBox = function(contentDocument) {
        return contentDocument.getElementById("gmailgenerator-options-templates-listbox");
    }
    
    this.templatesAdd = function()
    {
        window.openDialog("chrome://gmailgenerator/content/email.xul", "template", "centerscreen,chrome,modal");
        this.loadEmails();
    }
    
    this.templatesModify = function()
    {
        var pageDocument = this.getContentDocument();
        var emailsList = this.getListBox(pageDocument);
        var email = emailsList.selectedItem;
        if (email) {
            window.openDialog("chrome://gmailgenerator/content/email.xul", "template", "centerscreen,chrome,modal", email.id);
            this.loadEmails();
        }
    }
    
    this.templatesDelete = function()
    {
        var pageDocument = this.getContentDocument();
        var emailsList = this.getListBox(pageDocument);
        var email = emailsList.selectedItem;
        if (email && confirm("Are you sure to delete " + email.name)) {
            emailOperator.deleteEmail(email.id);
            this.loadEmails();
        }
    }
}