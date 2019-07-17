import React, { Component } from 'react';

function TurnInfo(props) {
  const turn   = props.turn;
  const player = props.player;
  const matchFound = props.matchFound;
  if (matchFound) {
    if (turn === player) {
      return (<div className="turn-text">Make a move..</div>)
    } else {
      return (<div className="turn-text">Not your turn.</div>)
    }
  } else return null
}

export default class Menu extends Component {
  render() {
    return(
      <div className="menu">
        <TurnInfo  player={this.props.player} turn={this.props.turn}  matchFound={this.props.matchFound}/>
      </div>
    );
  }

}
