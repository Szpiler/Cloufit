import { LightningElement, wire, api } from 'lwc';
import EVENT_NAME from '@salesforce/schema/Event_Attende__c.Event__r.Name';
import ORGANIZER_NAME from '@salesforce/schema/Event_Attende__c.Event__r.Organizer__r.Name';
import START_DATE from '@salesforce/schema/Event_Attende__c.Event__r.Start_DateTime__c';
import LOCATION_NAME from '@salesforce/schema/Event_Attende__c.Event__r.Location__r.Name';
import getAttendeeUpcomingEvents from '@salesforce/apex/EventController.getAttendeeUpcomingEvents';
import getAttendeePastEvents from '@salesforce/apex/EventController.getAttendeePastEvents';

const UPCOMINGCOLUMNS = [
    {label: 'Event Name', fieldName: EVENT_NAME.fieldApiName, type: 'text'}, 
    {label: 'Name', fieldName: ORGANIZER_NAME.fieldApiName, type: 'text' },
    {label: 'Event Date', fieldName: START_DATE.fieldApiName, type: 'datetime' },
    {label: 'Location', fieldName: LOCATION_NAME.fieldApiName, type: 'text' }
];

const PASTCOLUMNS = [
    {label: 'Event Name', fieldName: EVENT_NAME.fieldApiName, type: 'text'}, 
    {label: 'Name', fieldName: ORGANIZER_NAME.fieldApiName, type: 'text' },
    {label: 'Event Date', fieldName: START_DATE.fieldApiName, type: 'datetime' },
    {label: 'Location', fieldName: LOCATION_NAME.fieldApiName, type: 'text' }
];
export default class AttendeeEventsComponent extends LightningElement {
    // Flexipage provides recordId and objectApiName
    @api recordId;

    activeSections = ['Upcomig Events', 'Past Events'];

    upcomingColumns = UPCOMINGCOLUMNS;
    @wire(getAttendeeUpcomingEvents, {recordId: '$recordId'})
    upcomigEvents;

    pastColumns = PASTCOLUMNS;
    @wire(getAttendeePastEvents, {recordId: '$recordId'})
    pastEvents;
}