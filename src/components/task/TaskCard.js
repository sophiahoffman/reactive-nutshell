import React, { Component } from 'react';

class TaskCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <h3>To Do: <span className="card-taskname">{this.props.task.name}</span></h3>
          <p>{this.props.task.expectedCompletionDate}</p>
          <button type="button" onClick={() => this.props.deleteTask(this.props.task.id)}>Give Up</button>
        </div>
      </div>
    );
  }
}

export default TaskCard;