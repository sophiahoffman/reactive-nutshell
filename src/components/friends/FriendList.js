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
      <div className="friend-search-container">
        <h4>Add a Friend:</h4>
        <FriendSearch addFriend={this.props.addFriend} />
        </div>
          <div className="friends-flex">
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
          </div>
      </>
    );
  }
}

export default FriendList;
