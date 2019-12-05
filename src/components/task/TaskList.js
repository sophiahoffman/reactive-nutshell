import React, { Component } from 'react'
//import the components we will need
import TaskCard from './TaskCard'
import TaskAPIManager from '../../modules/TaskAPIManager'
import "./TaskCard.css"
import { Button, } from 'react-bootstrap'

class TaskList extends Component {
    //define what this component needs to render
    state = {
        tasks: [],
        userId: "",
        loadingStatus: false


    }
    getAllTasks = () => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        TaskAPIManager.getAll(`tasks?isComplete=false&_sort=expectedCompletionDate&_order=asc&userId=${currentUser.id}`)
            .then((tasks) => {
                // console.log("before set state", tasks)
                this.setState({
                    tasks: tasks,
                    userId: currentUser.id
                })
            })
    }

    componentDidMount() {
        this.getAllTasks()
    }

    deleteTask = (id) => {
        TaskAPIManager.delete("tasks", id)
            .then(() => {
                this.getAllTasks()
            })
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    completeTask = (id) => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        this.setState({ loadingStatus: true });
        const completedTask = {
            isComplete: true,
            id: id
        };
        TaskAPIManager.updateSingleSection("tasks", completedTask)
            .then(() => {
                this.getAllTasks()
            })
    }

    render() {

        return (
            <>
                <div className="taskList">
                    <Button variant="primary"
                        size="lg"
                        onClick={() => { this.props.history.push("/tasks/new") }}
                    >New Task</Button>
                    <div>
                        {this.state.tasks.map(task =>
                            <TaskCard
                                key={task.id}
                                task={task}
                                deleteTask={this.deleteTask}
                                completeTask={this.completeTask}
                                handleFieldChange={this.handleFieldChange}
                                {...this.props} />
                        )}
                    </div>
                </div>
            </>
        )
    }
}

export default TaskList