// module containing the state of the game
const board = (() => {
  let _count = 0;
  let _state = ['', '', '', '', '', '', '', '', ''];
  const _gameOver = () => {
    if (_count === _state.length) {
      setTimeout(function(){alert('Game over!')}, 0);
    }
  }
  const getState = () => _state;
  const setState = (index) => {
    if (_state[parseInt(index)] === '') {
      if (_count % 2 === 0) {
        _state[parseInt(index)] = player1.getSymbol();
      } else {
        _state[parseInt(index)] = player2.getSymbol();
      }
      _count++;
    }
    display.render();
    _gameOver();
  }
  return {
    getState,
    setState
  }
})();

// module for controlling the display
const display = (() => {
  const render = (callback) => {
    let state = board.getState();
    for (let i = 0; i < state.length; i++) {
      let square = document.getElementById(i.toString());
      square.innerHTML = state[i];
    }
  }
  return {
    render
  }
})();

// factory for creating new players
const Player = (name, symbol) => {
  const getSymbol = () => symbol;
  const getName = () => name;
  return {
    getName,
    getSymbol
  }
};

// create sample players
const player1 = Player('Arlo', 'O');
const player2 = Player('Dylan', 'X');
