function Template(travelType) {
        this.travelType = travelType;
};

Template.prototype.getEmailTo = function() {
        return "yxu@thoughtworks.com";
};

Template.prototype.getEmailCc = function() {
        var emailCC = "<YOUR PM>, china_admin_staff@thoughtworks.com, rmchina@thoughtworks.com, szhang@thoughtworks.com";
        if (this.travelType != "domestic") {
                emailCC = emailCC + ",international_travel_-_china@thoughtworks.com";
        } else {
                emailCC = emailCC + ",bbduan@thoughtworks.com";
        }
        return emailCC;
};

Template.prototype.getSubject = function() {
        var subject = "";
        if (this.travelType != "domestic") {
                subject = subject + "[DOMEST-TRVL]"
        } else {
                subject = subject + "[INTERN-TRVL]"
        }
        subject = subject + ":Travel Request"
        return subject;
};

Template.prototype.getSubject = function() {
        var subject = "";
        if (this.travelType == "domestic") {
                subject = subject + "[DOMEST-TRVL]"
        } else {
                subject = subject + "[INTERN-TRVL]"
        }
        subject = subject + ":Travel Request"
        return subject;
};

Template.prototype.getContent = function() {

        return "Hi, Admin Team\n\r"
                      + "I plan a travel as follows:\n\r"
                                  +	"Employee Name: Mr / Ms <NAME>\n"
                                  + "Project Code: <PROJECT CODE>\n"
                                  + "Date of Arrival: <ARRIVAL DATE>\n"
                                  + "Date of Departure: <DEPARTURE DATE>\n"
                                  + "Destination: <DESTINATION>";
        return subject;
};

Template.prototype.getHTMLContent = function() {
        return "Hi, Admin Team<br><br>"
                      + "I plan a travel as follows:<br><br>"
                      + "Employee Name: Mr / Ms &lt;NAME&gt;<br>"
                                  + "Project Code: &lt;PROJECT CODE&gt;<br>"
                                  + "Date of Arrival: &lt;ARRIVAL DATE&gt;<br>"
                                  + "Date of Departure: &lt;DEPARTURE DATE&gt;<br>"
                                  + "Destination: &lt;DESTINATION&gt;";
        return subject;
};

function EmailTemplate(travelType){
        this.template = new Template(travelType);
}

EmailTemplate.prototype.getTitle = function() {
    return this.template.getSubject();
}

EmailTemplate.prototype.getTo = function() {
    return this.template.getEmailTo();
}

EmailTemplate.prototype.getCc = function() {
    return this.template.getEmailCc();
}

EmailTemplate.prototype.getTextContent = function() {
    return this.template.getContent();
}

EmailTemplate.prototype.getHtmlContent = function() {
    return this.template.getHTMLContent();
}