public with sharing class LocationController {
    @AuraEnabled(cacheable=true)
    public static List<Event__c> getLocations(Id eventId) {
        return [
            SELECT Id, Event__c.Location__r.Landmark__c
            FROM Event__c
            WHERE Id = : eventId
            WITH SECURITY_ENFORCED
        ];
    }
}
