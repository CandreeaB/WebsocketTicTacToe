export const nextTurn = (currentTurn) => {
  return (currentTurn === 'x' ? 'o' : 'x' );
};

export const getWinner = (board, turn) => {
  let moves = board.join('').replace(/ /g,'');
  let topRow = board[0] + board[1] + board[2];
  let middleRow = board[3] + board[4] + board[5];
  let bottomRow = board[6] + board[7] + board[8];
  let leftCol = board[0] + board[3] + board[6];
  let middleCol = board[1] + board[4] + board[7];
  let rightCol = board[2] + board[5] + board[8];
  let leftDiag = board[0] + board[4] + board[8];
  let rightDiag = board[2] + board[4] + board[6];

  // Check winning combinations
  if (topRow.match(/xxx|ooo/)) {
    return turn;  
  } else if (middleRow.match(/xxx|ooo/)) {
    return turn;      
  } else if (leftCol.match(/xxx|ooo/)) {
    return turn;    
  } else if (middleCol.match(/xxx|ooo/)) {
    return turn;    
  } else if (rightCol.match(/xxx|ooo/)) {
    return turn;   
  } else if (leftDiag.match(/xxx|ooo/)) {
    return turn;    
  } else if (rightDiag.match(/xxx|ooo/)) {
    return turn;   
  } else if (bottomRow.match(/xxx|ooo/)) {
    return turn;
  } else if (moves.length === 9) {
    return 'd';
  } else {
    return null;
  }
};
