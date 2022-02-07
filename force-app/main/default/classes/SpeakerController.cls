public with sharing class SpeakerController {
    @AuraEnabled(cacheable=true)
    public static List<Speaker__c> getSpeakers() {
        return [
            SELECT Name, Email__c
            FROM Speaker__c
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }
}