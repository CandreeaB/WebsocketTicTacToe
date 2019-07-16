import React from 'react'

function PlayerInformation(props) {
  const player = props.player;
  if (player) {
    return (
        <div className='players-container'>
          <span className="active-player">{player}</span>
          <span>vs</span>
          <span>{player === 'o' ? 'x' : 'o'}</span>
        </div>
    )
  } else {
    return null;
  }
}

export default class PlayerInfo extends React.Component {
  render() {
    return (
        <PlayerInformation player={this.props.player} />
    )
  }
}