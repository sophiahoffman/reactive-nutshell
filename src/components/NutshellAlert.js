import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";
import FriendWrapper from "./friends/FriendWrapper";

class NutshellAlert extends Component {
  state = {
    hidden: true,
    error: "",
    message: "",
    variant: "dark",
    execClick: null
  };
  displayNewAlert = (
    error = "",
    message = "",
    type = "dark",
    execClick = null
  ) => {
    this.setState({
      hidden: false,
      error: error,
      message: message,
      variant: type,
      execClick: execClick
    });

    if (type === "success") {
      setTimeout(() => {
        this.setState({ hidden: true });
      }, 3000);
    }
  };
  executeClick = () => {
    if (this.state.execClick !== null) {
      // console.log(this.state.execClick)
      return this.state.execClick();
    }
  };
  render() {
    return (
      <>
        <Alert
          dismissible
          onClose={() =>
            this.setState({
              hidden: true,
              message: "",
              variant: "dark",
              execClick: null
            })
          }
          key="alert"
          variant={this.state.variant}
          hidden={this.state.hidden}>
          <Alert.Heading>{this.state.error}</Alert.Heading>
          <p className="alert-message">{this.state.message}</p>
          <Button
            onClick={this.executeClick}
            hidden={this.state.execClick === null}
            className="alignRight">
            Accept
          </Button>
        </Alert>
        <FriendWrapper displayNewAlert={this.displayNewAlert} {...this.props} />
      </>
    );
  }
}

export default NutshellAlert;
