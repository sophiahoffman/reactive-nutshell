import React, { Component } from 'react'
import EventCard from './EventCard'
import APIManager from '../../modules/APIManager'

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
                    <button type="button" className="btn" onClick={() => { this.props.history.push("/events/new") }}>Create New Event</button>
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