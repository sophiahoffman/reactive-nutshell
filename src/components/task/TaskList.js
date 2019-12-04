import React, { Component } from 'react'
//import the components we will need
import TaskCard from './TaskCard'
import TaskAPIManager from '../../modules/TaskAPIManager'
import { Button } from 'react-bootstrap'

class TaskList extends Component {
    //define what this component needs to render
    state = {
        tasks: [],
    }

    componentDidMount() {
        console.log("Task LIST: ComponentDidMount");
        //getAll from AnimalManager and hang on to that data; put it in state
        TaskAPIManager.getAll(`tasks?userId=${this.props.getUser.id}`)
            .then((tasks) => {
                this.setState({
                    tasks: tasks
                })
            })
    }

    deleteTask = (id) => {
        TaskAPIManager.delete("tasks", id)
            .then(() => {
                TaskAPIManager.getAll("tasks?isComplete=false&_sort=expectedCompletionDate")
                    .then((newTasks) => {
                        this.setState({
                            tasks: newTasks
                        })
                    })
            })
    }

    render() {
        console.log("Task LIST2: Render", this.state);

        return (
            <>
                <Button variant="primary"
                className="btn"
                onClick={() => {this.props.history.push("/tasks/new")}}
                >New Task</Button>
                <div className="container-cards">
                    {this.state.tasks.map(task =>
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={this.deleteTask} />
                    )}
                </div>
            </>
        )
    }
}

export default TaskList