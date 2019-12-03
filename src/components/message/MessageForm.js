import React, { Component } from "react"

class MessageForm extends Component {

    

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    render() {
        return (
            <>
                <label>New Message</label>
                <textarea className="form-control" onChange={this.handleFieldChange} required
                    id="message"></textarea>
                <button disabled={this.state.loadingStatus} onClick={this.createNewMessage}>Submit</button>
            </>
        )}
}