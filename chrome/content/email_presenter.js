var emailPresenter = new function(){
    
    this.load = function() {
        gmailgenerator_Prefs.init();
        emailOperator.init(gmailgenerator_Prefs);
        if(window.arguments[0]){
            this.loadEmail(window.arguments[0]);   
        }
    }
    
    this.save = function() {
        var name = document.getElementById("gmailgenerator-template-name").value;            
        var to = document.getElementById("gmailgenerator-template-to").value;
        var title= document.getElementById("gmailgenerator-template-title").value;
        var cc = document.getElementById("gmailgenerator-template-cc").value;
        var textContent = document.getElementById("gmailgenerator-template-text-content").value;
        var htmlContent = document.getElementById("gmailgenerator-template-html-content").value;
        var id = document.getElementById("gmailgenerator-template-id").value;
        var email = new Email();
        email.setName(name);
        email.setId(id);
        email.setTo(to);
        email.setCc(cc);
        email.setTitle(title);
        email.setTextContent(textContent);
        email.setHtmlContent(htmlContent);
        emailOperator.save(email);
    }
    
    this.loadEmail = function(id) {
        var email = emailOperator.getEmail(id);
        document.getElementById("gmailgenerator-template-name").value = email.getName();            
        document.getElementById("gmailgenerator-template-to").value = email.getTo();
        document.getElementById("gmailgenerator-template-title").value = email.getTitle();
        document.getElementById("gmailgenerator-template-cc").value = email.getCc();
        document.getElementById("gmailgenerator-template-text-content").value = email.getTextContent();
        document.getElementById("gmailgenerator-template-html-content").value = email.getHtmlContent();
        document.getElementById("gmailgenerator-template-id").value = email.getId();    
    }
}