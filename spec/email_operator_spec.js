describe("EmailOperator", function() {
    var email;
    var gmailgenerator_Prefs;

    beforeEach(function() {
        email = new Email();
        email.setName("testName");
        gmailgenerator_Prefs = new function(){
            this.storegy = new Object();
          this.getCharPref = function(aName)
          {
              return this.storegy[aName];
          }
          
          this.setCharPref = function(aName, aValue)
          {
              this.storegy[aName] = aValue; 
          }
        };
        
        emailOperator.init(gmailgenerator_Prefs);
    });
    
    
    describe("should save email ", function(){
        describe("names with the timestamp", function(){
            it("when no email have been saved", function() {
                var key = "";
                var expectedNames = "";
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(undefined);
                spyOn(gmailgenerator_Prefs, "setCharPref").andCallFake(function(aName, aValue){
                   key = aName;
                   expectedNames =  aValue;
                });
                emailOperator.generateTimestamp();
                emailOperator.saveToNames(email);
                expect(gmailgenerator_Prefs.getCharPref).toHaveBeenCalled();
                expect(gmailgenerator_Prefs.setCharPref).toHaveBeenCalled();
                expect(key).toBe("names");
                expect(expectedNames).toContain(email.getName() + "-2011");
                expect(expectedNames).not.toContain(";");
            });
            
            it("when some emails have been saved", function() {
                var initialNames = "test1-2011-01-01-22-22-22";
                var key = "";
                var expectedNames = "";
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(initialNames);
                spyOn(gmailgenerator_Prefs, "setCharPref").andCallFake(function(aName, aValue){
                   key = aName;
                   expectedNames =  aValue;
                });
                emailOperator.generateTimestamp();
                emailOperator.saveToNames(email);
                expect(gmailgenerator_Prefs.getCharPref).toHaveBeenCalled();
                expect(gmailgenerator_Prefs.setCharPref).toHaveBeenCalled();
                expect(key).toBe("names");
                expect(expectedNames).toContain(initialNames + ";" + email.getName() + "-2011");
                expect(expectedNames).toContain(";");
            });
            
        });
        
        describe("name with the timestamp", function(){
            
            it(" which is the same as the value added to names", function(){
                var expectedNames = "";
                var expectedName = "";
                var firstTime = true;
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(undefined);
                spyOn(gmailgenerator_Prefs, "setCharPref").andCallFake(function(aName, aValue){
                    if(firstTime) {
                        expectedNames =  aValue;
                        firstTime = false;
                    } else {
                        expectedName = aName;
                    }
                });
                emailOperator.generateTimestamp();
                emailOperator.saveToNames(email);
                emailOperator.saveToName(email.getName());
                expect(expectedNames).toContain(expectedName.replace("Name-", "")); 
            });
            
            it(" successfully", function() {
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(undefined);
                var expectedValue = "";
                spyOn(gmailgenerator_Prefs, "setCharPref").andCallFake(function(aName, aValue){
                    expectedValue = aValue;
                });
                emailOperator.saveToName(email.getName());
                expect(expectedValue).toBe(email.getName());
            });
            
        });
        
        describe("to with the timestamp", function(){
            
            beforeEach(function(){
                email.setTo("to@to.com");
            });
            
            it(" which has overlap with the value added to names", function(){
                var expectedNames = "";
                var expectedToName = "";
                var firstTime = true;
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(undefined);
                spyOn(gmailgenerator_Prefs, "setCharPref").andCallFake(function(aName, aValue){
                    if(firstTime) {
                        expectedNames =  aValue;
                        firstTime = false;
                    } else {
                        expectedName = aName;
                    }
                });
                emailOperator.generateTimestamp();
                emailOperator.saveToNames(email);
                emailOperator.saveToTo(email.getTo());
                expect(expectedNames).toContain(expectedName.replace("To-", ""));  
            });
            
            it(" successfully", function() {
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(undefined);
                var expectedValue = "";
                spyOn(gmailgenerator_Prefs, "setCharPref").andCallFake(function(aName, aValue){
                    expectedValue = aValue;
                });
                emailOperator.saveToTo(email.getTo());
                expect(expectedValue).toBe(email.getTo());
            });
            
        });
        
        describe("cc with the timestamp", function(){
            
            beforeEach(function(){
                email.setCc("cc@cc.com");
            });
            
            it(" which has overlap with the value added to names", function(){
                var expectedNames = "";
                var expectedToName = "";
                var firstTime = true;
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(undefined);
                spyOn(gmailgenerator_Prefs, "setCharPref").andCallFake(function(aName, aValue){
                    if(firstTime) {
                        expectedNames =  aValue;
                        firstTime = false;
                    } else {
                        expectedName = aName;
                    }
                });
                emailOperator.generateTimestamp();
                emailOperator.saveToNames(email);
                emailOperator.saveToCc(email.getTo());
                expect(expectedNames).toContain(expectedName.replace("Cc-", ""));  
            });
            
            it(" successfully", function() {
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(undefined);
                var expectedValue = "";
                spyOn(gmailgenerator_Prefs, "setCharPref").andCallFake(function(aName, aValue){
                    expectedValue = aValue;
                });
                emailOperator.saveToCc(email.getCc());
                expect(expectedValue).toBe(email.getCc());
            });
            
        });
        
        describe("textContent with the timestamp", function(){
            
            beforeEach(function(){
                email.setTextContent("tx@tx.com");
            });
            
            it(" which has overlap with the value added to names", function(){
                var expectedNames = "";
                var expectedToName = "";
                var firstTime = true;
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(undefined);
                spyOn(gmailgenerator_Prefs, "setCharPref").andCallFake(function(aName, aValue){
                    if(firstTime) {
                        expectedNames =  aValue;
                        firstTime = false;
                    } else {
                        expectedName = aName;
                    }
                });
                emailOperator.generateTimestamp();
                emailOperator.saveToNames(email);
                emailOperator.saveToTextContent(email.getTextContent());
                expect(expectedNames).toContain(expectedName.replace("TextContent-", ""));  
            });
            
            it(" successfully", function() {
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(undefined);
                var expectedValue = "";
                spyOn(gmailgenerator_Prefs, "setCharPref").andCallFake(function(aName, aValue){
                    expectedValue = aValue;
                });
                emailOperator.saveToTextContent(email.getTextContent());
                expect(expectedValue).toBe(email.getTextContent());
            });
            
        });
        
        describe("htmlContent with the timestamp", function(){
            
            beforeEach(function(){
                email.setHtmlContent("ht@ht.com");
            });
            
            it(" which has overlap with the value added to names", function(){
                var expectedNames = "";
                var expectedToName = "";
                var firstTime = true;
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(undefined);
                spyOn(gmailgenerator_Prefs, "setCharPref").andCallFake(function(aName, aValue){
                    if(firstTime) {
                        expectedNames =  aValue;
                        firstTime = false;
                    } else {
                        expectedName = aName;
                    }
                });
                emailOperator.generateTimestamp();
                emailOperator.saveToNames(email);
                emailOperator.saveToHtmlContent(email.getHtmlContent());
                expect(expectedNames).toContain(expectedName.replace("HtmlContent-", ""));  
            });
            
            it(" successfully", function() {
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(undefined);
                var expectedValue = "";
                spyOn(gmailgenerator_Prefs, "setCharPref").andCallFake(function(aName, aValue){
                    expectedValue = aValue;
                });
                emailOperator.saveToHtmlContent(email.getHtmlContent());
                expect(expectedValue).toBe(email.getHtmlContent());
            });
            
        });
        
    });
    
    describe("should get email", function(){
        it(" successfully", function(){
            email.setName("name1")
            email.setTo("to");
            email.setCc("cc");
            email.setTextContent("textContent");
            email.setHtmlContent("htmlContent");
            emailOperator.save(email);
            alert(email.getId());
            var gotEmail = emailOperator.getEmail(email.getId());   
            expect(gotEmail.getName()).toBe(email.getName());
        });
    });

    
});