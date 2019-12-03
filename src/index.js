import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Nutshell from './components/Nutshell'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router>
    {localStorage.setItem("userId", 2)}
    <Nutshell />
  </Router>
  , document.getElementById('root')
)
