function Email(){}

Email.prototype.getId = function() {
    return this.Id;
}

Email.prototype.setId = function(id) {
    this.id = id;
}

Email.prototype.getName = function() {
    return this.name;
}

Email.prototype.setName = function(name) {
    this.name = name;
}

Email.prototype.getTo = function() {
    return this.to;
}

Email.prototype.setTo = function(to) {
    this.to = to;
}

Email.prototype.getCc = function() {
    return this.cc;
}

Email.prototype.setCc = function(cc) {
    this.cc = cc;
}

Email.prototype.getTextContent = function() {
    return this.textContent;
}

Email.prototype.setTextContent = function(textContent) {
    this.textContent = textContent;
}

Email.prototype.getHtmlContent = function() {
    return this.htmlContent;
}

Email.prototype.setHtmlContent = function(htmlContent) {
    this.htmlContent = htmlContent;
}