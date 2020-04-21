const gameBoard = (() => {
  let gameBoard = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
  const populateBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      let square = document.getElementById(i);
      square.innerHTML = gameBoard[i];
    }
  };
  populateBoard();
})();

const displayController = (() => {
  //
})();

const playerFactory = (name, score) => {
  const getName = () => name;
  const getScore = () => score;
};
