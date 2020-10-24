// module containing the state of the game
const board = (() => {
  let _count = 0;
  let _state = ['', '', '', '', '', '', '', '', ''];
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
  }
  return {
    getState,
    setState
  }
})();

// module for controlling the display
const display = (() => {
  const render = () => {
    let state = board.getState();
    for (let i = 0; i < state.length; i++) {
      let square = document.getElementById(i.toString());
      square.innerHTML = state[i];
    }
  }
  render();
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
