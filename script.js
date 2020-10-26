// module containing the state of the game
const board = (() => {

  // player who's turn it is
  let _player;

  // counts number of moves that have been played, useful for determining which player's turn it is
  let _count = 0;

  // state of the game board, initialized to empty strings so that every square is empty at the start of the game
  let _state = ['', '', '', '', '', '', '', '', ''];

  // check for a win condition, or for a tie
  const _gameOver = () => {
    
    // message to announce when game is over, not announced if empty
    let msg;

    // list of win conditions, if any of these arrays of indices are all the same symbol then that player has won
    const win = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // center column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal down
      [2, 4, 6], // diagonal up
    ];

    // if any of the win conditions has been met, assigns a string to msg announcing the winner
    win.forEach(a => {
      if (_state[a[0]] && _state[a[0]] === _state[a[1]] && _state[a[0]] === _state[a[2]]) {
        msg = _player.getName() + " wins!";
      }
    });

    // if neither player has won, but every square is filled in, assigns a string to msg announcing a tie
    if (_count === _state.length) {
      msg = "It's a tie!";
    }

    // if a string has been assigned to msg, alerts the string after rendering changes to the DOM
    if (typeof msg === 'string') {
      setTimeout(function(){alert(msg)}, 0);
    }
  }
  const getState = () => _state;
  const setState = (index) => {
    if (_state[parseInt(index)] === '') {
      if (_count % 2 === 0) {
        _player = player1;
      } else {
        _player = player2;
      }
      _state[parseInt(index)] = _player.getSymbol();
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
