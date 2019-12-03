import React, { Component } from 'react';
import TaskAPIManager from '../../modules/TaskAPIManager';


class TaskForm extends Component {
    state = {
        taskName: "",
        expectedCompletionDate: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    /*  Local method for validation, set loadingStatus, create animal      object, invoke the AnimalManager post method, and redirect to the full animal list
    */
    constructNewTask = evt => {
        evt.preventDefault();
        if (this.state.taskName === "" || this.state.expectedCompletionDate === "") {
            window.alert("Please fill out all fields");
        } else {
            this.setState({ loadingStatus: true });
            const task = {
                name: this.state.taskName,
                expectedCompletionDate: this.state.expectedCompletionDate,
                isComplete: false
            };

            // Create the animal and redirect user to animal list
            TaskAPIManager.post("tasks", task)
            .then(() => this.props.history.push("/tasks"));
        }
    };

    render(){

        return(
            <>
            <form>
                <fieldset>
                    <div className="formgrid">
                        <input
                        type="text"
                        required
                        onChange={this.handleFieldChange}
                        id="taskName"
                        placeholder="task"
                        />
                        <label htmlFor="taskName">Name</label>
                        <input
                        type="date"
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
                        onClick={this.constructNewTask}
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
        )
    }
}

export default TaskForm