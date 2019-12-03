import React, { Component } from "react"
import { Card } from 'react-bootstrap'
import { formatTimestamp } from "../../modules/Utilities"
import "./Message.css"

class MessageCard extends Component {
    render() {
        return (
            <Card>
                <p>{this.props.message.user.fullName} - {this.props.message.message}</p>
                <p className="timestamp">{formatTimestamp(this.props.message.timestamp).split(",")[0]}<br />
                    {formatTimestamp(this.props.message.timestamp).split(",")[1]}</p>
            </Card>
        )
    }
}

export default MessageCard