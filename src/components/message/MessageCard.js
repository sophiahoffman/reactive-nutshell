import React, { Component } from "react"
import { Card, Button } from 'react-bootstrap'
import { formatTimestamp } from "../../modules/Utilities"
import "./Message.css"
import APIManager from "../../modules/APIManager"

class MessageCard extends Component {
    state = {
        messageObj: {},
        newMessage: "",
        editMode: false,
        friendsIdList: []
    }

    editMessage = () => {
        this.setState({
            editMode: true
        })
    }

    saveMessage = () => {
        const newMessageObj = {
            id: this.state.messageObj.id,
            userId: localStorage.getItem("userId"),
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

    handleFriendAdd = () => {
        // console.log("handle friend add works")
        this.props.addFriend(this.props.message.userId)
        const tempFriendsIdList = this.state.friendsIdList
        tempFriendsIdList.push(this.props.message.userId)
        this.setState({
            friendsIdList: tempFriendsIdList
        })
    }

    componentDidMount() {
        // console.log("this.props", this.props)

        const tempFriendsIdList = this.props.friends.map(friend => {
            return friend.userId
        })
        // console.log("friend userId array", tempFriendsIdList)
        this.setState({
            messageObj: this.props.message,
            newMessage: this.props.message.message,
            friendsIdList: tempFriendsIdList
        })
    }

    render() {
        if (Number(this.props.message.userId) === Number(localStorage.getItem("userId")) &&
            this.state.editMode === false) {
            return (
                <div className="messagesCard align-right-msg card">
                    <Card className="messagesCard-center">
                        <span>{this.props.message.user.fullName} - {this.props.message.message}</span>
                        <p className="timestamp">{formatTimestamp(this.props.message.timestamp).split(",")[0]}<br />
                            {formatTimestamp(this.props.message.timestamp).split(",")[1]}</p>
                        <div className="msgButtonContainer">

                            <Button className="messageButton" onClick={this.editMessage}>Edit</Button>
                        </div>
                    </Card>
                </div>
            )
        } else if (Number(this.props.message.userId) === Number(localStorage.getItem("userId")) &&
            this.state.editMode === true) {
            return (
                <div className="messagesCard align-right-msg card">

                    <Card className="messagesCard-center">
                        <span>{this.props.message.user.fullName} - </span>
                        <textarea id="newMessage" onChange={this.handleFieldChange}
                            defaultValue={this.props.message.message}></textarea>
                        <p className="timestamp">{formatTimestamp(this.props.message.timestamp).split(",")[0]}<br />
                            {formatTimestamp(this.props.message.timestamp).split(",")[1]}</p>
                        <div className="msgButtonContainer">
                            <Button className="messageButton" onClick={this.saveMessage}>Save</Button>
                        </div>
                    </Card>
                </div>
            )
        } else if (!this.state.friendsIdList.includes(this.props.message.userId)) {
            return (
                <div className="messagesCard align-left-msg card">

                    <Card className="messagesCard-center">
                        <span><span className="userName" onClick={this.handleFriendAdd}>{this.props.message.user.fullName}</span> - {this.props.message.message}</span>
                        <p className="timestamp">{formatTimestamp(this.props.message.timestamp).split(",")[0]}<br />
                            {formatTimestamp(this.props.message.timestamp).split(",")[1]}</p>
                    </Card>
                </div>
            )
        } else {
            return (
                <div className="messagesCard align-left-msg card">

                    <Card className="messagesCard-center">
                        <span><span>{this.props.message.user.fullName}</span> - {this.props.message.message}</span>
                        <p className="timestamp">{formatTimestamp(this.props.message.timestamp).split(",")[0]}<br />
                            {formatTimestamp(this.props.message.timestamp).split(",")[1]}</p>
                    </Card>
                </div>
            )
        }
    }
}

export default MessageCard