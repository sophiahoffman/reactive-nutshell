/* 
Author: Lauren Riddle
Purpose: to create the card for a single event 
*/

import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

export class NextEventCard extends Component {

    render() {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        // if the event is not the current user's, disable their ability to delete their friend's event
        if (Number(currentUser.id) === this.props.event.userId) {
            return (
                <div className="eventCard card nextEvent">
                    <Card>
                        <div className="card-contentnext nextEvent">
                            <Card.Body>
                                <h2><span className="card-eventname">{this.props.event.eventName}</span></h2>
                                <p>Date: {this.props.event.eventDate}</p>
                                <p>Location: {this.props.event.location}</p>
                                <Button variant="primary" type="button" className="events-button" onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</Button>
                                <Button variant="primary" type="button" className="events-button"
                                    onClick={() => { this.props.history.push(`/events/${this.props.event.id}/edit`) }}>Edit</Button>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
            );
        } else {
            return (
                <div className="eventCard card nextEvent">
                    <Card>
                        <div className="card-contentnext nextEvent">
                            <Card.Body>
                                <h2><span className="card-eventname">{this.props.event.eventName}</span></h2>
                                <p>Date: {this.props.event.eventDate}</p>
                                <p>Location: {this.props.event.location}</p>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
            );
        }
    }
}
export class RegularEventCard extends Component {

    render() {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        // if the event is not the current user's, disable their ability to delete their friend's event
        if (Number(currentUser.id) === this.props.event.userId) {
            return (
                <div className="eventCard card">
                    <Card>
                        <div className="card-content">
                            <Card.Body>
                                <h2><span className="card-eventname">{this.props.event.eventName}</span></h2>
                                <p>Date: {this.props.event.eventDate}</p>
                                <p>Location: {this.props.event.location}</p>
                                <Button variant="primary" type="button" className="events-button" onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</Button>
                                <Button variant="primary" type="button" className="events-button"
                                    onClick={() => { this.props.history.push(`/events/${this.props.event.id}/edit`) }}>Edit</Button>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
            );
        } else {
            return (
                <div className="eventCard card">
                    <Card>
                        <div className="card-content">
                            <Card.Body>
                                <h2><span className="card-eventname">{this.props.event.eventName}</span></h2>
                                <p>Date: {this.props.event.eventDate}</p>
                                <p>Location: {this.props.event.location}</p>
                            </Card.Body>
                        </div>
                    </Card>
                </div>

            )
        }
    }
}