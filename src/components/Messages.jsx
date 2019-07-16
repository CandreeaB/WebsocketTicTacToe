import React, { Component } from 'react';
import NewGameBttn from './NewGameBttn.jsx';

function GetSubMessage(props) {
  const matchFound   = props.matchFound;
  const isPlayerIdle = props.isPlayerIdle;

  if (isPlayerIdle) {
    return null;
  }
  
  if (matchFound) {
    return (
      <h3 className="player-msg">
         Second player has been found
      </h3>
    )
  } else {
    return (
      <div className="player-msg">
        <div className="lds-facebook">
          <div />
          <div />
          <div />
        </div>
        <div>Waiting for your friend...</div>
      </div>
    )
  }
}


function WinnerMessage(props) {
  const winner = props.winner;

  if (winner === 'd') {
    return (
      <h3 className="winner-msg">
        It is a draw :/
      </h3>
    )
  } else {
    return (
      <h3 className="winner-msg">
        {winner} wins :)
      </h3>
    )
  }
}


function GetMessage(props) {
  const isWaiting = props.isWaiting;
  const winner = props.winner;
  const onReset = props.onReset;
  const matchFound = props.matchFound;

  if (isWaiting) {
    return (
      <aside className="content-msg">
        <GetSubMessage matchFound={matchFound} />
      </aside>
    )
  } else if (winner) {
    return (
      <aside className="content-msg">
        <h2 className="gameOver-msg">Game Over</h2>
        <WinnerMessage winner ={winner} />
        <NewGameBttn onReset={onReset} />
      </aside>
    )
  } else {
    return null
  }
}

export default class Messages extends Component {

  render() {
    return(
      <section className={"msg " + (this.props.winner || this.props.isWaiting ? "visible" : "hidden" )}>
      	<GetMessage
          player={this.props.player}
          isWaiting={this.props.isWaiting}
          matchFound={this.props.matchFound}
          onReset={this.props.onReset}
          winner={this.props.winner}
        />
      </section>
    )
  }

}