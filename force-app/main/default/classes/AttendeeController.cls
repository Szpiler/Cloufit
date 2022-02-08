public with sharing class AttendeeController {
    @AuraEnabled(cacheable=true)
    public static List<Event_Attende__c> getEventAttendees(Id recordId) {
        
        return [Select Event__c, Attendee__r.Name, Attendee__r.Email__c, Attendee__r.Company_Name__c, Event__r.Location__r.Name
        From Event_Attende__c
        Where Event__c = :recordId];
    }
}
