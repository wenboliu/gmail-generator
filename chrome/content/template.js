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
};

Template.prototype.getHTMLContent = function() {
        return "Hi, Admin Team<br><br>"
                      + "I plan a travel as follows:<br><br>"
                      + "Employee Name: Mr / Ms &lt;NAME&gt;<br>"
                                  + "Project Code: &lt;PROJECT CODE&gt;<br>"
                                  + "Date of Arrival: &lt;ARRIVAL DATE&gt;<br>"
                                  + "Date of Departure: &lt;DEPARTURE DATE&gt;<br>"
                                  + "Destination: &lt;DESTINATION&gt;";
};

//=========================================================================

function Leave(leaveType) {
        this.leaveType = leaveType;
};

Leave.prototype.getEmailTo = function() {
        return "china_time_off@thoughtworks.com";
};

Leave.prototype.getEmailCc = function() {
        return "<YOUR PM>";
};

Leave.prototype.getSubject = function() {
        var subject = "[LEAVE-REQUEST]:";
        if (this.leaveType == "leave1") {
                subject = subject + "<Name> will take <Leave Type:annual,sick,marriage,bereavement,maternity,paternity> leave on <leave date>."
        } else {
                subject = subject + "<Name> will take <Leave Type:annual,sick,marriage,bereavement,maternity,paternity> leave from <leave start date> to  <leave end date>."
        }
        return subject;
};

Leave.prototype.getContent = function() {
        var content = "Hi, Admin Team\n\r"
                      + "I will take <Leave Type:annual,sick,marriage,bereavement,maternity,paternity> leave ";
        if (this.leaveType == "leave1") {
                content = content + "on <leave date>."
        } else {
                content = content + "from <leave start date> to  <leave end date>."
        }
        return content;
};

Leave.prototype.getHTMLContent = function() {
        var content = "Hi, Admin Team<br><br>"
                      + "I will take <Leave Type:annual,sick,marriage,bereavement,maternity,paternity> leave ";
        if (this.leaveType == "leave1") {
                content = content + "on &lt;leave date&gt;.<br><br>"
        } else {
                content = content + "from &lt;leave start date&gt; to  &lt;leave end date&gt;.<br><br>"
        }
        return content;
};


//=========================================================================

function EmailTemplate(travelType){
        if (travelType == "international" || travelType == "domestic") { 
                this.template = new Template(travelType);
        } else if (travelType == "leave1" || travelType == "leave2") {
                this.template = new Leave(travelType);  
        }
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