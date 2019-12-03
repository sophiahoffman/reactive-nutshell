import React, { Component } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import APIManager from "../../modules/APIManager";

class FriendSearch extends Component {
  state = {
    input: ""
  };
  handleInputChange = evt => {
    this.setState({ input: evt.target.value });
  };
  getUserId = name => {
    return APIManager.get(`users?fullName=${name}`).then(user =>
      user[0] ? user[0].id : null
    );
  };
  searchAndAddFriend = () => {
    return this.getUserId(this.state.input).then(userId => {
      if (userId) {
        return this.props.addFriend(userId);
      } else {
        window.alert(`${this.state.input} does not exist`);
        this.setState({ input: "" });
      }
    });
  };
  render() {
    return (
      <InputGroup className="friend__search">
        <FormControl
          placeholder="Add a new friend"
          id="friend-search-input"
          onChange={this.handleInputChange}
        />
        <InputGroup.Append>
          <Button variant="success" onClick={this.searchAndAddFriend}>
            Add
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

export default FriendSearch;
