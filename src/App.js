import React, { Component } from 'react'
import socketIOClient from "socket.io-client"
import logo from './logo.svg'
import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      temperature: "Loading...",
      endpoint: `http://127.0.0.1:${process.env.PORT || 8080}`
    }
  }

  componentDidMount() {
    console.log(this.state.endpoint)
    const socket = socketIOClient(this.state.endpoint)
    socket.on("temperature", (temperature) => this.setState({
      temperature: temperature
    }))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.temperature}</p>
        </header>
      </div>
    )
  }
}

export default App
