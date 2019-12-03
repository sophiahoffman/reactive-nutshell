import { Route } from "react-router-dom";
import React, { Component } from "react";
import EventList from './events/EventList'
import EventForm from './events/EventForm'

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          exact path="/register" render={props => {
            return null
            // Remove null and return the component which will handle user registration
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route exact
          path="/events" render={props => {
            return <EventList {...props} />
            // Remove null and return the component which will show the user's events
          }}
        />

        <Route
          path="/events/new" render={props => {
            return <EventForm {...props} />
            // Remove null and return the component which will show the user's events
          }}
        />

      </React.Fragment>
    );
  }
}
