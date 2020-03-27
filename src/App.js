import React, { Component } from 'react'
import io from "socket.io-client"
import logo from './logo.svg'
import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      temperature: "Loading..."
    }
  }

  componentDidMount() {
    const socket = io.connect()
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
