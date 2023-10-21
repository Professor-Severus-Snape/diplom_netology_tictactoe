const players = ["x", "o"];
let activePlayer = 0;
let board = [];
const boardSize = 3;  // переменная хранит размер игрового поля

// функция, запускающая новую игру:
function startGame() {
  activePlayer = 0;
  createBoard(boardSize);
  renderBoard(board);
}

// функция, создающая квадратное поле любого размера:
function createBoard(boardSize) {
  board = [];
  for (let i = 0; i < boardSize; i++) {
    board.push([]);
    for (let j = 0; j < boardSize; j++) {
      board[i].push("");
    }
  }
}

// функция, обрабатывающая клик игрока:
function click(row, col) {
  board[row][col] = players[activePlayer];
  renderBoard(board);

  if (checkWinner(row, col)) {
    showWinner(activePlayer);
  } else {
    changeActivePlayer();
  }
}

// функция, проверяющая не выиграл ли игрок (поле 3*3):
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

// функция, передающая ход следующему игроку:
function changeActivePlayer() {
  if (activePlayer) {
    activePlayer = 0;
  } else {
    activePlayer = 1;
  }
}
