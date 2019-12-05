/* 
Author: Lauren Riddle
Purpose: to render the edit event form when the URL is changed to http://localhost:3000/events/id/edit and to perform the PUT when the edited object is saved
*/
import React, { Component } from "react"
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';


class EventEditForm extends Component {
    //set the initial state
    state = {
        eventName: "",
        eventDate: "",
        location: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingEvent = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedEvent = {
            eventName: this.state.eventName,
            eventDate: this.state.eventDate,
            location: this.state.location,
            userId: this.state.userId,
            id: this.props.match.params.eventId
        }

        APIManager.update("events", editedEvent)
            .then(() => this.props.history.push("/events"))
    }

    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        APIManager.get(`events/${this.props.match.params.eventId}`)
            .then(event => {
                if (Object.keys(event).length === 0) {
                    this.props.history.push("/events")
                    window.alert('The event you were trying to access does not exists.')
                } else {
                    this.setState({
                        eventName: event.eventName,
                        eventDate: event.eventDate,
                        location: event.location,
                        loadingStatus: false,
                        userId: currentUser.id,
                    });
                }
            });
    }

    render() {
        return (
            <>
                <div id="newEventForm">
                    <Form>
                        <Form.Group>
                            <Form.Label>Event Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" id="eventName" value={this.state.eventName} onChange={this.handleFieldChange} />
                            <Form.Label>Date:</Form.Label>
                            <Form.Control type="date" id="eventDate" value={this.state.eventDate} onChange={this.handleFieldChange} />
                            <Form.Label>Location:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Location" id="location" value={this.state.location} onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.updateExistingEvent}
                        >Save</Button>
                    </Form>
                </div>
            </>
        );
    }
}

export default EventEditForm