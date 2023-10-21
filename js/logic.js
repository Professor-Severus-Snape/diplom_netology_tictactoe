const players = ["x", "o"];
let activePlayer;
let board;

function startGame() {
  activePlayer = 0;
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  renderBoard(board);
}

function click(row, col) {
  board[row][col] = players[activePlayer];
  renderBoard(board);

  if (checkWinner(row, col)) {
    showWinner(activePlayer);
  } else {
    changeActivePlayer();
  }
}

function checkWinner(row, col) {
  let flag = 0;

  if (board[row][0] === players[activePlayer] && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
    flag = 1;
  } else if (board[0][col] === players[activePlayer] && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
    flag = 1;
  } else if (board[0][0] === players[activePlayer] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    flag = 1;
  } else if (board[0][2] === players[activePlayer] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    flag = 1;
  }

  return flag;
}

function changeActivePlayer() {
  if (activePlayer) {
    activePlayer = 0;
  } else {
    activePlayer = 1;
  }
}
