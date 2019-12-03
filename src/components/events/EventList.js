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
        // get all friends for this user
        APIManager.get(`friends?loggedInUser=${userId}`)
            .then(friends => {
                friends.forEach(friend => {
                    // put all of this user's friend ids into the friendsArray
                    friendsArray.push(friend.userId)
                    for (let i = 0; i < friendsArray.length; i++) {
                        // this loop builds the fetch call for events
                        fetchCall += "&&userId=" + friendsArray[i]
                    }
                })
                // get all events using the fetch call that we built with the friends array
                APIManager.get(fetchCall)
                    .then(events => {
                        events.sort(function (a,b) {
                            let dateA = new Date(a.eventDate), dateB = new Date(b.eventDate)
                            return dateA - dateB
                        })
                        this.setState({
                            events: events
                        })
                    
                    })
            })

    }

    deleteEvent = id => {
        APIManager.delete(`events/${id}`)
            .then(() => {
                this.componentDidMount()
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
                                deleteEvent={this.deleteEvent}
                                {...this.props}
                            />
                        )}
                </div>
            </>
        )
    }
}

export default EventList