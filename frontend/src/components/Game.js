import React, { Component } from "react";
import GameGrid from "./Grid";
import RoundForm from "./RoundForm";
import GameParams from "./GameParams";

const URL = 'ws://localhost:8000/ws/game'


class Game extends Component {

    state = {
        game: {status: 'P', cell_set: []}
    }

    ws = new WebSocket(URL)

    componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
            //{"action": "retrieve", "pk": 1, "request_id": 1}
            this.ws.send(JSON.stringify({"action": "retrieve", "pk": this.props.gameId, "request_id": 1}))
        }

        this.ws.onmessage = evt => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data);
            console.log(message)
            if( message.action === 'retrieve') {
                this.setState({ game: message.data });
            }
        }

        this.ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            this.setState({
            ws: new WebSocket(URL),
            })
        }
    }

    componentWillUnmount() {
        this.ws.close();
    }

    createRound = (word, numberOfCells) => {
        this.ws.send(JSON.stringify(message));

    }

    handleStart = () => {
        const message = {"action": "start_game", "pk": this.props.gameId, "request_id": 2};
        this.ws.send(JSON.stringify(message))
    }
    
    render() {
        return (
        <div className="game">
            <GameParams handleStart={this.handleStart} />
            <RoundForm />
            <GameGrid cells={this.state.game.cell_set} />
        {this.state.gameStatus}
       </div>
        )
    }

}

export default Game;