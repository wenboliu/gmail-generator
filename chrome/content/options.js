var gmailgenerator_Options = new function()
{
    this.load = function()
    {
        
        var pagesList = document.getElementById("gmailgenerator-options-listbox");
        var pageFrame = document.getElementById("gmailgenerator-options-iframe");
        pageFrame.setAttribute("src", pagesList.firstChild.value);
    }
    
    this.templatesAdd = function()
    {
      window.openDialog("chrome://gmailgenerator/content/email.xul", "template", "centerscreen,chrome,modal", this._sandbox);
    }
}