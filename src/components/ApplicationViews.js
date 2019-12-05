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
          exact path="/login" render={props => {
            // console.log("app view", this.props.user)
            if (this.props.user) {

            return <Redirect to="/" />
            } else {
            return <Login setUser={this.props.setUser} searchUsers={this.props.searchUsers}
             {...props} {...this.props} />
            }}}
        />

        <Route
          path="/friends" render={props => {
            if(this.props.user) {
              return (
                <FriendList
                  displayNewAlert={this.props.displayNewAlert}
                  getFriends={this.props.getFriends}
                  addFriend={this.props.addFriend}
                  removeFriend={this.props.removeFriend}
                  friends={this.props.friends}
                  {...props}
                />
              );
            } else {
              return <Redirect to="/login" />
            }
          }}
        />

        <Route
          path="/messages" render={props => {
            if (this.props.user) {
                return <MessageList {...props} {...this.props} />
              }  else {
                return <Redirect to="/login" />
              }
          }}
        />

        <Route
          exact path="/tasks" render={props => {
            if (this.props.user) {
              return <TaskList {...props} {...this.props} />
            } else {
              return <Redirect to="/login" />
            }
          }} 
            
          />

        <Route path="/tasks/new" render={(props) => {
          if (this.props.user) {
          return <TaskForm {...props} {...this.props} />
        }  else {
              return <Redirect to="/login" />
            }
        }} />

        <Route
          path="/tasks/:taskId(\d+)/edit" render={props => {
            return <TaskEditForm {...props} {...this.props} />
          }}
        />


        {/* Author of Events Routes: Lauren Riddle */}
        <Route exact
          path="/events" render={props => {
            if (this.props.user) {
            return <EventList {...props} />
          }  else {
              return <Redirect to="/login" />
            }
          }}
        />

        <Route exact
          path="/events/new" render={props => {
            if (this.props.user) {
            return <EventForm {...props} />
          }  else {
              return <Redirect to="/login" />
            }
          }}
        />

        <Route path="/events/:eventId(\d+)/edit" render={props => {
                      if (this.props.user) {
          return <EventEditForm {...props} />
        }  else {
              return <Redirect to="/login" />
            }
        }} />
{/* path to articles page renders all articles of user and user's friends */}
        <Route
          exact path="/articles" render={props => {
            if (this.props.user) {
            return <ArticleList 
              {...props}
            />
          }  else {
              return <Redirect to="/login" />
            }
          }}
        />

        {/* path to create new article is a form */}
        <Route
          path="/articles/new" render={props => {
            if (this.props.user) {
            return <ArticleForm
              {...props}
            />
          }  else {
              return <Redirect to="/login" />
            }
          }}
        />

        {/* path to update article is a form         */}
        <Route
          path="/articles/:articleId(\d+)/edit" render={props => {
            if (this.props.user) {
            // console.log(props)
            return <ArticleEditForm
              {...props}
            />
          }  else {
              return <Redirect to="/login" />
            }
          }}
        />

      </React.Fragment>
    );
  }
}