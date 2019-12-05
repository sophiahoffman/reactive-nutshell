import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import ApplicationViews from "../ApplicationViews";

class FriendWrapper extends Component {
  state = {
    friends: [],
  };
  componentDidMount() {
    this.getFriends();
  }
  getFriends = async () => {
    // return APIManager.get(
    //   `friends/?loggedInUser=${localStorage.getItem("userId")}&_expand=user`
    // ).then(friends => {
    //   this.setState({ friends: friends });
    // });
    const friends = await APIManager.get(
      `friends/?loggedInUser=${localStorage.getItem("userId")}&_expand=user`
    )
    this.setState({ friends: friends });
  };
  addFriend = async id => {
    if (Number(localStorage["userId"]) === Number(id)) {
      window.alert(
        "You cannot add yourself as a friend"
      );
    } else {
      // return APIManager.get(`friends?loggedInUser=${localStorage["userId"]}`)
      //   .then(friends => {
      //     if (friends.find(friend => Number(friend.userId) === Number(id))) {
      //       window.alert("That user is already a friend");
      //     } else {
      //       return APIManager.post(`friends/`, {
      //         loggedInUser: Number(localStorage["userId"]),
      //         userId: Number(id)
      //       });
      //     }
      //   })
      //   .then(() => {
      //     this.getFriends();
      //   });
      const friends = await APIManager.get(`friends?loggedInUser=${localStorage["userId"]}`)
      if (friends.find(friend => Number(friend.userId) === Number(id))) {
        window.alert("That user is already a friend");
      } else {
        await APIManager.post(`friends/`, {
          loggedInUser: Number(localStorage["userId"]),
          userId: Number(id)
        });
      }
      await this.getFriends();
    }
  };
  removeFriend = async id => {
    if (Number(localStorage["userId"]) === Number(id)) {
      window.alert(
        "Not sure how you did that, but you cannot delete yourself as a friend"
      );
    } else {
      // return APIManager.get(
      //   `friends?loggedInUser=${localStorage["userId"]}&userId=${id}`
      // ).then(friendResponse => {
      //   return APIManager.delete(`friends/${friendResponse[0].id}`).then(() => {
      //     this.getFriends();
      //   });
      // });
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
