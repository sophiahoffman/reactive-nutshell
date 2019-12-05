import React, { Component } from 'react'
//import the components we will need
import TaskCard from './TaskCard'
import TaskAPIManager from '../../modules/TaskAPIManager'
import { Button } from 'react-bootstrap'

class TaskList extends Component {
    //define what this component needs to render
    state = {
        tasks: [],
        userId: this.props.getUser

    }

    componentDidMount() {
        TaskAPIManager.getAll(`tasks?isComplete=false&_sort=expectedCompletionDate&_order=asc&userId=${this.props.getUser.id}`)
            .then((tasks) => {
                this.setState({
                    tasks: tasks,
                    userId: this.props.getUser.id
                })
            })
    }

    deleteTask = (id) => {
        TaskAPIManager.delete("tasks", id)
            .then(() => {
                TaskAPIManager.getAll(`tasks?isComplete=false&_sort=expectedCompletionDate&_order=asc&userId=${localStorage.getItem("userId")}`)
                    .then((newTasks) => {
                        this.setState({
                            tasks: newTasks
                        })
                    })
            })
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
                            {...this.props} />
                    )}
                </div>
            </>
        )
    }
}

export default TaskList