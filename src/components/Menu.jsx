import React, { Component } from 'react';

function TurnInfo(props) {
  const turn   = props.turn;
  const player = props.player;

  if (turn === player) {
    return (<div className="turn-text" >Make a move..</div>)
  } else {
    return (<div className="turn-text" >Not your turn.</div>)
  }
}

export default class Menu extends Component {

  render() {
    return(
      <div className="menu">
        <TurnInfo  player={this.props.player} turn={this.props.turn} />
      </div>
    );
  }

}
