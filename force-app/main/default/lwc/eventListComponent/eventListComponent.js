import { LightningElement, wire } from 'lwc';
import eveName from '@salesforce/schema/Event__c.Name';
import eveOrganizer from '@salesforce/schema/Event__c.Organizer__r.Name';
import eveLocation from '@salesforce/schema/Event__c.Location__r.Name';
import eveDetail from '@salesforce/schema/Event__c.Event_Detail__c';
import getEvents from '@salesforce/apex/EventController.getEvents';
const COLUMNS = [
    {label: 'Name', fieldName: eveName.fieldApiName, type: 'text'}, 
    {label: 'Name', fieldName: eveOrganizer.fieldApiName, type: 'text'},
    {label: 'Location', fieldName: eveLocation.fieldApiName, type: 'text'},
    {label: 'Detail', fieldName: eveDetail.fieldApiName, type: 'text'}
];

export default class EventListComponent extends LightningElement {

    columns = COLUMNS;
    @wire(getEvents)
    events;
}