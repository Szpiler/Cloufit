public with sharing class EventInformationInputController {
    public EventInformationInputController() {

    }

    @AuraEnabled(cacheable=true)
    public static void insertEvent(String name, String eventOrganizerName, Datetime sDate, Datetime eDate,
     Integer maxAttendees, String locationName){

        Location__c loc = [Select Id From Location__c Where Name=:locationName Limit 1];
        Event_Organizer__c eO = [Select Id From Event_Organizer__c Where Name=:eventOrganizerName Limit 1];
        Event__c event = new Event__c(Name=name, Organizer__c=eO.id, Start_DateTime__c=sDate, End_DateTime__c=eDate,
        Max_Seats__c=maxAttendees, Location__c=loc.id);
        insert event;
    }
}
