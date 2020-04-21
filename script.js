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
  //
})();

const playerFactory = (name, score) => {
  const getName = () => name;
  const getScore = () => score;
};
