// module containing the state of the game
const gameBoard = (() => {
  let _gameBoard = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
  const getState = () => _gameBoard;
  const setState = (player, index) => {
    _gameBoard[index] = player.getSymbol;
  }
  return {
    getState,
    setState
  }
})();

// module for controlling the display
const displayController = (() => {
  const render = () => {
    gameBoard.getState.forEach((value, index) => {
      const square = document.getElementById(index.toString());
      square.innerHTML = value;
    })
  }
  render();
})();

// factory for creating new players
const playerFactory = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return {
    getName,
    getSymbol
  }
};
