import React, { Component } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import "./Friend.css";

class FriendCard extends Component {
  render() {
    return (
      <ListGroup.Item>
        <div className="friendsCard card">
          <Card className="friend">
            <Card.Body className="friend__content">
              <Card.Text className="friend__name">
               {this.props.friend.fullName}
              </Card.Text>
              <Card.Text className="friend__email">
               {this.props.friend.email}
              </Card.Text>
            <Button
              type="button"
              className="btn-primary friends-button"
              onClick={() => this.props.deleteFriend(this.props.friend.id)}>
              Remove Friend
          </Button>
              </Card.Body>
          </Card>
        </div>
      </ListGroup.Item>
    );
  }
}

export default FriendCard;
