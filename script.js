const Board = (() => {
  const gameBoard = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
  const populateBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      let square = document.getElementById(i);
      square.innerHTML = gameBoard[i];
    }
  };
  populateBoard();
})();

const Display = (() => {
  //
})();

const Player = (name, score) => {
  const getName = () => name;
  const getScore = () => score;
};
