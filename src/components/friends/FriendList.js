import React, { Component } from "react";
import FriendCard from "./FriendCard";
import APIManager from "../../modules/APIManager";
import { ListGroup } from "react-bootstrap";

class FriendList extends Component {
  state = {
    friends: [],
    loadingStatus: true
  };
  deleteFriend = id => {};
  addFriend = id => {};
  componentDidMount() {
    APIManager.get(
      `friends/?loggedInUser=${localStorage.getItem("userId")}&_expand=user`
    ).then(friends => {
      this.setState({ friends: friends, loadingStatus: false });
    });
  }
  render() {
    return (
      <ListGroup>
        {this.state.friends.map(friend => {
          return (
            <FriendCard
              key={friend.id}
              friend={friend.user}
              deleteFriend={this.deleteFriend}
            />
          );
        })}
      </ListGroup>
    );
  }
}

export default FriendList;
