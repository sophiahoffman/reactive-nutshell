import React, { Component } from "react";
import { InputGroup, Button } from "react-bootstrap";
import APIManager from "../../modules/APIManager";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

class FriendSearch extends Component {
  state = {
    users: [],
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
  componentDidMount() {
    APIManager.get("users").then(users =>
      this.setState({ users: users.map(user => user.fullName) })
    );
  }
  render() {
    return (
      <InputGroup className="friend__search">
        <Typeahead
        id="typeahead-users"
          labelKey="name"
          options={this.state.users}
          onChange={input => {
            this.setState({ input: input });
          }}
          placeholder="Select a person..."></Typeahead>
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
