import * as utils from './utilities';

const initialState = {
  gameBoard: [
    ' ', ' ', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' '
  ],
  isWaiting: true,
  matchFound: false,
  playerDisconnect: false,
  player: null,
  winner: null,
  turn: 'x'
};

const updateObject = (oldObject, newValues) => {
  return Object.assign({}, oldObject, newValues);
};

const moveMade = (state, action) => {
  let board = state.gameBoard.map((value, index) => {
                return (index === action.move.index) ? action.move.player : value;
              });
  let turn = utils.nextTurn(state.turn);
  let winner = utils.getWinner(board, state.turn);

  if (!winner) {
      return updateObject(state, {gameBoard: board, turn: turn});
  } else {
    return updateObject(state, {
      gameBoard: board,
      winner: winner
    });

  }
};

const playerConnected = (state, action) => {
  return updateObject(state, {
    player: action.player,
    matchFound: action.player === 'o'
  });
};

const playerDisconnected = (state, action) => {
  console.log('disconnet');
  return updateObject(state, {
    playerDisconnect: true,
    matchFound: true,
  })
};

const foundMatch = (state, action) => {
  return updateObject(state, {
    matchFound: true,
    player: 'x'
  });
};

const stoppedWaiting = (state, action) => {
  return updateObject(state, {
    isWaiting: state.matchFound ? false : state.playerDisconnect
  });
};

const boardCleared = (state, action) => {
  let op = action.options;
  console.log(op, 'op');
  let player = op.didPlayerDisconnect ? null : state.player;
  return updateObject(initialState, {
    isWaiting: op.isWaiting,
    player: player,
    playerDisconnect: op.didPlayerDisconnect,
  });
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVE_MADE':           return moveMade(state, action);
    case 'PLAYER_CONNECTED':    return playerConnected(state, action);
    case 'PLAYER_DISCONNECTED': return playerDisconnected(state, action);
    case 'FOUND_MATCH':         return foundMatch(state, action);
    case 'STOPPED_WAITING':     return stoppedWaiting(state, action);
    case 'BOARD_CLEARED':       return boardCleared(state, action);
    default:                    return state;
  }
};

export default gameReducer;
