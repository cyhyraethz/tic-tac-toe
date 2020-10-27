// module containing the state of the game
const board = (() => {
  let _player; // player who's turn it is
  let _count = 0; // number of moves that have been played, used to determine whose turn it is
  let _state = ['', '', '', '', '', '', '', '', '']; // state of the board, initialized as an empty board
  let _score = [0, 0]; // number of rounds won by each player

  // private method that resets the board
  const _reset = () => {
    _count = 0;
    _state = ['', '', '', '', '', '', '', '', ''];
    display.render();
  }

  // private method that checks if the game is over and announces the winner, or a tie, if it is
  const _gameOver = () => {
    let msg; // message to announce if game is over
    // list of win conditions, indices of consecutive squares
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
    // if any of the win conditions has been met, assign a string announcing the winner
    win.forEach(a => {
      if (_state[a[0]] && _state[a[0]] === _state[a[1]] && _state[a[0]] === _state[a[2]]) {
        msg = _player.getName() + " wins!";
      }
    });
    // if every square is filled in, assign a string to msg announcing a tie
    if (_count === _state.length) {
      msg = "It's a tie!";
    }
    // if the current round is over, announce the winner and reset the board
    if (typeof msg === 'string') {
      setTimeout(function(){
        alert(msg); // anounce the winner
        _reset(); // reset the board
      }, 0);
    }
  }

  // public method that returns the state of the board
  const getState = () => _state;

  // public method that fills in an empty square with the current player's symbol
  const setState = (index) => {
    if (_state[parseInt(index)] === '') { // checks if the selected square is empty
      if (_count % 2 === 0) {
        _player = player1; // if an even number of moves have been played, it's player1's turn
      } else {
        _player = player2; // if an odd number of moves have been played, it's player2's turn
      }
      _state[parseInt(index)] = _player.getSymbol(); // fills in the selected square with the current player's symbol
      _count++; // increments the _count variable
    }
    display.render(); // rerender the display
    _gameOver(); // check for a winner
  }

  // make public methods accessible
  return {
    getState,
    setState
  }
})();



// module for controlling the display
const display = (() => {
  // public method to render the current state of the board
  const render = () => {
    let state = board.getState();
    for (let i = 0; i < state.length; i++) {
      let square = document.getElementById(i.toString());
      square.innerHTML = state[i];
    }
  }

  // make public methods accessible
  return {
    render
  }
})();



// factory for creating new players
const Player = (name, symbol) => {
  // public method to access the player's symbol
  const getSymbol = () => symbol;

  // public method to access the player's name
  const getName = () => name;

  // make public methods accessible
  return {
    getName,
    getSymbol
  }
};



// create sample players
const player1 = Player('Arlo', 'O');
const player2 = Player('Dylan', 'X');
