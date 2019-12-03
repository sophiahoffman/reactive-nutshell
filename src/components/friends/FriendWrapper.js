import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import ApplicationViews from "../ApplicationViews";

class FriendWrapper extends Component {
  state = {
    friends: []
  };
  componentDidMount() {
    this.getFriends();
  }
  getFriends = () => {
    APIManager.get(
      `friends/?loggedInUser=${localStorage.getItem("userId")}&_expand=user`
    ).then(friends => {
      this.setState({ friends: friends });
    });
  };
  addFriend = id => {
    if (Number(localStorage["userId"]) === Number(id)) {
      window.alert(
        "Not sure how you did that, but you cannot add yourself as a friend"
      );
    } else {
      APIManager.get(`friends?loggedInUser=${localStorage["userId"]}`)
        .then(friends => {
          if (friends.find(friend => Number(friend.userId) === Number(id))) {
            window.alert("That user is already a friend");
          } else {
            APIManager.post(`friends/`, {
              loggedInUser: Number(localStorage["userId"]),
              userId: Number(id)
            });
          }
        })
        .then(() => {
          this.getFriends();
        });
    }
  };
  removeFriend = id => {
    if (Number(localStorage["userId"]) === Number(id)) {
      window.alert(
        "Not sure how you did that, but you cannot delete yourself as a friend"
      );
    } else {
      APIManager.get(
        `friends?loggedInUser=${localStorage["userId"]}&userId=${id}`
      ).then(friendResponse => {
        APIManager.delete(`friends/${friendResponse[0].id}`).then(() => {
          this.getFriends();
        });
      });
    }
  };

  render() {
    return (
      <ApplicationViews
        friends={this.state.friends}
        addFriend={this.addFriend}
        removeFriend={this.removeFriend}
        getFriends={this.getFriends}
      />
    );
  }
}

export default FriendWrapper;
