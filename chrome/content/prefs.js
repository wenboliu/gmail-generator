var gmailgenerator_Prefs = new function()
{
  
  this.NOTIFY_CHANGED = "gmailgenerator-prefs-notify-changed";
  this.ELEMENT_PREFIX = "gm-prefs-";
  this.BRANCH = "longfocus.gmailgenerator.";
  
  this.init = function()
  {
    var prefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
    this._prefBranch = prefService.getBranch(this.BRANCH);
  }
  
  this.hasPref = function(aName)
  {
    return this._prefBranch.prefHasUserValue(aName);
  }
  
  this.getBoolPref = function(aName)
  {
    return this._prefBranch.getBoolPref(aName);
  }
  
  this.setBoolPref = function(aName, aValue)
  {
    this._prefBranch.setBoolPref(aName, aValue);
  }
  
  this.getCharPref = function(aName)
  {
    return this._prefBranch.getCharPref(aName);
  }
  
  this.setCharPref = function(aName, aValue)
  {
    this._prefBranch.setCharPref(aName, aValue);
  }
  
  this.getIntPref = function(aName)
  {
    return this._prefBranch.getIntPref(aName);
  }
  
  this.setIntPref = function(aName, aValue)
  {
    this._prefBranch.setIntPref(aName, aValue);
  }
  
  this.alert = function() {
    var aValue = this.getCharPref("hello");
    if (aValue)
        alert(aValue);
    else
        alert("test");
  }
  
  this.save = function() {
    alert("save");
    this.setCharPref("hello", "test1");
  }
  
  this.init();
}