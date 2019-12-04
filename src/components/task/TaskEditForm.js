import React, { Component } from "react"
import TaskAPIManager from "../../modules/TaskAPIManager"

class TaskEditForm extends Component {
    //set the initial state
    state = {
        name: "",
        expectedCompletionDate: "",
        loadingStatus: true,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingTask = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedTask = {
            id: parseInt(this.props.match.params.taskId),
            name: this.state.name,
            expectedCompletionDate: this.state.expectedCompletionDate,
            userId: this.props.getUser.id,
            isComplete: false
        };
        TaskAPIManager.update("tasks", editedTask)
            .then(() => this.props.history.push("/tasks"))
    }

    componentDidMount() {
        TaskAPIManager.get("tasks", this.props.match.params.taskId)
            .then(task => {
                this.setState({
                    name: task.name,
                    expectedCompletionDate: task.expectedCompletionDate,
                    userId: this.props.getUser.id,
                    isComplete: false,
                    loadingStatus: false,
                });
            });
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <input
                                type="text"
                                value={this.state.name}
                                required
                                onChange={this.handleFieldChange}
                                id="name"
                                placeholder="task"
                            />
                            <label htmlFor="taskName">Name</label>
                            <input
                                type="date"
                                value={this.state.expectedCompletionDate}
                                required
                                onChange={this.handleFieldChange}
                                id="expectedCompletionDate"
                            />
                            <label htmlFor="expectedCompletionDate">Date to be completed</label>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.updateExistingTask}
                            >Submit</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default TaskEditForm