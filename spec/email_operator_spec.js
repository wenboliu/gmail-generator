describe("EmailOperator", function() {
    var email;
    var gmailgenerator_Prefs;

    beforeEach(function() {
        email = new Email();
        email.setName("testName");
        storegy = {};
        gmailgenerator_Prefs = new function(){
          this.getCharPref = function(aName)
          {
          };
          
          this.setCharPref = function(aName, aValue)
          {
          };
        };
        
        emailOperator.init(gmailgenerator_Prefs);
    });
    
    
    describe("should save email ", function(){
        
        describe(" id", function(){
            it(" with new generated value when first saving email", function() {
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(undefined);
                emailOperator.save(email);
                expect(gmailgenerator_Prefs.getCharPref).toHaveBeenCalled();
                expect(emailOperator.timestamp).toBe(email.getId());
            });
            
            it(" with new generated value when not first saving email", function() {
                email.setId("test_id");
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(email);
                emailOperator.save(email);
                expect(gmailgenerator_Prefs.getCharPref).toHaveBeenCalled();
                expect(emailOperator.timestamp).toContain("test_id");
                expect(email.getId()).toContain("test_id");
            });
        });
        
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
                expect(expectedNames).toContain("Name-2011");
                expect(expectedNames).not.toContain(";");
            });
            
            it("when some emails have been saved", function() {
                var initialNames = "Name-2011-01-01-22-22-22";
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
                expect(expectedNames).toContain(initialNames + ";Name-2011");
                expect(expectedNames).toContain(";");
            });
            
            it("when some emails have been saved and contains current email", function() {
                var initialNames = "Name-2011-01-01-22-22-22";
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(initialNames);
                spyOn(gmailgenerator_Prefs, "setCharPref")
                emailOperator.timestamp = "2011-01-01-22-22-22";
                emailOperator.saveToNames(email);
                expect(gmailgenerator_Prefs.getCharPref).toHaveBeenCalled();
                expect(gmailgenerator_Prefs.setCharPref).not.toHaveBeenCalled();
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
        
        describe("title with the timestamp", function(){
            
            beforeEach(function(){
                email.setTitle("to@to.com");
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
                emailOperator.saveToTitle(email.getTitle());
                expect(expectedNames).toContain(expectedName.replace("Title-", ""));  
            });
            
            /*it(" successfully", function() {
                spyOn(gmailgenerator_Prefs, "getCharPref").andReturn(undefined);
                var expectedValue = "";
                spyOn(gmailgenerator_Prefs, "setCharPref").andCallFake(function(aName, aValue){
                    expectedValue = aValue;
                });
                emailOperator.saveToTo(email.getTo());
                expect(expectedValue).toBe(email.getTo());
            });*/
            
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
        
        beforeEach(function(){
            var id = "2011-12-12-12-12-12123";
            email.setId(id);
            email.setName("name1");
            email.setTo("to");
            email.setCc("cc");
            email.setTextContent("textContent");
            email.setHtmlContent("htmlContent");
        });
        
        it(" successfully", function(){
            spyOn(gmailgenerator_Prefs, "getCharPref").andCallFake(function(aName){
                if ("Name-" + email.getId() == aName) {
                    return email.getName();
                }
                if ("To-" + email.getId() == aName) {
                    return email.getTo();
                }
                if ("Title-" + email.getId() == aName) {
                    return email.getTitle();
                }
                if ("Cc-" + email.getId() == aName) {
                    return email.getCc();
                }
                if ("TextContent-" + email.getId() == aName) {
                    return email.getTextContent();
                }
                if ("HtmlContent-" + email.getId() == aName) {
                    return email.getHtmlContent();
                }
                return "undefined";
            });
            
            var gotEmail = emailOperator.getEmail(email.getId());
            expect(gotEmail.getName()).toBe(email.getName());
            expect(gotEmail.getTo()).toBe(email.getTo());
            expect(gotEmail.getTitle()).toBe(email.getTitle());
            expect(gotEmail.getCc()).toBe(email.getCc());
            expect(gotEmail.getTextContent()).toBe(email.getTextContent());
            expect(gotEmail.getHtmlContent()).toBe(email.getHtmlContent());
        });
    });
    
    describe("should get emails", function() {
        it(" successfully", function(){
            spyOn(gmailgenerator_Prefs, "getCharPref").andReturn("Name-2011-12-12-12-12-12-1212;Name-2011-12-12-12-12-12-1213");
            spyOn(emailOperator, "getEmail").andCallFake(function(id){
                if (id == "2011-12-12-12-12-12-1212") {
                    return email;
                }
                return "undefined";
            });
            var emails = emailOperator.getEmails();
            expect(emails.length).toBe(2);
            expect(emails[0]).toBe(email);
            expect(emails[1]).toBe("undefined");
        });
    });
    
    describe("should delete emails", function() {
        it(" successfully", function(){
            spyOn(gmailgenerator_Prefs, "getCharPref").andReturn("Name-2011-12-12-12-12-12-1212;Name-2011-12-12-12-12-12-1213");
            var name = "";
            var expectedValue = ""
            spyOn(gmailgenerator_Prefs, "setCharPref").andCallFake(function(aName, aValue){
                name = aName;
                expectedValue = aValue;
            });
            var emails = emailOperator.deleteEmail("2011-12-12-12-12-12-1212");
            expect(name).toBe("names");
            expect(expectedValue).toBe("Name-2011-12-12-12-12-12-1213");
        });
    });

    
});