// factory for creating new players
const Player = (name, symbol, color, number) => {
  let _name = name; // player's name

  // public method to access the player's name
  const getName = () => _name;
  
  // public method to access the player's symbol
  const getSymbol = () => symbol;

  // public method to access the player's color
  const getColor = () => color;

  // public method to access the player's number
  const getNumber = () => number;

  // public method to set the player's name
  const setName = () => {
    _name = prompt('Enter new name:');
    display.render();
  }

  // make public methods accessible
  return {
    getName,
    getSymbol,
    getColor,
    getNumber,
    setName,
  }
};



// create sample players
const player1 = Player('Player1', 'O', 'firebrick', 'player1');
const player2 = Player('Player2', 'X', 'dodgerblue', 'player2');



// module containing the state of the game
const board = (() => {
  let _player; // player who's turn it is
  let _round = 1; // number of rounds that have been played
  let _count = 0; // number of moves that have been played, used to determine whose turn it is
  let _state = ['', '', '', '', '', '', '', '', '']; // state of the board, initialized as an empty board
  let _score = { player1: 0, player2: 0 }; // number of rounds won by each player
  const _neutralColor = "forestgreen"; // neutral color for announcing a tie
  const _result = document.getElementById('result'); // dom element for announcing a winner

  // private method that resets the board
  const _reset = () => {
    _count = 0;
    _state = ['', '', '', '', '', '', '', '', ''];
    display.render();
  }

  // private method that checks if the game is over and announces the winner, or a tie, if it is
  const _gameOver = () => {
    let msg; // message to announce if game is over
    const win = [ // list of win conditions, indices of consecutive squares
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // center column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal down
      [2, 4, 6], // diagonal up
    ];
    win.forEach(a => { // if any of the win conditions has been met, assign a string announcing the winner
      if (_state[a[0]] && _state[a[0]] === _state[a[1]] && _state[a[0]] === _state[a[2]]) {
        msg = `${_player.getName()} wins round ${_round}!`;
        _score[_player.getNumber()] += 1;
      }
    });
    if (_count === _state.length) { // if every square is filled in, assign a string to msg announcing a tie
      msg = "It's a tie!";
    }
    if (typeof msg === 'string') { // if the current round is over, announce the winner and reset the board
      setTimeout(function(){
        _round++;
        _reset(); // reset the board
        result.innerHTML = msg; // anounce the result of the current round
        if (msg === "It's a tie!") {
          _result.style.color = _neutralColor; // announce a tie in a neutral color
        } else {
          result.style.color = _player.getColor(); // announce a win in the player's color
        }
      }, 0);
      setTimeout(function(){
        result.innerHTML = '';
      }, 2500)
    }
  }

  // public method to access the current round
  const getRound = () => _round;

  // public method to access the current score
  const getScore = () => _score;

  // public method to access the state of the board
  const getState = () => _state;

  // public method that fills in an empty square with the current player's symbol
  const setState = (index) => {
    if (_state[parseInt(index)] === '') { // checks if the selected square is empty
      if (_round % 2 === 0) { // if an even number of rounds have been played, player1 goes first
        if (_count % 2 === 0) {
          _player = player1; // if an even number of moves have been played, it's player1's turn
        } else {
          _player = player2; // if an odd number of moves have been played, it's player2's turn
        }
      } else { // if an odd number of rounds have been played, player2 goes first
        if (_count % 2 === 0) {
          _player = player2; // if an even number of moves have been played, it's player2's turn
        } else {
          _player = player1; // if an odd number of moves have been played, it's player1's turn
        }
      }
      _state[parseInt(index)] = _player.getSymbol(); // fills in the selected square with the current player's symbol
      _count++; // increments the _count variable
    }
    display.render(); // rerender the display
    _gameOver(); // check for a winner
  }

  // make public methods accessible
  return {
    getRound,
    getScore,
    getState,
    setState,
  }
})();



// module for controlling the display
const display = (() => {
  // public method that renders the current state of the board, the round, and the score
  const render = () => {
    const state = board.getState(); // state of the board
    const round = document.getElementById('round'); // element that displays the current round
    const playerOneScore = document.getElementById('playerOneScore'); // element that displays player1's score
    const playerTwoScore = document.getElementById('playerTwoScore'); // element that displays player2's score
    round.innerHTML = board.getRound(); // display the current round
    playerOneScore.innerHTML = player1.getName() + " " + board.getScore().player1; // display player1's score
    playerTwoScore.innerHTML = player2.getName() + " " + board.getScore().player2; // display player2's score
    playerOneScore.style.color = player1.getColor(); // show player1's score in their specific color
    playerTwoScore.style.color = player2.getColor(); // show player2's score in their specific color
    for (let i = 0; i < state.length; i++) { // iterates over the state array and the grid squares
      const square = document.getElementById(i.toString()); // grid square corresponding to the current state value
      square.innerHTML = state[i]; // display the current state value
      if (state[i] === 'O') {
        square.style.color = player1.getColor(); // if current state value is an O, show it in player1's color
      } else if (state[i] === 'X') {
        square.style.color = player2.getColor(); // if current state value is an X, show it in player2's color
      }
    }
  }

  // render the initial state of the board
  render();

  // make public methods accessible
  return {
    render,
  }
})();
