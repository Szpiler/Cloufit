public with sharing class EventController {

    @AuraEnabled(cacheable=true)
    public static List<Event__c> getEvents() {
        return [
            SELECT Name, Event_Detail__c, Live__c, Location__r.Name, Organizer__r.Name
            FROM Event__c
            WHERE Live__c = true
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Event_Attende__c> getAttendeeUpcomingEvents(Id eventAttendeeId) {
        return [
            SELECT id, Event__r.Name, Event__r.Start_DateTime__c, Event__r.Location__r.Name, Event__r.Organizer__r.Name
            FROM Event_Attende__c
            WHERE Attendee__c = :eventAttendeeId
            AND Event__r.Start_DateTime__c >= :Datetime.now()
            WITH SECURITY_ENFORCED
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Event_Attende__c> getAttendeePastEvents(Id eventAttendeeId) {
        return [
            SELECT id, Event__r.Name, Event__r.Start_DateTime__c, Event__r.Location__r.Name, Event__r.Organizer__r.Name
            FROM Event_Attende__c
            WHERE Attendee__c = :eventAttendeeId
            AND Event__r.Start_DateTime__c < :Datetime.now()
            WITH SECURITY_ENFORCED
        ];
    }
}
