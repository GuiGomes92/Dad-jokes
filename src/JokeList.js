import React, { Component } from 'react'
import './JokeList.css'
import Joke from './Joke'
import JokeGenerator from './JokeGenerator'
import axios from 'axios'

class JokeList extends Component {
    constructor(props) {
        super(props)
        this.state = { jokes: [], isLoading: false, isChanging: false }
        this.generateJokes = this.generateJokes.bind(this)
        this.rank = this.rank.bind(this)
    }
    async componentDidMount() {
        let local = localStorage.getItem("jokes")
        if (local !== null) {
            this.setState({ jokes: JSON.parse(local) })
        } else {
            this.generateJokes()
        }
    }
    componentDidUpdate() {
        localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
    }
    async generateJokes() {
        let counter = 0
        this.setState({ isLoading: true })
        while (counter < 10) {
            let newJoke = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: "application/json" } })
            newJoke.ranking = 0;

            if (!this.state.jokes.map(i => i.data.id).includes(newJoke.data.id)) {
                this.setState(st => ({
                    jokes: [...st.jokes, newJoke]
                }))
                counter += 1
            }
        }
        console.log(counter)
        this.setState({ isLoading: false })
    }

    rank(id, side) {
        let { jokes } = this.state;
        let item = jokes.filter(j => j.data.id === id)
        if (side === 'up') {
            item[0].ranking += 1;
        } else {
            item[0].ranking -= 1;
        }
        let index = jokes.findIndex(i => i.data.id === item[0].data.id);
        jokes.splice(index, 1, ...item)
        jokes.sort(function (a, b) {
            let rankA = a.ranking
            let rankB = b.ranking
            if (rankA > rankB) {
                return -1;
            }
            if (rankA < rankB) {
                return 1;
            }
            return 0;
        });
        this.setState({ jokes: [...jokes], isChanging: true })
        setTimeout(() => this.setState({ isChanging: false }), 1000)
    }

    render() {
        const arrLenght = this.state.jokes.length
        return (
            <div className="JokeList-container">
                <JokeGenerator generateJokes={this.generateJokes} />
                <div className="JokeList-list">
                    {!this.state.isLoading ? this.state.jokes.map((j, index) =>
                        <Joke
                            isChanging={this.state.isChanging}
                            border={index !== arrLenght - 1}
                            key={j.data.id}
                            id={j.data.id}
                            ranking={j.ranking}
                            rank={this.rank}
                            joke={j.data.joke} />)
                        :
                        <div className="JokeList-loader"></div>}
                </div>
            </div>
        )
    }
}

export default JokeList;