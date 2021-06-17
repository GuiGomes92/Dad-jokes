import React, { Component } from 'react'
import './Joke.css'

class Joke extends Component {
    render() {
        let ranking = this.props.ranking;
        let emoji = '';
        let color = ''
        if (ranking <= 2) {
            emoji = '🙂';
            color = 'Joke-ranking-border-1';
        } else if (ranking <= 4) {
            emoji = '😄'
            color = 'Joke-ranking-border-2';
        } else if (ranking <= 6) {
            emoji = '😆'
            color = 'Joke-ranking-border-3';
        } else if (ranking <= 8) {
            emoji = '😂'
            color = 'Joke-ranking-border-4';
        } else {
            emoji = '🤣'
            color = 'Joke-ranking-border-5';
        }

        return (
            <div className={`Joke-container ${this.props.border ? 'Joke-border' : ''} ${this.props.isChanging ? 'Joke-changing' : ''}`} >
                <div className='Joke-icons'>
                    <i onClick={() => this.props.rank(this.props.id, 'up')} className="fas fa-arrow-up Joke-arrow"></i>
                    <div className={`Joke-p ${color}`}>
                        <p>{this.props.ranking}</p>
                    </div>
                    <i onClick={() => this.props.rank(this.props.id, 'down')} className="fas fa-arrow-down Joke-arrow"></i>
                </div>
                <div className="Joke-paragraph">
                    <p className="Joke-joke">{this.props.joke}</p>
                </div>
                <div className="Joke-emoji-container">
                    <p className="Joke-emoji">{emoji}</p>
                </div>
            </ div >
        )
    }
}

export default Joke