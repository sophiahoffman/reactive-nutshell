import React, { Component } from "react";
import { InputGroup, Button } from "react-bootstrap";
import APIManager from "../../modules/APIManager";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

class FriendSearch extends Component {
  state = {
    users: [],
    input: "",
    alert: {
      hidden: true,
      message: ""
    },
    loadingStatus: true
  };
  getUserId = async name => {
    const user = await APIManager.get(`users?fullName=${name}`);
    return user[0] ? user[0].id : null;
  };
  searchAndAddFriend = async () => {
    this.setState({ loadingStatus: true });
    const userId = await this.getUserId(this.state.input);
    if (userId) {
      this.props.displayNewAlert(
        "Want to add this person as a friend?",
        "",
        "info",
        async () => {
          await this.props.addFriend(userId);
          this.refs["search-friends-typeahead"].getInstance().clear();
        }
      );
      this.props.history.push("/friends");
      // return this.props.addFriend(userId);
    } else {
      this.props.displayNewAlert(
        "shit done broke",
        "That user does not exist",
        "warning"
      );
      // window.alert(`${this.state.input} does not exist`);
      // const newAlert = { hidden: false, message: `That user does not exist` };
      // this.setState({ input: "", alert: newAlert });
    }
    this.setState({ input: "", loadingStatus: false });
  };
  async componentDidMount() {
    const users = await APIManager.get("users");
    this.setState({
      loadingStatus: false,
      users: users.map(user => user.fullName)
    });
  }
  render() {
    return (
      <InputGroup className="friend__search">
        <Typeahead
          ref="search-friends-typeahead"
          id="typeahead-users"
          labelKey="name"
          options={this.state.users}
          onChange={input => {
            this.setState({ input: input });
          }}
          placeholder="Select a person..."></Typeahead>
        <InputGroup.Append>
          <Button
            disabled={this.state.loadingStatus}
            variant="success"
            onClick={this.searchAndAddFriend}>
            Add
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

export default FriendSearch;
