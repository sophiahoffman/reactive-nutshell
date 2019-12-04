import React, { Component } from 'react'
//import the components we will need
import TaskCard from './TaskCard'
import TaskAPIManager from '../../modules/TaskAPIManager'
import { Button } from 'react-bootstrap'

class TaskList extends Component {
    //define what this component needs to render
    state = {
        tasks: [],
        userId: ""


    }

    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        TaskAPIManager.getAll(`tasks?isComplete=false&_sort=expectedCompletionDate&_order=asc&userId=${currentUser.id}`)
            .then((tasks) => {
                this.setState({
                    tasks: tasks,
                    userId: currentUser.id
                })
            })
    }

    deleteTask = (id) => {
        TaskAPIManager.delete("tasks", id)
            .then(() => {
                TaskAPIManager.getAll(`tasks?isComplete=false&_sort=expectedCompletionDate&_order=asc&userId=${this.props.getUser.id}`)
                    .then((newTasks) => {
                        this.setState({
                            tasks: newTasks
                        })
                    })
            })
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    completeTask= (id)  => {
        console.log("trying to find id", id)
        this.setState({ loadingStatus: true });
        const completedTask = {
            isComplete: true,
            id: id
        };
        TaskAPIManager.updateSingleSection("tasks", completedTask)
            .then(() => this.props.history.push("/tasks"))
    }

    render() {

        return (
            <>
                <Button variant="primary"
                    className="btn"
                    onClick={() => { this.props.history.push("/tasks/new") }}
                >New Task</Button>
                <div className="container-cards">
                    {this.state.tasks.map(task =>
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={this.deleteTask}
                            completeTask={this.completeTask}
                            {...this.props} />
                    )}
                </div>
            </>
        )
    }
}

export default TaskList