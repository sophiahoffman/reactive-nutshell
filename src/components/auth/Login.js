import React, { Component } from "react"
import TaskAPIManager from '../../modules/TaskAPIManager'

class Login extends Component {

    // Set initial state
    state = {
        fullName: "",
        email: "",
        password: "",
        loadingStatus: false,
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // search users for existing user
    searchUsers = (e) => {
        return TaskAPIManager.searchUser(this.state.fullName)
            .then((existingUser) => {
                if (existingUser.length > 0) {
                    { window.alert("welcome back to Nutshell!") }
                    { this.props.setUser(existingUser[0]) }
                    { this.props.history.push("/tasks") }
                } else {
                    { window.alert("welcome to Nutshell!") }
                    this.setState({ loadingStatus: true });
                    const user = {
                        fullName: this.state.fullName,
                        email: this.state.email,
                        password: this.state.password
                    };
                    TaskAPIManager.post("users", user)
                        .then(newUser => {
                            console.log("new user", newUser)
                            this.props.setUser(newUser)
                            this.props.history.push("/tasks")
                        })
                }
            })
    }

    handleLogin = (e) => {
        e.preventDefault()
        /*
            For now, just store the email and password that
            the customer enters into local storage.
        */
        this.searchUsers()

    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <fieldset>
                    <h3>Please sign in</h3>
                    <div className="formgrid">
                        <input onChange={this.handleFieldChange} type="text"
                            id="fullName"
                            placeholder="Full Name"
                            required="" autoFocus="" />
                        <label htmlFor="inputfullName">Full Name</label>
                        <input onChange={this.handleFieldChange} type="email"
                            id="email"
                            placeholder="Email address"
                            required="" autoFocus="" />
                        <label htmlFor="inputEmail">Email address</label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" />
                        <label htmlFor="inputPassword">Password</label>
                    </div>
                    <button type="submit"
                        onClick={this.handleLogin}
                    >
                        Sign in
            </button>
                </fieldset>
            </form>
        )
    }

}

export default Login