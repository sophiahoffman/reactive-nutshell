import React, { Component } from "react";
import FriendCard from "./FriendCard";
import { ListGroup } from "react-bootstrap";
import FriendSearch from "./FriendSearch";

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
      <>
        {/* <FriendSearch addFriend={this.props.addFriend} /> */}
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
      </>
    );
  }
}

export default FriendList;
