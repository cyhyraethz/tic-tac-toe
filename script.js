let round = 0;
let counter = 0;
let boardState = [];
const topLeft = document.getElementById('0');
const topMiddle = document.getElementById('1');
const topRight = document.getElementById('2');
const centerLeft = document.getElementById('3');
const centerMiddle = document.getElementById('4');
const centerRight = document.getElementById('5');
const bottomLeft = document.getElementById('6');
const bottomMiddle = document.getElementById('7');
const bottomRight = document.getElementById('8');
const roundDisplay = document.getElementById('round');

const playSquare = (() => {
  for (let i = 0; i < 9; i++) {
    const square = document.getElementById(i);
    square.addEventListener('click', function () {
      if (square.innerHTML === '') {
        if (round % 2 === 0) {
          if (counter % 2 === 0) {
            square.innerHTML = 'X';
            counter++;
            render();
            playerX.winRound();
          } else if (counter % 2 !== 0) {
            square.innerHTML = 'O';
            counter++;
            render();
            playerO.winRound();
          }
        } else if (round % 2 !== 0) {
          if (counter % 2 !== 0) {
            square.innerHTML = 'X';
            counter++;
            render();
            playerX.winRound();
          } else if (counter % 2 === 0) {
            square.innerHTML = 'O';
            counter++;
            render();
            playerO.winRound();
          }
        }
      }
    });
  }
})();

const playerFactory = (name, symbol) => {
  let score = 0;
  const getName = () => name;
  const getScore = () => score;
  const getSymbol = () => symbol;
  const winRound = () => {
    if (
      (topLeft.innerHTML === symbol &&
        topMiddle.innerHTML === symbol &&
        topRight.innerHTML === symbol) ||
      (centerLeft.innerHTML === symbol &&
        centerMiddle.innerHTML === symbol &&
        centerRight.innerHTML === symbol) ||
      (bottomLeft.innerHTML === symbol &&
        bottomMiddle.innerHTML === symbol &&
        bottomRight.innerHTML === symbol) ||
      (topLeft.innerHTML === symbol &&
        centerLeft.innerHTML === symbol &&
        bottomLeft.innerHTML === symbol) ||
      (topMiddle.innerHTML === symbol &&
        centerMiddle.innerHTML === symbol &&
        bottomMiddle.innerHTML === symbol) ||
      (topRight.innerHTML === symbol &&
        centerRight.innerHTML === symbol &&
        bottomRight.innerHTML === symbol) ||
      (topLeft.innerHTML === symbol &&
        centerMiddle.innerHTML === symbol &&
        bottomRight.innerHTML === symbol) ||
      (topRight.innerHTML === symbol &&
        centerMiddle.innerHTML === symbol &&
        bottomLeft.innerHTML === symbol)
    ) {
      alert(`${name} wins this round!`);
      round++;
      score++;
      counter = 0;
      clearBoard();
      render();
    }
  };
  return { getName, getScore, getSymbol, winRound };
};

// const playerX = playerFactory(prompt('Name of Player X: '), 'X');
// const playerO = playerFactory(prompt('Name of Player O: '), 'O');
const playerX = playerFactory('Dylan', 'X');
const playerO = playerFactory('Arlo', 'O');

const clearBoard = () => {
  boardState = ['', '', '', '', '', '', '', '', ''];
  const populateBoard = () => {
    for (let i = 0; i < boardState.length; i++) {
      let square = document.getElementById(i);
      square.innerHTML = boardState[i];
    }
  };
  populateBoard();
};

const render = () => {
  const playerXScore = document.getElementById('x');
  const playerOScore = document.getElementById('o');
  playerXScore.innerHTML = `${playerX.getName()} ${playerX.getScore()}`;
  playerOScore.innerHTML = `${playerO.getName()} ${playerO.getScore()}`;
  roundDisplay.innerHTML = `<h3>Round ${round} &nbsp;&nbsp; Turn ${counter}</h3>`;
};

render();
