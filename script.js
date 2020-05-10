let round = 0;
let counter = 0;
const roundDisplay = document.getElementById('round');
roundDisplay.innerHTML = `<h3>Round ${round} &nbsp;&nbsp;&nbsp; Turn ${counter}</h3>`;

const playerFactory = (name, symbol) => {
  const topLeft = document.getElementById('0').innerHTML;
  const topMiddle = document.getElementById('1').innerHTML;
  const topRight = document.getElementById('2').innerHTML;
  const centerLeft = document.getElementById('3').innerHTML;
  const centerMiddle = document.getElementById('4').innerHTML;
  const centerRight = document.getElementById('5').innerHTML;
  const bottomLeft = document.getElementById('6').innerHTML;
  const bottomMiddle = document.getElementById('7').innerHTML;
  const bottomRight = document.getElementById('8').innerHTML;
  let score = 0;
  const getName = () => name;
  const getScore = () => score;
  const getSymbol = () => symbol;
  const winRound = () => {
    if (topLeft === symbol && topMiddle === symbol && topRight === symbol) {
      alert('You win this round!');
      round++;
      score++;
    }
  };
  return { getName, getScore, getSymbol, winRound };
};

// const playerX = playerFactory(prompt('Name of Player X: '), 'X');
// const playerO = playerFactory(prompt('Name of Player O: '), 'O');
const playerX = playerFactory('Dylan', 'X');
const playerO = playerFactory('Arlo', 'O');

const gameBoard = (() => {
  const boardState = [];
  const populateBoard = () => {
    for (let i = 0; i < boardState.length; i++) {
      let square = document.getElementById(i);
      square.innerHTML = boardState[i];
    }
  };
  populateBoard();
})();

const displayController = (() => {
  const playerXScore = document.getElementById('x');
  const playerOScore = document.getElementById('o');
  playerXScore.innerHTML = `${playerX.getName()} ${playerX.getScore()}`;
  playerOScore.innerHTML = `${playerO.getName()} ${playerO.getScore()}`;
})();

for (let i = 0; i < 9; i++) {
  const square = document.getElementById(i);
  square.addEventListener('click', function () {
    if (square.innerHTML === '') {
      if (round % 2 === 0) {
        if (counter % 2 === 0) {
          square.innerHTML = 'X';
          playerX.winRound();
          counter++;
        } else if (counter % 2 !== 0) {
          square.innerHTML = 'O';
          playerO.winRound();
          counter++;
        }
      } else if (round % 2 !== 0) {
        if (counter % 2 !== 0) {
          square.innerHTML = 'X';
          playerX.winRound();
          counter++;
        } else if (counter % 2 === 0) {
          square.innerHTML = 'O';
          playerO.winRound();
          counter++;
        }
      }
    }
  });
}
