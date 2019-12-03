import React, { Component } from "react"
import MessageCard from "./MessageCard"
import APIManager from "../../modules/APIManager"

class MessageList extends Component {

    state = {
        loggedInUserId: 1,
        messages: [],
        loadingStatus: false
    }
    
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        console.log(evt.target.id)
        this.setState(stateToChange)
    }

    createNewMessage = evt => {
        evt.preventDefault()

        // this.setState({ loadingStatus: true })

        // const newMessage = {
        //         "userId": this.state.loggedInUserId,
        //         "message": "Anyone see the new popular movie out?",
        //         "timestamp": "2012-04-25T18:25:43.511Z"
        // }
    }

    componentDidMount() {
        APIManager.get(`messages?_sort=timestamp&_expand=user`)
        .then(messageGetResults => {
            console.log(".then messageArray", messageGetResults)
            this.setState({
                messages: messageGetResults
            })
        })
        
    }
    
    render() {
        return (
            <>
                <div>
                    <label>New Message</label>
                    <textarea className="form-control" onChange={this.handleFieldChange} required
                        id="message"></textarea>
                    <button disabled={this.state.loadingStatus} onClick={this.createNewMessage}>Submit</button>
                </div>
                <div>
                    { this.state.messages.map(message =>
                        <MessageCard 
                            key={message.id}
                            message={message}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default MessageList