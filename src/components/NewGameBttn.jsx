import React from 'react';

export default class NewGameBttn extends React.Component {
  resetClick = (props) => {
  	props.onReset();
  };

  render() {
    return (
      <button className='reset-btn' onClick={() => this.resetClick(this.props)} >New Game</button>
    )
  }

}