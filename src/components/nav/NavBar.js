import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"
import NavBarBS from 'react-bootstrap/NavBar'

class NavBar extends Component {

    render() {

        // console.log(this.props.user)
        if (this.props.user) {
            return (
                <NavBarBS sticky="top" className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
                    <span><ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className="nav-link" to="/articles">Articles</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/friends">Friends</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/messages">Messages</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tasks">Tasks</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/events">Events</Link>
                        </li>
                    </ul></span>
                    <span className="navbar-text">
                        <ul className="nav nav-pills nav-fill">
                            <li className="nav-item">
                                <span className="nav-link logout" to="/login" onClick={this.props.clearUser}>Log Out</span>
                            </li>
                        </ul>
                    </span>
                </NavBarBS>
            )
        } else {
            return (
                <NavBarBS sticky="top" className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">

                    <span><ul className="nav nav-pills nav-fill login">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Log In</Link>
                        </li>
                    </ul></span>
                </NavBarBS>
            )
        }
    }
}

export default NavBar
