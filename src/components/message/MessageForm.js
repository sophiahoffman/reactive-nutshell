import React, { Component } from "react"
import { createDateTimeToISO } from "../../modules/Utilities"
import APIManager from "../../modules/APIManager"

class MessageForm extends Component {

    state = {
        message: ""
    }

    createNewMessage = evt => {
        evt.preventDefault()

        if (this.state.message === "") {
            window.alert("Please enter a message")
        } else {
            const newMessage = {
                    "userId": this.props.getUser.id,
                    "message": this.state.message,
                    "timestamp": createDateTimeToISO()
            }

            APIManager.post("messages", newMessage)
            .then(messagePosted => {
                this.props.updateMessageArray(messagePosted)
            })
            this.setState({
                message: ""
            })
        }
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    render() {
        return (
            <form>
                <label>New Message</label>
                <textarea className="form-control" onChange={this.handleFieldChange} required
                    id="message" value={this.state.message}></textarea>
                <button onClick={this.createNewMessage}>Submit</button>
            </form>
        )}

}

export default MessageForm