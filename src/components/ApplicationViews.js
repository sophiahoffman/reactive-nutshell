import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from './auth/Login'
import TaskList from "./task/TaskList";
import TaskForm from "./task/TaskForm"
import TaskEditForm from "./task/TaskEditForm"
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
          exact path="/login" render={props => {
            return <Login setUser={this.props.setUser} searchUsers={this.props.searchUsers}
              {...props} {...this.props} />
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
            return <MessageList />
          }}
        />

        <Route
          exact path="/tasks" render={props => {
            if (this.props.user) {
              return <TaskList {...props} {...this.props} />
            } else {
              return <Redirect to="/login" />
            }
          }} />

        <Route path="/tasks/new" render={(props) => {
          return <TaskForm {...props} {...this.props} />
        }} />

        <Route
          path="/tasks/:taskId(\d+)/edit" render={props => {
            return <TaskEditForm {...props} {...this.props} />
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