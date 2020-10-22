// module containing the state of the game
const gameBoard = (() => {
  let gameBoard = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
  const render = () => {
    gameBoard.forEach((value, index) => {
      const square = document.getElementById(index.toString());
      square.innerHTML = value;
    })
  }
  render();
})();

// module for controlling the display
const displayController = (() => {
  // 
})();

// factory for creating new players
const playerFactory = (name) => {
  const getName = () => name;
};
