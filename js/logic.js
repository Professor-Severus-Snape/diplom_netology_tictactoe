const players = ["x", "o"];
let activePlayer;
let board = [];
const boardSize = 5; // размер квадрата игрового поля
const winBlock = 3;  // длина выигрышной комбинации

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

  if (checkWinner(+row, +col)) {
    showWinner(activePlayer);
  } else {
    changeActivePlayer();
  }
}

// итоговая проверка выигрыша:
function checkWinner() { 
	for (let offsetX = 0; offsetX < 3; offsetX++) { 
		for (let offsetY = 0; offsetY < 3; offsetY++) {
			if ( checkDiagonal(offsetX, offsetY) || checkLines(offsetX, offsetY) ) return true;
		}	
	}
	return false; 
}

// проверка диагоналей - нормально не работает!!!
function checkDiagonal(offsetX, offsetY) { 
  let toRight = 1, toLeft = 1;
  for (let i = offsetX; i < winBlock + offsetX; i++) {
		toRight &= (board[i][i] == players[activePlayer]);
		toLeft &= (board[winBlock + offsetX - i - 1][i] == players[activePlayer]);
	}
	// for (let i = 0; i < 3; i++) {
	// 	toRight &= (board[i][i] == players[activePlayer]);
	// 	toLeft &= (board[3-i-1][i] == players[activePlayer]);
	// }
	return (toRight || toLeft); 
}

// проверка горизонталей и вертикалей:
function checkLines(offsetX, offsetY) { 
  let horizont, vertical;
	for (let i = offsetX; i < winBlock + offsetX; i++) {
		horizont = 1;
		vertical = 1;
		for (let j = offsetY; j < winBlock + offsetY; j++) {
			horizont &= (board[i][j] == players[activePlayer]);
			vertical &= (board[j][i] == players[activePlayer]);
		}
		if (horizont || vertical) {
      return true;
    }
	}
	return false; 
}

// функция, передающая ход следующему игроку:
function changeActivePlayer() {
  if (activePlayer) {
    activePlayer = 0;
  } else {
    activePlayer = 1;
  }
}
