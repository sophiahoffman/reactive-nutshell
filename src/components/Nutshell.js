import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import FriendWrapper from "./friends/FriendWrapper";
import "./Nutshell.css";
import ApplicationViews from "./ApplicationViews"
import Login from "./auth/Login"

class Nutshell extends Component {

  state = {
    user: false,
    userId: JSON.parse(localStorage.getItem("credentials"))
  }

  // Check if credentials are in local storage
  //returns true/false
  isAuthenticated = () => localStorage.getItem("credentials") !== null

  setUser = authObj => {

    localStorage.setItem(
      "credentials",
      JSON.stringify(authObj)
    )
    localStorage.setItem(
      "userId",
      JSON.stringify(authObj.id)
    )
    this.setState({
      user: this.isAuthenticated(),
    });
  }

  getUser = () => JSON.parse(localStorage.getItem("credentials"))

  clearUser = () => {
    localStorage.removeItem("credentials")
    localStorage.removeItem("userId")

    this.setState({
      user: false
    });
  }

  componentDidMount() {
    this.setState({
      user: this.isAuthenticated()
    })
  }

  render() {
    if (this.state.user) {
    return (
      <React.Fragment>
        <NavBar user={this.state.user}
          clearUser={this.clearUser} />
        <FriendWrapper
          user={this.state.user}
          setUser={this.setUser}
          searchUsers={this.searchUsers}
          getUser={this.getUser} />
      </React.Fragment>
    )
    } else {
      return (
      <>
        <NavBar user={this.state.user}
          clearUser={this.clearUser} />
        <Login setUser={this.setUser} searchUsers={this.searchUsers}
             />
      </>
      )
    };
  }
}

export default Nutshell;
