import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./Nutshell.css";

class Nutshell extends Component {

  state = {
    user: false,
    userId: ""

  }

  // Check if credentials are in local storage
  //returns true/false
  isAuthenticated = () => localStorage.getItem("credentials") !== null

  setUser(authObj) {
    /*
      For now, just store the email and password that
      the customer enters into local storage.
    */
    // localStorage.setItem(
    //   "credentials",
    //   JSON.stringify(authObj)
    // )
    localStorage.setItem(
      "credentials",
      authObj
    )
    this.setState({
      user: this.isAuthenticated()
    });
  }

  clearUser = () => {
    localStorage.removeItem("credentials")

    this.setState({
      user: this.isAuthenticated()
    });
  }

  componentDidMount() {
    this.setState({
      user: this.isAuthenticated()
    })
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user}
          clearUser={this.clearUser} />
        <ApplicationViews user={this.state.user}
          setUser={this.setUser}
          searchUsers={this.searchUsers}
        />
      </React.Fragment>
    );
  }
}

export default Nutshell;
