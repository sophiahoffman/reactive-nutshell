import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from './auth/Login'
import TaskList from "./task/TaskList";
import TaskForm from "./task/TaskForm"

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
          exact path="/login" render={props => {
            console.log("login route props", props)
            return <Login setUser={this.props.setUser} searchUsers={this.props.searchUsers}
             {...props} />
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
          exact path="/tasks" render={props => {
            if (this.props.user) {
            return <TaskList {...props} />
            }  else {
              return <Redirect to="/login" />
            }
          }} />

        <Route path="/tasks/new" render={(props) => {
          return <TaskForm {...props} />
        }} />


        <Route
          path="/events" render={props => {
            return null
            // Remove null and return the component which will show the user's events
          }}
        />

      </React.Fragment>
    );
  }
}
