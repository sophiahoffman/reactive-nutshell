/* 
Author: Lauren Riddle
Purpose: to render the event cards  when the URL is changed to http://localhost:3000/events
*/

import React, { Component } from 'react'
import EventCard from './EventCard'
import APIManager from '../../modules/APIManager'
import { Button } from 'react-bootstrap';


class EventList extends Component {
    state = {
        events: []
    }

    componentDidMount() {
        APIManager.get("events")
            .then(events => {
                this.setState({
                    events: events
                })
            })
    }

    render() {
        return (
            <>
                <section className="section-content">
                    <Button type="button" className="btn" onClick={() => { this.props.history.push("/events/new") }}>Create New Event</Button>
                </section>
                <div className="container-cards">
                    {this.state.events.map(event =>
                        <EventCard
                            key={event.id}
                            event={event}
                            // deleteAnimal={this.deleteAnimal}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default EventList