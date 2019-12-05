/* 
Author: Lauren Riddle
Purpose: to render the new event form when the URL is changed to http://localhost:3000/events/new
*/
import React, { Component } from 'react'
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';
import './Events.css'


class EventForm extends Component {
    state = {
        eventName: "",
        eventDate: "",
        location: "",
        loadingStatus: false,
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }
    constructNewEvent = evt => {
        evt.preventDefault();
        if (this.state.eventName === "" || this.state.eventDate === "" || this.state.location === "") {
            window.alert("Please input an event name, date, and location")
        } else {
            this.setState({ loadingStatus: true });
            const currentUser = JSON.parse(localStorage.getItem("credentials"))

            const event = {
                eventName: this.state.eventName,
                eventDate: this.state.eventDate,
                location: this.state.location,
                userId: currentUser.id
            }
            APIManager.post("events", event)
                .then(() => this.props.history.push("/events"))
        }
    }
    render() {
        return (
            <>
                <div id="newEventForm">
                    <Form>
                        <Form.Group>
                            <Form.Label>Event Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" id="eventName" onChange={this.handleFieldChange} />
                            <Form.Label>Date:</Form.Label>
                            <Form.Control type="date" id="eventDate" onChange={this.handleFieldChange} />
                            <Form.Label>Location:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Location" id="location" onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.constructNewEvent}
                        >Create Event</Button>
                    </Form>
                </div>
            </>
        )
    }
}
export default EventForm