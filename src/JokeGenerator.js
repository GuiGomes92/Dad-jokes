import React, { Component } from 'react'
import './JokeGenerator.css'

class JokeGenerator extends Component {
    render() {
        return (
            <div className="JokeGenerator-container">
                <h1>Dad Jokes</h1>
                <h2>&#x1F602;</h2>
                <button className="JokeGenerator-btn" onClick={this.props.generateJokes}>New Jokes</button>
            </div>
        )
    }
}

export default JokeGenerator;