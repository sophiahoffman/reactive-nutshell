import React, { Component } from 'react';
class EventCard extends Component {

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <h2>Event: <span className="card-eventname">{this.props.event.eventName}</span></h2>
                    <p>Date: {this.props.event.eventDate}</p>
                    <p>Location: {this.props.event.location}</p>
                    <button type="button" onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</button>
                    <button type="button"
                        onClick={() => { this.props.history.push(`/events/${this.props.event.id}/edit`) }}>Edit</button>
                </div>
            </div>
        );
    }
}

export default EventCard;