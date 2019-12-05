import React, { Component } from "react"
import TaskAPIManager from "../../modules/TaskAPIManager"
import "./TaskForm.css"
import { Form, FormGroup, Button } from "react-bootstrap";

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
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedTask = {
            id: parseInt(this.props.match.params.taskId),
            name: this.state.name,
            expectedCompletionDate: this.state.expectedCompletionDate,
            userId: currentUser.id,
            isComplete: false
        };
        TaskAPIManager.update("tasks", editedTask)
            .then(() => this.props.history.push("/tasks"))
    }

    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        TaskAPIManager.get("tasks", this.props.match.params.taskId)
            .then(task => {
                this.setState({
                    name: task.name,
                    expectedCompletionDate: task.expectedCompletionDate,
                    userId: currentUser.id,
                    isComplete: false,
                    loadingStatus: false,
                });
            });
    }

    render() {
        return (
            <>
                <Form className="taskForms">
                    <FormGroup>
                        <div>
                            <Form.Label htmlFor="taskName">Name</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                value={this.state.name}
                                required
                                onChange={this.handleFieldChange}
                                id="name"
                                placeholder="task"
                            />
                            <Form.Label htmlFor="expectedCompletionDate">Date to be completed</Form.Label>
                            <Form.Control
                                className="small-boxes"
                                size="lg"
                                type="date"
                                value={this.state.expectedCompletionDate}
                                required
                                onChange={this.handleFieldChange}
                                id="expectedCompletionDate"
                            />
                        </div>
                        <div>
                            <Button
                                variant="outline-success"
                                block
                                disabled={this.state.loadingStatus}
                                onClick={this.updateExistingTask}
                            >Submit</Button>
                        </div>
                    </FormGroup>
                </Form>
            </>
        );
    }
}

export default TaskEditForm