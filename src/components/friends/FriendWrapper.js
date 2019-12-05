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
  getFriends = async () => {
    const friends = await APIManager.get(
      `friends/?loggedInUser=${localStorage.getItem("userId")}&_expand=user`
    );
    this.setState({ friends: friends });
  };
  addFriend = async (id, execClick = null) => {
    if (Number(localStorage["userId"]) === Number(id)) {
      this.props.displayNewAlert(
        "shit done broke",
        "You cannot add yourself as a friend :(",
        "warning"
      );
    } else {
      const friends = await APIManager.get(
        `friends?loggedInUser=${localStorage["userId"]}`
      );
      if (friends.find(friend => Number(friend.userId) === Number(id))) {
        this.props.displayNewAlert(
          "shit done broke",
          "That user is already a friend",
          "warning"
        );
      } else {
        await APIManager.post(`friends/`, {
          loggedInUser: Number(localStorage["userId"]),
          userId: Number(id)
        });
        this.props.displayNewAlert(
          "Success!",
          "You have a new friend :)",
          "success",
          execClick
        );
      }
      await this.getFriends();
    }
  };
  removeFriend = async id => {
    if (Number(localStorage["userId"]) === Number(id)) {
      this.props.displayNewAlert(
        "shit done broke",
        "Not sure how you did that, but you cannot delete yourself as a friend",
        "warning"
      );
    } else {
      const friendResponse = await APIManager.get(
        `friends?loggedInUser=${localStorage["userId"]}&userId=${id}`
      );
      await APIManager.delete(`friends/${friendResponse[0].id}`);
      await this.getFriends();
    }
  };

  render() {
    return (
      <ApplicationViews
        friends={this.state.friends}
        addFriend={this.addFriend}
        removeFriend={this.removeFriend}
        getFriends={this.getFriends}
        {...this.props}
      />
    );
  }
}

export default FriendWrapper;
