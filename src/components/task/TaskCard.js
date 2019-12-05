import React, { Component } from 'react';

class TaskCard extends Component {
  render() {
    console.log("field change", this.props)
    return (
      <div className="card">
        <div className="card-content">
          <h3>To Do: <span className="card-taskname">{this.props.task.name}</span></h3>
          <p>{this.props.task.expectedCompletionDate}</p>
          <label>Completed</label>
          <input type="checkbox"
          onChange={() => this.props.handleFieldChange}
          onClick={() => this.props.completeTask(this.props.task.id)}
          />
          <button type="button"
            onClick={() => { this.props.history.push(`/tasks/${this.props.task.id}/edit`) }}>Edit</button>
          <button type="button" onClick={() => this.props.deleteTask(this.props.task.id)}>Give Up</button>
        </div>
      </div>
    );
  }
}

export default TaskCard;