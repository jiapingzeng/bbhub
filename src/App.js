import React, { Component } from 'react'
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
    window.alert("started")
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
