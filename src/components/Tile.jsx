import React from 'react';

export default class Tile extends React.Component {

  tileClick = (props) => {
    if (props.gameBoard[props.loc] === ' ' && props.player === props.turn) {
      props.handleClick(props.gameBoard, props.loc, props.player, props.turn);
    }
  };

  render() {
    return (
      <div className={"tile-container " + this.props.loc + (this.props.value !== " " ? " marked" : "")}
        onClick={() => this.tileClick(this.props)}>
        <div className="tile-content">
          {this.props.value}
        </div>
      </div>
    );
  }
}