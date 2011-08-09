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
      window.openDialog("chrome://gmailgenerator/content/email.xul", "template", "centerscreen,chrome,modal");
    }
    
    this.templatesModify = function()
    {
      window.openDialog("chrome://gmailgenerator/content/email.xul", "template", "centerscreen,chrome,modal","2011-7-3-7-44-50-521");
    }
}