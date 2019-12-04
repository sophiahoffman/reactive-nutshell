import React, { Component } from "react"
import { Card } from 'react-bootstrap'
import { formatTimestamp } from "../../modules/Utilities"
import "./Message.css"
import APIManager from "../../modules/APIManager"

class MessageCard extends Component {
    state = {
        messageObj: {},
        newMessage: "",
        editMode: false
    }
    
    editMessage = () => {
        this.setState({
            editMode: true
        })
    }

    saveMessage = () => {
        const newMessageObj = {
            id: this.state.messageObj.id,
            userId: this.props.getUser.id,
            message: this.state.newMessage,
            timestamp: this.state.messageObj.timestamp
        }

        APIManager.update("messages", newMessageObj)
        .then(this.props.updateMessageArray)

        this.setState({
            editMode: false 
        })
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        this.setState({
            messageObj: this.props.message,
            newMessage: this.props.message.message
        })
        console.log("this.props", this.props)
    }

    render() {
        if(this.props.message.userId === this.props.getUser.id &&
            this.state.editMode === false) {
            return (
                <Card>
                    <span>{this.props.message.user.fullName} - {this.props.message.message}</span>
                    <p className="timestamp">{formatTimestamp(this.props.message.timestamp).split(",")[0]}<br />
                        {formatTimestamp(this.props.message.timestamp).split(",")[1]}</p>
                    <button onClick={this.editMessage}>Edit</button>
                </Card>
            )
        } else if(this.props.message.userId === this.props.getUser.id &&
            this.state.editMode === true)  {
            return (
                <Card>
                    <span>{this.props.message.user.fullName} - </span>
                    <textarea id="newMessage" onChange={this.handleFieldChange}
                        defaultValue={this.props.message.message}></textarea>
                    <p className="timestamp">{formatTimestamp(this.props.message.timestamp).split(",")[0]}<br />
                        {formatTimestamp(this.props.message.timestamp).split(",")[1]}</p>
                    <button onClick={this.editMessage}>Edit</button>
                    <button onClick={this.saveMessage}>Save</button>
                </Card>
            )
        } else {
            return (
                <Card>
                    <span>{this.props.message.user.fullName} - {this.props.message.message}</span>
                    <p className="timestamp">{formatTimestamp(this.props.message.timestamp).split(",")[0]}<br />
                        {formatTimestamp(this.props.message.timestamp).split(",")[1]}</p>
                </Card>
            )
        }
    }
}

export default MessageCard