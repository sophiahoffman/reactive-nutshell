import React, { Component } from "react";
import FriendCard from "./FriendCard";
import { ListGroup } from "react-bootstrap";

class FriendList extends Component {
  state = {
    loadingStatus: true
  };
  addFriend = id => {};
  componentDidMount() {
    this.props.getFriends();
    this.setState({ loadingStatus: false });
  }
  render() {
    return (
      <ListGroup>
        {this.props.friends.map(friend => {
          return (
            <FriendCard
              key={friend.id}
              friend={friend.user}
              deleteFriend={this.props.removeFriend}
            />
          );
        })}
      </ListGroup>
    );
  }
}

export default FriendList;
