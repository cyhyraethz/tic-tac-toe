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
    _name = prompt('Enter new name (max 12 characters):').slice(0, 12) || _name;
    display.renderState();
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

  // private method that resets the board
  const _reset = () => {
    _count = 0;
    _state = ['', '', '', '', '', '', '', '', ''];
    display.renderState();
  }

  // private method that checks if the game is over and announces the winner, or a tie, if it is
  const _gameOver = () => {
    let msg; // message to announce if game is over
    const _result = document.getElementById('result'); // element for announcing a winner
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
        _result.innerHTML = msg; // anounce the result of the current round
        if (msg === "It's a tie!") {
          _result.style.color = _neutralColor; // announce a tie in a neutral color
        } else {
          _result.style.color = _player.getColor(); // announce a win in the player's color
        }
      }, 0);
      setTimeout(function(){
        _result.innerHTML = '';
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
    display.renderState(); // rerender the state of the board, round, and score
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
  // private method that initializes the page with a singleplayer and multiplayer button
  const _init = (() => {
    // function that starts game against an AI opponent
    const singleFunc = () => {
      _renderDisplay();
      renderState();
    }

    // function that starts game against another player
    const multiFunc = () => {
      _renderDisplay();
      renderState();
    }

    // element that elements are appended to
    const _display = document.getElementById('display');

    // button that starts game against an AI opponent
    const singleButton = document.createElement('button');
    singleButton.className = 'btn';
    singleButton.onclick = singleFunc;
    singleButton.innerHTML = 'Singleplayer';
    _display.appendChild(singleButton);

    // button that starts game against another player
    const multiButton = document.createElement('button');
    multiButton.className = 'btn';
    multiButton.onclick = multiFunc;
    multiButton.innerHTML = 'Multiplayer';
    _display.appendChild(multiButton);
  })();

  // private method that renders the display, replacing buttons with board, score, round
  const _renderDisplay = () => {
    // element that elements are appended to
    const _display = document.getElementById('display');
    
    // wipes the display, removing initial buttons
    _display.innerHTML = '';
    
    // element for announcing the winner of a round
    const _result = document.createElement('div');
    _result.className = 'row';
    _result.id = 'result';
    _display.appendChild(_result);
    
    // element to add extra space below previous element, possibly replace with css
    const _br = document.createElement('br');
    _display.appendChild(_br);
    _display.appendChild(_br.cloneNode(true));
    
    // element for displaying the current round
    const _roundContainer = document.createElement('div');
    _roundContainer.innerHTML = 'Round:';
    _display.appendChild(_roundContainer);
    
    // element that holds the current round number
    const _round = document.createElement('div');
    _round.className = 'row';
    _round.id = 'round';
    _roundContainer.appendChild(_round);
    
    // more spacing, possibly replace with css
    _display.appendChild(_br.cloneNode(true));
    
    // element for displaying the current score
    const _scoreContainer = document.createElement('div');
    _scoreContainer.innerHTML = 'Score:';
    _scoreContainer.className = 'row';
    _display.appendChild(_scoreContainer);
    
    // element that holds Player1's score
    const _playerOneScore = document.createElement('div');
    _playerOneScore.onclick = player1.setName;
    _playerOneScore.id = 'playerOneScore';
    _playerOneScore.className = 'row';
    _scoreContainer.appendChild(_playerOneScore);
    
    // element that holds Player2's score
    const _playerTwoScore = document.createElement('div');
    _playerTwoScore.onclick = player2.setName;
    _playerTwoScore.id = 'playerTwoScore';
    _playerTwoScore.className = 'row';
    _scoreContainer.appendChild(_playerTwoScore);
    
    // more spacing, possibly replace with css
    _display.appendChild(_br.cloneNode(true));
    _display.appendChild(_br.cloneNode(true));
    
    // element for displaying the game board
    const _table = document.createElement('table');
    _display.appendChild(_table);

    // populates the board with 9 squares, each with unique IDs
    for (let i = 0; i < 3; i++) {
      const _row = document.createElement('tr');
      _table.appendChild(_row);
      for (let j = 0; j < 3; j++) {
        const _square = document.createElement('td');
        _square.onclick = function(){board.setState(this.id)};
        _square.id = (j + (i * 3));
        _row.appendChild(_square);
      }
    }
  }
    
  // public method that renders the current state of the board, the round, and the score
  const renderState = () => {
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

  // make public methods accessible
  return {
    renderState,
  }
})();






// To do:
// // -Start game by only display two buttons, "Single Player", and "Multiplayer".
// // -Create an AI that a person can play against in "Single Player".
// // -Add a restart button that prompts the user for confirmation.
// // -When confirmed, clears the display leaving only the two original buttons, 
// //     and resets all variables, without ever reloading the web page.
// // -Replace the name change prompt with a temporary input field in place 
// //     of the name on the score board.
