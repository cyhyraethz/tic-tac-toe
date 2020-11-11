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

  // public method to reset the player's name
  const resetName = () => {
    _name = name;
  }

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
    resetName,
    setName,
  }
};



// create sample players
const player1 = Player('Player1', 'O', 'firebrick', 'player1');
const player2 = Player('Player2', 'X', 'dodgerblue', 'player2');



// module containing the state of the game
const board = (() => {
  let _difficulty; // level of AI
  let _player; // player who's turn it is
  let _mode; // game mode, singleplayer/multiplayer
  let _round = 1; // number of rounds that have been played
  let _count = 0; // number of moves that have been played, used to determine whose turn it is
  let _state = ['', '', '', '', '', '', '', '', '']; // state of the board, initialized as an empty board
  let _score = { player1: 0, player2: 0 }; // number of rounds won by each player
  const _neutralColor = "forestgreen"; // neutral color for announcing a tie
  const _win = [ // list of win conditions, indices of consecutive squares
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // center column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal down
    [2, 4, 6], // diagonal up
  ];
  
  // private method that resets the current round
  const _reset = () => {
    _count = 0;
    _state = ['', '', '', '', '', '', '', '', ''];
    display.renderState();
  }

  // private method that returns an array of the indices of all empty squares
  const _listEmptySquares = () => {
    let indices = []; // array to hold all indices of empty squares
    _state.forEach((v, i) => {
      if (v === '') {
        indices.push(i); // push all indices of empty squares to array
      }
    })
    return indices; // return the array of the indices of all empty squares
  }

  // private method that finds the best move
  const _findBestMove = () => {
    let indices = _listEmptySquares(); // array of indices of all empty squares
    let i = indices[Math.floor(Math.random() * indices.length)]; // set default move to a random empty square

    // function that checks for a winning move for a given symbol
    const checkWin = (sym) => {
      _win.forEach(a => { // check each array containing the indices of three consecutive squares
        if ([...sym].includes(_state[a[0]])) { // if the first square contains the given symbol or symbols
          if (_state[a[0]] === _state[a[1]]) { // if the first square contains the same value as the second square
            if (!_state[a[2]]) { // if the third square is empty
              i = a[2]; // the third square is the move
            }
          }
          if (_state[a[0]] === _state[a[2]]) { // if the first square contains the same value as the third square
            if (!_state[a[1]]) { // if the second square is empty
              i = a[1]; // the second square is the move
            }
          }
        }
        if ([...sym].includes(_state[a[1]])) { // if the second square contains the given symbol or symbols
          if (_state[a[1]] === _state[a[2]]) { // if the second square contains the same value as the third square
            if (!_state[a[0]]) { // if the first square is empty
              i = a[0]; // the first square is the move
            }
          }
        }
      })
    }
    
    if (_difficulty === 'unbeatable') { // takes a corner for the first move
      if (_count === 0) { // if the AI is going first
        let corner = [0, 2, 6, 8]; // array of indices of corner squares
        i = corner[Math.floor(Math.random() * corner.length)]; // play in a random corner square
      }
    }
    if (_difficulty === 'normal') { // gives equal weight to preventing a loss as to winning
      checkWin(player1.getSymbol(), player2.getSymbol()); // select move that prevents a loss or wins
    }
    if (_difficulty === 'unbeatable') { // gives greater weight to winning than preventing a loss
      checkWin(player1.getSymbol()); // select move that prevents a loss, if one exists
      checkWin(player2.getSymbol()); // select move that wins, if one exists
    }
    return i; // return the index of the square that is the best move
  }

  // private method that plays a turn for player2
  const _playAI = () => {
    setTimeout(function(){ // wait 500 ms to take AI's turn
      _player = player2;
      let i = _findBestMove();
      _state[i] = _player.getSymbol(); // AI plays in a random empty square
      _count++;
      display.renderState(); // rerender the board
      _gameOver(); // check if game is over
    }, 500)
  }

  // private method that determine's which player's turn it is
  const _setPlayer = () => {
    if (_round % 2 !== 0) { // if an even number of rounds have been played, player1 goes first
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
  }

  // private method that checks if the game is over and announces the winner, or a tie, if it is
  const _gameOver = () => {
    let msg; // message to announce if game is over
    const _result = document.getElementById('result'); // element for announcing a winner
    if (_count === _state.length) { // if every square is filled in, assign a string to msg announcing a tie
      msg = "It's a tie!";
    }
    _win.forEach(a => { // if any of the win conditions has been met, assign a string announcing the winner
      if (_state[a[0]] && _state[a[0]] === _state[a[1]] && _state[a[0]] === _state[a[2]]) {
        msg = `${_player.getName()} wins!`;
        _score[_player.getNumber()] += 1;
      }
    });
    if (typeof msg === 'string') { // if the current round is over, announce the winner and reset the board
      setTimeout(function(){
        _round++;
        setTimeout(function(){
          _reset(); // reset the board
        }, 500)
        _result.innerHTML = msg; // anounce the result of the current round
        if (msg === "It's a tie!") {
          _result.style.color = _neutralColor; // announce a tie in a neutral color
        } else {
          _result.style.color = _player.getColor(); // announce a win in the player's color
        }
        display.renderState(); // rerender the display
      }, 0);
      setTimeout(function(){
        _result.innerHTML = ''; // clear the display announcing the winner
      }, 2500)
      setTimeout(function(){
        if (_mode === 'singleplayer' && _round % 2 === 0) {
          _playAI(); // if player1 went first last time and round is over, have player2 start next round
        }
      }, 1000)
    } else if (_mode === 'singleplayer' && _player === player1) {
      _playAI(); // if player1 just went and round is not over, play a turn for player2
    }
  }
  
  // public method to set game mode to singleplayer
  const singleplayer = () => {
    _mode = 'singleplayer';
  }

  // public method to set game mode to multiplayer
  const multiplayer = () => {
    _mode = 'multiplayer';
  }

  // public method to set game mode to easy
  const easy = () => {
    _difficulty = 'easy';
  }

  // public method to set game mode to normal
  const normal = () => {
    _difficulty = 'normal';
  }

  // public method to set game mode to unbeatable
  const unbeatable = () => {
    _difficulty = 'unbeatable';
  }

  // public method to reset the state of the game
  const restart = () => {
    _round = 1;
    _count = 0;
    _state = ['', '', '', '', '', '', '', '', ''];
    _score = { player1: 0, player2: 0 };
  }

  // public method to access the current round
  const getRound = () => _round;

  // public method to access the current score
  const getScore = () => _score;

  // public method to access the state of the board
  const getState = () => _state;

  // public method that fills in an empty square with the current player's symbol
  const setState = (index) => {
    _setPlayer();
    if (_state[parseInt(index)] === '') { // checks if the selected square is empty
      if (_mode === 'multiplayer') {
        _count++; // increments the _count variable
        _state[parseInt(index)] = _player.getSymbol(); // fills in the selected square with the current player's symbol
        display.renderState(); // rerender the state of the board, round, and score
        _gameOver(); // check for a winner 
      } else if (_mode === 'singleplayer' && _player === player1) {
        _count++; // increments the _count variable
        _state[parseInt(index)] = _player.getSymbol(); // fills in the selected square with the current player's symbol
        display.renderState(); // rerender the state of the board, round, and score
        _gameOver(); // check for a winner 
      }
    }
  }

  // make public methods accessible
  return {
    singleplayer,
    multiplayer,
    easy,
    normal,
    unbeatable,
    restart,
    getRound,
    getScore,
    getState,
    setState,
  }
})();



// module for controlling the display
const display = (() => {
  // private method that replaces the display with singleplayer and multiplayer choice
  const _selectMode = () => {
    // function that starts game against an AI opponent
    const singleFunc = () => {
      board.singleplayer();
      _selectDifficulty();
    }

    // function that starts game against another player
    const multiFunc = () => {
      board.multiplayer();
      _renderDisplay();
      renderState();
    }

    // element that elements are appended to
    const display = document.getElementById('display');

    // wipes the display, removing the board
    display.innerHTML = '';

    // button that starts game against an AI opponent
    const singleButton = document.createElement('button');
    singleButton.className = 'btn';
    singleButton.onclick = singleFunc;
    singleButton.innerHTML = 'Singleplayer';
    display.appendChild(singleButton);

    // button that starts game against another player
    const multiButton = document.createElement('button');
    multiButton.className = 'btn';
    multiButton.onclick = multiFunc;
    multiButton.innerHTML = 'Multiplayer';
    display.appendChild(multiButton);
  };

  // initializes the page with buttons for player to choose singleplayer or multiplayer
  _selectMode();

  // private method that replaces the display with buttons representing difficulty settings
  _selectDifficulty = () => {
    // function that starts the game on the unbeatable difficulty setting
    const unbeatableFunc = () => {
      board.unbeatable();
      _renderDisplay();
      renderState();
    }
    
    // function that starts the game on the normal difficulty setting
    const normalFunc = () => {
      board.normal();
      _renderDisplay();
      renderState();
    }
    
    // function that starts the game on the easy difficulty setting
    const easyFunc = () => {
      board.easy();
      _renderDisplay();
      renderState();
    }

    // element that elements are appended to
    const display = document.getElementById('display');

    // wipes the display, removing the board
    display.innerHTML = '';

    // button that starts the game on the easy difficulty setting
    const easyButton = document.createElement('button');
    easyButton.className = 'btn';
    easyButton.onclick = easyFunc;
    easyButton.innerHTML = 'Easy';
    display.appendChild(easyButton);

    // button that starts the game on the normal difficulty setting
    const normalButton = document.createElement('button');
    normalButton.className = 'btn';
    normalButton.onclick = normalFunc;
    normalButton.innerHTML = 'Normal';
    display.appendChild(normalButton);

    // button that starts the game on the unbeatable difficulty setting
    const unbeatableButton = document.createElement('button');
    unbeatableButton.className = 'btn';
    unbeatableButton.onclick = unbeatableFunc;
    unbeatableButton.innerHTML = 'Unbeatable';
    display.appendChild(unbeatableButton);
  }

  // private method that renders the display, replacing buttons with board, score, round
  const _renderDisplay = () => {
    // function that restarts the game state back to single/multi player selection
    const restartFunc = () => {
      if (confirm('Restart the game (current score and round count will be lost)?')) {
        player1.resetName();
        player2.resetName();
        board.restart();
        _selectMode();
      }
    }

    // element that elements are appended to
    const display = document.getElementById('display');
    
    // wipes the display, removing initial buttons
    display.innerHTML = '';
    
    // element for announcing the winner of a round
    const result = document.createElement('div');
    result.className = 'row';
    result.id = 'result';
    display.appendChild(result);
    
    // element to add extra space below previous element, possibly replace with css
    const br = document.createElement('br');
    display.appendChild(br);
    display.appendChild(br.cloneNode(true));
    
    // element for displaying the current round
    const roundContainer = document.createElement('div');
    roundContainer.innerHTML = 'Round:';
    display.appendChild(roundContainer);
    
    // element that holds the current round number
    const round = document.createElement('div');
    round.className = 'row';
    round.id = 'round';
    roundContainer.appendChild(round);

    const restartButton = document.createElement('button');
    restartButton.innerHTML = 'Restart';
    restartButton.id = 'restart';
    restartButton.onclick = restartFunc;
    roundContainer.appendChild(restartButton);
    
    // more spacing, possibly replace with css
    display.appendChild(br.cloneNode(true));
    
    // element for displaying the current score
    const scoreContainer = document.createElement('div');
    scoreContainer.innerHTML = 'Score:';
    scoreContainer.className = 'row';
    display.appendChild(scoreContainer);
    
    // element that holds Player1's score
    const playerOneScore = document.createElement('div');
    playerOneScore.onclick = player1.setName;
    playerOneScore.id = 'playerOneScore';
    playerOneScore.className = 'row';
    scoreContainer.appendChild(playerOneScore);
    
    // element that holds Player2's score
    const playerTwoScore = document.createElement('div');
    playerTwoScore.onclick = player2.setName;
    playerTwoScore.id = 'playerTwoScore';
    playerTwoScore.className = 'row';
    scoreContainer.appendChild(playerTwoScore);
    
    // more spacing, possibly replace with css
    display.appendChild(br.cloneNode(true));
    display.appendChild(br.cloneNode(true));
    
    // element for displaying the game board
    const table = document.createElement('table');
    display.appendChild(table);

    // populates the board with 9 squares, each with unique IDs
    for (let i = 0; i < 3; i++) {
      const row = document.createElement('tr');
      table.appendChild(row);
      for (let j = 0; j < 3; j++) {
        const square = document.createElement('td');
        square.onclick = function(){board.setState(this.id)};
        square.id = (j + (i * 3));
        row.appendChild(square);
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
// // -Replace the name change prompt with a temporary input field in place 
// //     of the name on the score board.
// // -Replace the restart prompt with a custom prompt, added to and hidden
// //     from the dom, and style with CSS.
