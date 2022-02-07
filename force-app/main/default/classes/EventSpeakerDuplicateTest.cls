@isTest
private class EventSpeakerDuplicateTest {
	
    @testSetup
    private static void createSetup(){
        
        List<Speaker__c> testSpeakers = new List<Speaker__c>();
        List<Event__c> testEvents = new List<Event__c>();
        List<Event_Speaker__c> testES = new List<Event_Speaker__c>();
        
        for(Integer i=0; i<10; i++){
            testSpeakers.add(new Speaker__c(Name='TestSpeaker '+i));
            testEvents.add(new Event__c(Name='TestEvent '+i, Event_Type__c='Virtual', Live__c=true));
            //eS.add(new Event_Speaker__c(Name='TestEventSPeaker '+i, Event__c=events[i].id, Speaker__c=speakers[i].id));
        }
        insert testSpeakers;
        insert testEvents;
        for(Integer i=0; i<10; i++){
            testES.add(new Event_Speaker__c(Name='TestEventSPeaker '+i, Event__c=testEvents[i].id, Speaker__c=testSpeakers[i].id));
        }
        insert testES;
    }
    
    @isTest
    private static void duplicateTest(){
        
        //Creating duplicated records
        List<Speaker__c> speakers = [SELECT Id FROM Speaker__c WHERE Name LIKE 'TestSpeaker%'];
        List<Event__c> events = [SELECT Id FROM Event__c WHERE Name LIKE 'TestEvent%'];
      	List<Event_Speaker__c> eSduplicated = new List<Event_Speaker__c>();
        
        for(Integer i=0; i<speakers.size(); i++){
            if(i!=speakers.size()-1){
                eSDuplicated.add(new Event_Speaker__c(Name='Duplicate '+i, Speaker__c=speakers[i+1].Id, Event__c=events[i].Id));
            }
            else{
                eSDuplicated.add(new Event_Speaker__c(Name='Duplicate '+i, Speaker__c=speakers[0].Id, Event__c=events[i].Id));
            }
        }      
        
        //Inserting duplicates
        Test.startTest();        
            insert eSDuplicated;       
       	Test.stopTest(); 
       
        //checking if duplicates were inserted
        Integer numberOfDuplicates = 0;
        for (Event_Speaker__c es : [SELECT id FROM Event_speaker__c
                                WHERE Speaker__r.id IN : speakers]){
                                    numberOfDuplicates++;
                                }
        System.assertEquals(10, numberOfDuplicates, 'Number Of dupicates '+numberOfDuplicates);
    }
}