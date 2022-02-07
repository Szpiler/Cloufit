trigger EventSpeakerDuplicate on Event_Speaker__c (before insert, before update) {
    
    Set<ID> speakers = new Set<ID>();
   // Set<ID> events = new Set<ID>();
    Set<ID> speakersD = new Set<ID>();
   // Set<ID> eventsD = new Set<ID>();
    
    //Adding Speakers Ids to Sets
    for (Event_Speaker__c es : trigger.NEW){
                            speakers.add(es.Speaker__r.id); 
        					//events.add(es.Event__r.id);
                               }
    
    //Adding duplicated Speakers and Events Ids to Sets
    for (Event_Speaker__c es : [SELECT id FROM Event_speaker__c
                                WHERE Speaker__r.id IN : speakers]){
                                    speakersD.add(es.Speaker__r.id);
                                   	//eventsD.add(es.Event__r.id);
                                }
    
    //Sending Error masage for every duplicated Event-Speaker
    for (Event_Speaker__c es : trigger.NEW){
        if(speakersD.contains(es.Speaker__r.id)){
            es.addError('This Speaker is already assigned to an event. Message from trigger');
        }
    }
}