import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import eveMainObject from '@salesforce/schema/Event__c';
import eveName from '@salesforce/schema/Event__c.Name';
import eveOrganizer from '@salesforce/schema/Event__c.Organizer__c';
import eveStartTime from '@salesforce/schema/Event__c.Start_DateTime__c';
import eveEndTime from '@salesforce/schema/Event__c.End_DateTime__c';
import eveMaxAttendees from '@salesforce/schema/Event__c.Max_Seats__c';
import eveLocation from '@salesforce/schema/Event__c.Location__c';
import eveEvType from '@salesforce/schema/Event__c.Event_Type__c';
import eveDetail from '@salesforce/schema/Event__c.Event_Detail__c';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class EventInformationInput extends LightningElement {

    name;
    eventOrganizer;
    startDate;
    endDate;
    maxAttendees;
    eventLocation;
    eventType = 'In-Person';

    richtext = '';

    handleChange(e) {
        this.richtext = e.detail.value;
    }

    onNameChange(event) {
        this.name = event.detail.value;
    }

    onStartDateChange(event) {
        this.startDate = event.detail.value;
    }

    onEndDateChange(event) {
        this.endDate = event.detail.value;
    }

    onMaxAttendeesChange(event) {
        this.maxAttendees = event.detail.value;
    }

    onLocationChange(event) {
        this.eventLocation = event.detail.value;
    }

    onOrganizerChange(event){
        this.eventOrganizer = event.detail.value;
    }

    insertEventAction(){
        const fields = {};
        fields[eveName.fieldApiName] = this.name;
        fields[eveOrganizer.fieldApiName] = this.eventOrganizer[0][0];
        fields[eveStartTime.fieldApiName] = this.startDate;
        fields[eveEndTime.fieldApiName] = this.endDate;
        fields[eveMaxAttendees.fieldApiName] = this.maxAttendees;
        fields[eveLocation.fieldApiName] = this.location[0][0];
        fields[eveEvType.fieldApiName] = this.eventType;
        fields[eveDetail.fieldApiName] = this.richtext;
       
        const recordInput = { apiName: eveMainObject.objectApiName, fields };
        createRecord(recordInput)
            .then(eventobj=> {
                this.eventId = eventobj.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Event record has been created',
                        variant: 'success',
                    }),
                );
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: eventobj.id,
                        objectApiName: 'Event__c',
                        actionName: 'view'
                    },
                });
 
 
 
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }

    handleCancel(event){
        var url = window.location.href; 
        var value = url.substr(0,url.lastIndexOf('/') + 1);
        window.history.back();
        return false;
    }
}