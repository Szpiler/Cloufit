import { LightningElement, wire, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Speaker__c.Name';
import EMAIL_FIELD from '@salesforce/schema/Speaker__c.Email__c';
import LANDMARK from '@salesforce/schema/Event_Attende__c.Event__r.Location__r.Landmark__c';
import LOCATION_NAME from '@salesforce/schema/Event_Attende__c.Event__r.Location__r.Name';
import ATTENDEE_NAME from '@salesforce/schema/Event_Attende__c.Attendee__r.Name';
import ATTENDEE_EMAIL from '@salesforce/schema/Event_Attende__c.Attendee__r.Email__c';
import ATTENDEE_COMPANY_NAME from '@salesforce/schema/Event_Attende__c.Attendee__r.Company_Name__c';
import getSpeakers from '@salesforce/apex/SpeakerController.getSpeakers';
import getEventLocations from '@salesforce/apex/LocationController.getEventLocations';
import getEventAttendees from '@salesforce/apex/AttendeeController.getEventAttendees';
const COLUMNS = [
    {label: 'Name', iconName: 'utility:trending',
    hideLabel: true, fieldName: NAME_FIELD.fieldApiName, type: 'text'}, 
    {label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'text' }
];

const ATTENDEECOLUMNS = [
    {label: 'Name', fieldName: ATTENDEE_NAME.fieldApiName, type: 'text'},
    {label: 'Email', fieldName: ATTENDEE_EMAIL.fieldApiName, type: 'text'},
    {label: 'Company Name', fieldName: ATTENDEE_COMPANY_NAME.fieldApiName, type: 'text'},
    {label: 'Location', fieldName: LOCATION_NAME.fieldApiName, type: 'text'}
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

    attendeeColumns = ATTENDEECOLUMNS;
    @wire(getEventAttendees, { recordId: '$recordId' })
    attendees;

    @wire(getEventLocations, { recordId: '$recordId' })
    locations;
}