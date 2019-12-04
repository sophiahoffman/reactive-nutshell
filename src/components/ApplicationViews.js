import { Route } from "react-router-dom";
import React, { Component } from "react";
import MessageList from "./message/MessageList"
import ArticleList from "./articles/ArticleList";
import ArticleForm from "./articles/ArticleForm";
import ArticleEditForm from "./articles/ArticleEditForm";
import EventList from './events/EventList'
import EventForm from './events/EventForm'
import EventEditForm from './events/EventEditForm'
import FriendList from "./friends/FriendList"

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
            return (
              <FriendList
                getFriends={this.props.getFriends}
                addFriend={this.props.addFriend}
                removeFriend={this.props.removeFriend}
                friends={this.props.friends}
              />
            );
          }}
        />

        <Route
          path="/messages" render={props => {
            return <MessageList {...props} />
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

        {/* Author of Events Routes: Lauren Riddle */}
        <Route exact
          path="/events" render={props => {
            return <EventList {...props} />
          }}
        />

        <Route exact
          path="/events/new" render={props => {
            return <EventForm {...props} />
          }}
        />

{/* path to articles page renders all articles of user and user's friends */}
        <Route
          exact path="/articles" render={props => {
            return <ArticleList 
              {...props}
            />
          }}
        />

{/* path to create new article is a form */}
        <Route
          path="/articles/new" render={props => {
            return <ArticleForm
              {...props}
            />
          }}
        />

{/* path to update article is a form         */}
        <Route
          path="/articles/:articleId(\d+)/edit" render={props => {

            console.log(props)
            return <ArticleEditForm
              {...props}

            />
          }}
        />
        <Route path="/events/:eventId(\d+)/edit" render={props => {
          return <EventEditForm {...props} />
        }} />

      </React.Fragment>
    );
  }
}