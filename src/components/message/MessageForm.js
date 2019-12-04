import React, { Component } from "react"
import { createDateTimeToISO } from "../../modules/Utilities"
import APIManager from "../../modules/APIManager"

class MessageForm extends Component {

    state = {
        loggedInUserId: 1,
        message: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    createNewMessage = evt => {
        evt.preventDefault()

        if (this.state.message === "") {
            window.alert("Please enter a message")
        } else {
            const newMessage = {
                    "userId": this.state.loggedInUserId,
                    "message": this.state.message,
                    "timestamp": createDateTimeToISO()
            }
            console.log(newMessage)

            APIManager.post("messages", newMessage)
            .then(messagePosted => {
                this.props.updateMessageArray(messagePosted)
            })
        }
    }

    render() {
        return (
            <form>
                <label>New Message</label>
                <textarea className="form-control" onChange={this.handleFieldChange} required
                    id="message"></textarea>
                <button onClick={this.createNewMessage}>Submit</button>
            </form>
        )}

}

export default MessageForm