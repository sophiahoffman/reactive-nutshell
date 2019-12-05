import React, { Component } from 'react';
import TaskAPIManager from '../../modules/TaskAPIManager';
import { Form, FormGroup, Button } from 'react-bootstrap';
import "./TaskForm.css"


class TaskForm extends Component {
    state = {
        taskName: "",
        expectedCompletionDate: "",
        users: [],
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
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        evt.preventDefault();
        if (this.state.taskName === "" || this.state.expectedCompletionDate === "") {
            window.alert("Please fill out all fields");
        } else {
            this.setState({ loadingStatus: true });
            // const userVal = this.props.getUser("credentials")
            // console.log("userVal", userVal)
            const task = {
                name: this.state.taskName,
                expectedCompletionDate: this.state.expectedCompletionDate,
                userId: currentUser.id,
                isComplete: false
            };
            // Create the animal and redirect user to animal list
            TaskAPIManager.post("tasks", task)
                .then(() => this.props.history.push("/tasks"));
        }
    };

    render() {
        return (
            <>
                <div id="newTaskForm">

                    <Form className="taskForms">
                        <FormGroup>
                            <div>
                                <Form.Label htmlFor="taskName">Name</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="taskName"
                                    placeholder="Your next task"
                                />
                                <Form.Label htmlFor="expectedCompletionDate">Date to be completed</Form.Label>
                                <Form.Control
                                    className="small-boxes"
                                    size="lg"
                                    type="date"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="expectedCompletionDate"
                                />
                            </div>
                            <div className="saveTaskBtn">
                                <Button
                                    variant="outline-success"
                                    block
                                    disabled={this.state.loadingStatus}
                                    onClick={this.constructNewTask}
                                >Submit</Button>
                            </div>
                        </FormGroup>
                    </Form>
                </div>
            </>
        )
    }
}

export default TaskForm