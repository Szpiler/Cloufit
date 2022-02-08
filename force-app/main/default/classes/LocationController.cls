public with sharing class LocationController {
    @AuraEnabled(cacheable=true)
    public static List<Location__c> getEventLocations(Id eventId) {
        
        List<Event__c> events = [Select Location__c From Event__c Where Location__c = :eventId];
        List<Id> locationIds = new List<Id>();
        for(Event__c e : events){
            locationIds.add(e.Location__c);
        }
        return [
            SELECT Id, Name, Landmark__c
            FROM Location__c
            WHERE Id = : locationIds
            WITH SECURITY_ENFORCED
        ];
    }
}
