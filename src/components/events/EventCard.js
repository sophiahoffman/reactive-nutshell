/* 
Author: Lauren Riddle
Purpose: to create the card for a single event 
*/

import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
class EventCard extends Component {

    render() {
        return (
            <div className="card">
                <Card>
                    <div className="card-content">
                        <Card.Body>
                            <h2><span className="card-eventname">{this.props.event.eventName}</span></h2>
                            <p>Date: {this.props.event.eventDate}</p>
                            <p>Location: {this.props.event.location}</p>
                            <Button variant="link" type="button" onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</Button>
                            <Button variant="link" type="button"
                                onClick={() => { this.props.history.push(`/events/${this.props.event.id}/edit`) }}>Edit</Button>
                        </Card.Body>
                    </div>
                </Card>
            </div>
        );
    }
}

export default EventCard;