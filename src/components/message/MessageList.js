import React, { Component } from "react"
import MessageCard from "./MessageCard"
import APIManager from "../../modules/APIManager"
import MessageForm from "./MessageForm"
import "./Message.css"

class MessageList extends Component {

    state = {
        messages: [],
        editMode: false
    }

    componentDidMount = () => {
        APIManager.get(`messages?_sort=timestamp&_expand=user`)
        .then(messageGetResults => {
            this.setState({
                messages: messageGetResults
            })
            window.scrollTo(0, document.body.scrollHeight)
        })
    }
    
    updateMessageArray = () => {
        APIManager.get(`messages?_sort=timestamp&_expand=user`)
        .then(messageGetResults => {
            this.setState({
                messages: messageGetResults
            })
            window.scrollTo(0, document.body.scrollHeight)
        })
    }

    render() {
        return (
            <>
                <div className="messageForm">
                    <MessageForm
                        updateMessageArray={this.updateMessageArray}
                        {...this.props}
                    />
                </div>
                <div className="messagelistContainer">
                <div className="messageList">
                    { this.state.messages.map(message =>
                        <MessageCard 
                            key={message.id}
                            message={message}
                            updateMessageArray={this.updateMessageArray}
                            editMessage={this.editMessage}
                            {...this.props}
                        />
                    )}
                </div>
                </div>
            </>
        )
    }
}

export default MessageList