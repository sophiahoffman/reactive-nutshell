import React, { Component } from "react"
import TaskAPIManager from '../../modules/TaskAPIManager'
import FriendWrapper from '../friends/FriendWrapper'
import APIManager from "../../modules/APIManager"

class Login extends Component {

  // Set initial state
  state = {
    name: "",
    email: "",
    password: "",

  }

  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleRegistration = (e) => {
    e.preventDefault()

    let alreadyUsed = this.findUser
    console.log(alreadyUsed)

    if (alreadyUsed.length > 0) {
        window.alert("You have already registered. Please go to login.")
    } else {
        let authObject = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
    }
    
        APIManager.post("users", authObject)
        this.props.setUser(authObject);

        window.alert("Thank you for registering on Nutshell!")
        this.props.history.push("/");
    }



  }

  findUser = () => {
    //   if (localStorage.getItem("credentials")){
    //       let credentials = JSON.parse(localStorage.getItem("credentials"))
        let userEmail = this.state.email
        APIManager.get("users")
        .then(users => {
            return users.find(user => user.email === userEmail)
            })
            // localStorage.setItem("userId", user.id)
        }
        
        // .then(result => {
        //     if (result) {
        //         window.alert("You are already registered."
        //     }
        // })
      

  

  render() {
    return (
      <form onSubmit={this.findUser}>
        <fieldset>
            <h3>Please sign in</h3>
            <div className="formgrid">

                <label htmlFor="inputName">Name</label>
                <input onChange={this.handleFieldChange} type="text"
                        id="name"
                        placeholder="Enter your name"
                        required
                        autoFocus />
                <label htmlFor="inputEmail">Email address</label>
                <input onChange={this.handleFieldChange} type="email"
                    id="email"
                    placeholder="Enter your email address"
                    required />

                
                <label htmlFor="inputPassword">Password</label>
                <input onChange={this.handleFieldChange} type="password"
                    id="password"
                    placeholder="Enter your password"
                    required />

            </div>
            <button type="submit">
                Sign in
            </button>
        </fieldset>
      </form>
    )
  }
}


export default Login

//     // Set initial state
//     state = {
//         fullName: "",
//         email: "",
//         password: "",
//         loadingStatus: false,
//     }

//     // Update state whenever an input field is edited
//     handleFieldChange = (evt) => {
//         const stateToChange = {}
//         stateToChange[evt.target.id] = evt.target.value
//         this.setState(stateToChange)
//     }

//     // search users for existing user
//     searchUsers = (e) => {
//         TaskAPIManager.searchUser(this.state.fullName)
//             .then((existingUser) => {
//                 if (existingUser.length > 0) {
//                     {window.alert("welcome back to Nutshell!")}
//                     { this.props.setUser(existingUser[0])}
//                     { this.props.history.push("/tasks") }
//                 } else {
//                     {window.alert("welcome to Nutshell!")}
//                     this.setState({ loadingStatus: true });
//                     const user = {
//                         fullName: this.state.fullName,
//                         email: this.state.email,
//                         password: this.state.password
//                     };
//                     TaskAPIManager.post("users", user)
//                         .then(newUser => {
//                             console.log("new user", newUser)
//                             this.props.setUser(newUser)
//                             this.props.history.push("/tasks")
//                         })
//                 }
//             })
//     }

//     handleLogin = (e) => {
//         e.preventDefault()
//         /*
//             For now, just store the email and password that
//             the customer enters into local storage.
//         */
//         this.searchUsers()
//         this.props.setUser({ email: this.state.email, password: this.state.password })
//         this.props.history.push("/tasks");

//     }

//     render() {
//         return (
//             <form onSubmit={this.handleLogin}>
//                 <fieldset>
//                     <h3>Please sign in</h3>
//                     <div className="formgrid">
//                         <input onChange={this.handleFieldChange} type="text"
//                             id="fullName"
//                             placeholder="Full Name"
//                             required="" autoFocus="" />
//                         <label htmlFor="inputfullName">Full Name</label>
//                         <input onChange={this.handleFieldChange} type="email"
//                             id="email"
//                             placeholder="Email address"
//                             required="" autoFocus="" />
//                         <label htmlFor="inputEmail">Email address</label>
//                         <input onChange={this.handleFieldChange} type="password"
//                             id="password"
//                             placeholder="Password"
//                             required="" />
//                         <label htmlFor="inputPassword">Password</label>
//                     </div>
//                     <button type="submit"
//                         onClick={this.handleLogin}
//                     >
//                         Sign in
//             </button>
//                 </fieldset>
//             </form>
//         )
//     }

// }

// export default Login