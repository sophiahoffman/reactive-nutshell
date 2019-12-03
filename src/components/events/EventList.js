/* 
Author: Lauren Riddle
Purpose: to render the event cards  when the URL is changed to http://localhost:3000/events
*/

import React, { Component } from 'react'
import EventCard from './EventCard'
import APIManager from '../../modules/APIManager'
import { Button } from 'react-bootstrap';
import './Events.css'


class EventList extends Component {
    state = {
        events: []
    }

    componentDidMount() {
        const userId = localStorage.getItem("userId")
        let friendsArray = []
        let fetchCall = `events?userId=${userId}`
        APIManager.get(`friends?loggedInUser=${userId}`)
            .then(friends => {
                friends.forEach(friend => {
                    friendsArray.push(friend.userId)
                    for (let i = 0; i < friendsArray.length; i++) {
                        fetchCall += "&&userId=" + friendsArray[i]
                    }
                })
                APIManager.get(fetchCall)
                    .then(events => {
                        this.setState({
                            events: events
                        })
                    })
            })
        
    }

    render() {
        return (
            <>
                <section className="events-section-content">
                    <Button type="button" className="newEventBtn" onClick={() => { this.props.history.push("/events/new") }}>Create New Event</Button>
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