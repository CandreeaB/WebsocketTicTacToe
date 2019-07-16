import React, { Component } from 'react';
import { playerConnected, boardCleared, foundMatch, moveMade, stoppedWaiting } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Menu from "./Menu.jsx";
import Messages from "./Messages.jsx";
import PlayerInfo from "./PlayerInfo.jsx";
import Board from "../containers/board.jsx";
import io from 'socket.io-client';
import './css/index.css'


const mapStateToProps = (state) => {
  return {
    player: state.GameReducer.player,
    turn: state.GameReducer.turn,
    isWaiting: state.GameReducer.isWaiting,
    matchFound: state.GameReducer.matchFound,
    winner: state.GameReducer.winner,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    boardCleared,
    playerConnected,
    foundMatch,
    moveMade,
    stoppedWaiting
  }, dispatch);
};

class App extends Component {
  constructor(){
    super();
    this.connectionCheck = this.checkConnect;
    this.connectionMutex = true;
    this.host = document.location.hostname + ":" + document.location.port;
    this.socket = null;
  }

  clearBoard = (wait, dis, idle) => {
    this.props.boardCleared({
      isWaiting: wait,
      didPlayerDisconnect: dis,
      isPlayerIdle: idle
    })
  };

  onReset = () => {
    this.socket.emit('reset');
    this.clearBoard(false, false, false);
  };

  handleClick = (board, loc, player) => {
    let move = {
      index: loc,
      player: player,
    };

    this.props.moveMade(move);
    this.socket.emit('boardMove', move);
  };

  connectSocket = () => {
    this.socket = io(this.host);
    this.socket.on('connect', () => this.socket, this.clearBoard);

    this.socket.on('playerX', (count) => {
      this.props.playerConnected('x');
    });

    this.socket.on('playerO', (count) => {
      this.props.playerConnected('o');
      this.props.stoppedWaiting();
    });

    this.socket.on('matchFound', () => {
      console.log("match Found");
      this.props.foundMatch();
      this.props.stoppedWaiting();
    });

    this.socket.on('playerMove', (move) => {
      this.props.moveMade(move);
    });

    this.socket.on('reset', () => {
      this.clearBoard(false, false, false);
    });

    this.socket.on('playerDisconnect', () => {
      this.clearBoard(true, false, true, false);
    });
  };

  checkConnect = () => {
    console.log("checkConnect called. mutex is: ", this.connectionMutex);
    if (this.connectionMutex) {
      this.connectionMutex = false;
      this.connectSocket();
    } else {
      this.connectionCheck();
    }
  };

  componentDidMount() {
    this.connectionCheck();
  }

  render(){
    return (
        <div className='container'>
          <PlayerInfo
              player={this.props.player} />
          <Menu
              turn={this.props.turn}
              player={this.props.player} />
          <Board
              handleClick={this.handleClick}
              player={this.props.player}
              turn={this.props.turn}
          />
          <Messages
              onReset={this.onReset}
              isWaiting={this.props.isWaiting}
              matchFound={this.props.matchFound}
              player={this.props.player}
              winner={this.props.winner}
          />
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);