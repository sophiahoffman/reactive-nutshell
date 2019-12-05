import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import "./Nutshell.css";
import NutshellAlert from "./NutshellAlert"

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
    // localStorage.setItem(
    //   "userId",
    //   JSON.stringify(authObj.id)
    // )
    this.setState({
      user: this.isAuthenticated(),
    });
  }

  getUser = JSON.parse(localStorage.getItem("credentials"))

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
        <NutshellAlert 
          user={this.state.user}
          setUser={this.setUser}
          searchUsers={this.searchUsers}
          getUser={this.getUser} />
      </React.Fragment>
    );
  }
}

export default Nutshell;
