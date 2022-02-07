import { LightningElement, wire } from 'lwc';
import SPEAKER_NAME_FIELD from '@salesforce/schema/Speaker__c.Name';
import SPEAKER_EMAIL_FIELD from '@salesforce/schema/Speaker__c.Email__c';
import SPEAKER_PHONE_FIELD from '@salesforce/schema/Speaker__c.Phone__c';
import getSpeakers from '@salesforce/apex/SpeakerController.getSpeakers';

export default class SpeakersTile extends LightningElement {

    @wire(getSpeakers, {fields: [SPEAKER_NAME_FIELD], optionalFields: [SPEAKER_PHONE_FIELD, SPEAKER_EMAIL_FIELD] })
    speakers;
}