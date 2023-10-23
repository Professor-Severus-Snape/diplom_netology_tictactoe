const players = ["x", "o"];
let activePlayer;
let board = [];
const boardSize = 5; // здесь можно задать размер квадрата игрового поля!
const winBlock = 4;  // здесь можно задать длину выигрышной комбинации!

// функция, запускающая новую игру:
function startGame() {
  activePlayer = 0;
  createBoard(boardSize);
  renderBoard(board);
}

// функция, создающая квадратное поле ${boardSize} размера:
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

  if (checkWinner()) {
    showWinner(activePlayer);
  } else {
    changeActivePlayer();
  }
}

// проверка выигрыша:
function checkWinner() { 
  for (let offsetX = 0; offsetX <= (boardSize - winBlock); offsetX++) { 
		for (let offsetY = 0; offsetY <= (boardSize - winBlock); offsetY++) {
      if ( checkDiagonalToRight(offsetX, offsetY) || checkDiagonalToLeft(offsetX, offsetY) || checkLines(offsetX, offsetY) ) {
        return true;
      }
		}	
	}
	return false; 
}

// проверка диагонали, идущей слева направо сверху вниз:
function checkDiagonalToRight(offsetX, offsetY) { 
  let toRight = 1;
  for (let i = offsetX; i < winBlock + offsetX; i++) {
    toRight &= (board[i][offsetY++] == players[activePlayer]);
  }
  return toRight; 
}

// проверка диагонали, идущей справо налево сверху вниз:
function checkDiagonalToLeft(offsetX, offsetY) { 
  let toLeft = 1;
  for (let i = offsetX; i < winBlock + offsetX; i++) {
    toLeft &= (board[i][winBlock + offsetX - i - 1 + offsetY] == players[activePlayer]); 
  }
  return toLeft; 
}

// проверка горизонталей и вертикалей:
function checkLines(offsetX, offsetY) { 
  let horizontal, vertical;
	for (let i = offsetX; i < winBlock + offsetX; i++) {
		horizontal = 1;
		vertical = 1;
		for (let j = offsetY; j < winBlock + offsetY; j++) {
			horizontal &= (board[i][j] == players[activePlayer]);
			vertical &= (board[j][i] == players[activePlayer]);
		}
		if (horizontal || vertical) {
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
