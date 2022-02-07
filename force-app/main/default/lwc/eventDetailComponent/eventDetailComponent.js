import { LightningElement, wire, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Speaker__c.Name';
import EMAIL_FIELD from '@salesforce/schema/Speaker__c.Email__c';
import LANDMARK from '@salesforce/schema/Event__c.Location__r.Landmark__c';
import getSpeakers from '@salesforce/apex/SpeakerController.getSpeakers';
import getLocations from '@salesforce/apex/LocationController.getLocations';
const COLUMNS = [
    {label: 'Name', iconName: 'utility:trending',
    hideLabel: true, fieldName: NAME_FIELD.fieldApiName, type: 'text'}, 
    {label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'text' }
];
export default class EventDetailComponent extends LightningElement {
    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;
    
    landmark = LANDMARK;
    modeName = 'readonly'; 
    columns = COLUMNS;
    @wire(getSpeakers)
    speakers;  

    @wire(getLocations, { recordId: '$recordId', fields: [LANDMARK] })
    locations;
}