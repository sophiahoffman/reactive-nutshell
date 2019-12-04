import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import FriendWrapper from "./friends/FriendWrapper";
import "./Nutshell.css";

class Nutshell extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <FriendWrapper />
      </React.Fragment>
    );
  }
}

export default Nutshell;
