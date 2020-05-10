const playerFactory = (name, symbol) => {
  let score = 0;
  const getName = () => name;
  const getScore = () => score;
  const getSymbol = () => symbol;
  return { getName, getScore, getSymbol };
};

const playerX = playerFactory(prompt('Name of Player X: '), 'X');
const playerO = playerFactory(prompt('Name of Player O: '), 'O');

const gameBoard = (() => {
  const boardState = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
  const populateBoard = () => {
    for (let i = 0; i < boardState.length; i++) {
      let square = document.getElementById(i);
      square.innerHTML = boardState[i];
    }
  };
  populateBoard();
})();

const displayController = (() => {
  const playerXInput = document.getElementById('x');
  const playerOInput = document.getElementById('o');
  playerXInput.innerHTML = `${playerX.getName()} ${playerX.getScore()}`;
  playerOInput.innerHTML = `${playerO.getName()} ${playerO.getScore()}`;
})();
