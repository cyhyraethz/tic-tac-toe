// module containing the state of the game
const board = (() => {
  let _state = ['', '', '', '', '', '', '', '', ''];
  const getState = () => _state;
  const setState = (player, index) => {
    _state[index] = player.getSymbol();
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
  const getName = () => name;
  const getSymbol = () => symbol;
  return {
    getName,
    getSymbol
  }
};

// create sample players
const arlo = Player('Arlo', 'O');
const dylan = Player('Dylan', 'X');

board.setState(dylan, 0);
display.render();
