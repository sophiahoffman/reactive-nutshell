import React, { Component } from "react"
import MessageCard from "./MessageCard"
import APIManager from "../../modules/APIManager"
import MessageForm from "./MessageForm"

class MessageList extends Component {

    state = {
        messages: []
    }

    componentDidMount = () => {
        APIManager.get(`messages?_sort=timestamp&_expand=user`)
        .then(messageGetResults => {
            this.setState({
                messages: messageGetResults
            })
        })
        
    }
    
    updateMessageArray = () => {
        APIManager.get(`messages?_sort=timestamp&_expand=user`)
        .then(messageGetResults => {
            this.setState({
                messages: messageGetResults
            })
        })
    }

    render() {
        return (
            <>
                <div>
                    <MessageForm
                        updateMessageArray={this.updateMessageArray}
                    />
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