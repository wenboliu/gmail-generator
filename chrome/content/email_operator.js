var emailOperator = new function() {
    
    this.namesKey = "names";
    this.timestamp = "";
    
    this.init = function(gmailgenerator_Prefs) {
        this.prefs =  gmailgenerator_Prefs;
    };
    
    this.save = function (email) {
        this.generateTimestamp();
        email.setId(this.timestamp);
        this.saveToNames(email);
        this.saveToName(email.getName());
        this.saveToTo(email.getTo());
        this.saveToCc(email.getCc());
        this.saveToTextContent(email.getTextContent());
        this.saveToHtmlContent(email.getHtmlContent());
    };
    
    this.getEmail =  function(id) {
        this.timestamp = id;
        var email = new Email();
        email.setId(id);
        email.setName(this.getPref(this.getFieldValueWithTimestamp("Name")));
        return email;
    }
    
    this.saveToNames = function(email) {
        var names = this.prefs.getCharPref(this.namesKey);
        var nameWithTimestamp = this.getFieldValueWithTimestamp(email.getName());
        var newNames = names ? names + ";" + nameWithTimestamp : nameWithTimestamp;
        this.savePref(this.namesKey, newNames);
    };
    
    this.saveToName = function(name) {
        this.savePref(this.getFieldValueWithTimestamp("Name"), name);
    };
    
    this.saveToTo = function(to) {
       this.savePref(this.getFieldValueWithTimestamp("To"), to);
    }
    
    this.saveToCc = function(cc) {
       this.savePref(this.getFieldValueWithTimestamp("Cc"), cc);
    }
    
    this.saveToTextContent = function(textContent) {
       this.savePref(this.getFieldValueWithTimestamp("TextContent"), textContent);
    }
    
    this.saveToHtmlContent = function(htmlContent) {
       this.savePref(this.getFieldValueWithTimestamp("HtmlContent"), htmlContent);
    }
    
    this.generateTimestamp = function() {
        var currentTime = new Date();
        var times = [currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDay(), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()];
        this.timestamp = times.join("-");
    };
    
    this.getFieldValueWithTimestamp = function(field){
        return field + "-" + this.timestamp;
    }
    
    this.savePref = function(aName, aValue) {
        this.prefs.setCharPref(aName, aValue);
    };
    
    this.getPref = function(aName) {
        this.prefs.getCharPref(aName);
    }

};