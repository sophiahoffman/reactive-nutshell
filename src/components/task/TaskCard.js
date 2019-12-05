import React, { Component } from 'react';
import { Card, Button, Alert, Container, Row } from 'react-bootstrap';
import "./TaskCard.css"

class TaskCard extends Component {
  render() {
    console.log("field change", this.props)
    return (
      <Container>
        <Row>
        <Card>
          <div className="taskCard-content">
            <Card.Header as="h3">To Do: <span className="card-taskname">{this.props.task.name}</span></Card.Header>
            <Card.Text>Will Complete by: {this.props.task.expectedCompletionDate}</Card.Text>
            <Card.Text>
              <label>Completed</label>
              <input type="checkbox"
                onChange={() => this.props.handleFieldChange}
                onClick={() => this.props.completeTask(this.props.task.id)}
              />
            </Card.Text>
            <div>
              <Button variant="info" block
                onClick={() => { this.props.history.push(`/tasks/${this.props.task.id}/edit`) }}>Edit</Button>
              <Button variant="danger" block onClick={() => this.props.deleteTask(this.props.task.id)}>Give Up</Button>
            </div>
          </div>
        </Card>
        </Row>
      </Container>
    );
  }
}

export default TaskCard;