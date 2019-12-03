import React, { Component } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import "./Friend.css";

class FriendCard extends Component {
  render() {
    console.log(this.props.friend);
    return (
      <ListGroup>
        <Card className="friend">
          <Card.Body className="friend__content">
            <Card.Text className="friend__name">
              Name: {this.props.friend.fullName}
            </Card.Text>
            <Card.Text className="friend__email">
              Email: {this.props.friend.email}
            </Card.Text>
          </Card.Body>
          <Button
            type="button"
            className="btn-primary"
            onClick={() => this.props.deleteFriend(this.props.friend.id)}>
            Remove Friend
          </Button>
        </Card>
      </ListGroup>
    );
  }
}

export default FriendCard;
