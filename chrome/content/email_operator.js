var emailOperator = new function() {
    
    this.namesKey = "names";
    this.nameKey = "Name";
    this.toKey = "To";
    this.ccKey = "Cc";
    this.textContentKey = "TextContent";
    this.htmlContentKey = "HtmlContent";
    this.timestamp = "";
    
    this.init = function(gmailgenerator_Prefs) {
        this.prefs =  gmailgenerator_Prefs;
    };
    
    this.getEmails = function() {
        var ids = this.getPref(this.namesKey);
        var idCol = ids.split(";");
        var emails = new Array();
        for(var i = 0; i < idCol.length; i++) {
            var id = idCol[i].replace(this.nameKey + "-", "");
            emails.push(this.getEmail(id));
        }
        return emails;  
    };
    
    this.save = function (email) {
        if (email.getId()) {
            this.timestamp = email.getId();
        } else {
            this.generateTimestamp();
            email.setId(this.timestamp);
        }
        this.saveToNames(email);
        this.saveToName(email.getName());
        this.saveToTo(email.getTo());
        this.saveToCc(email.getCc());
        this.saveToTextContent(email.getTextContent());
        this.saveToHtmlContent(email.getHtmlContent());
    };
    
    this.deleteEmail = function(id) {
       var ids = this.getPref(this.namesKey);
        var idCol = ids.split(";");
        var newIds = new Array();
        for(var i = 0; i < idCol.length; i++) {
            if (idCol[i].indexOf(id) > -1) continue;
            newIds.push(idCol[i]);
        }
        this.savePref(this.namesKey, newIds.join(";"));
    };
    
    this.getEmail =  function(id) {
        this.timestamp = id;
        var email = new Email();
        email.setId(id);
        email.setName(this.getPref(this.getFieldValueWithTimestamp(this.nameKey)));
        email.setTo(this.getPref(this.getFieldValueWithTimestamp(this.toKey)));
        email.setCc(this.getPref(this.getFieldValueWithTimestamp(this.ccKey)));
        email.setTextContent(this.getPref(this.getFieldValueWithTimestamp(this.textContentKey)));
        email.setHtmlContent(this.getPref(this.getFieldValueWithTimestamp(this.htmlContentKey)));
        return email;
    }
    
    this.saveToNames = function(email) {
        var names = this.prefs.getCharPref(this.namesKey);
        var nameWithTimestamp = this.getFieldValueWithTimestamp(this.nameKey);
        if (!names || (typeof(names) == "string" && names.indexOf(nameWithTimestamp) <= -1)) {
            var newNames = names ? names + ";" + nameWithTimestamp : nameWithTimestamp;
            this.savePref(this.namesKey, newNames);
        }
    };
    
    this.saveToName = function(name) {
        this.savePref(this.getFieldValueWithTimestamp(this.nameKey), name);
    };
    
    this.saveToTo = function(to) {
       this.savePref(this.getFieldValueWithTimestamp(this.toKey), to);
    }
    
    this.saveToCc = function(cc) {
       this.savePref(this.getFieldValueWithTimestamp(this.ccKey), cc);
    }
    
    this.saveToTextContent = function(textContent) {
       this.savePref(this.getFieldValueWithTimestamp(this.textContentKey), textContent);
    }
    
    this.saveToHtmlContent = function(htmlContent) {
       this.savePref(this.getFieldValueWithTimestamp(this.htmlContentKey), htmlContent);
    }
    
    this.generateTimestamp = function() {
        var currentTime = new Date();
        var times = [currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDay(), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds()];
        this.timestamp = times.join("-");
    };
    
    this.getFieldValueWithTimestamp = function(field){
        return field + "-" + this.timestamp;
    }
    
    this.savePref = function(aName, aValue) {
        this.prefs.setCharPref(aName, aValue);
    };
    
    this.getPref = function(aName) {
        return this.prefs.getCharPref(aName);
    }

};