//Game obj which stores board array
const game = {
  board: [-1, -1, -1, -1, -1, -1, -1, -1, -1],

  checkWinner: function (curr_index, pSign) {
    curr_index = parseInt(curr_index);
    //console.log(this.board);
    switch (curr_index) {
      case 0:
        //console.log("case 0");
        if (this.board[0] == this.board[3] && this.board[3] == this.board[6]) {
          return true;
        } else if (
          this.board[0] == this.board[1] &&
          this.board[1] == this.board[2]
        ) {
          return true;
        } else if (
          this.board[0] == this.board[4] &&
          this.board[4] == this.board[8]
        ) {
          return true;
        }
        break;

      case 1:
        //console.log("case 1");
        if (this.board[0] == this.board[1] && this.board[1] == this.board[2]) {
          return true;
        } else if (
          this.board[1] == this.board[4] &&
          this.board[4] == this.board[7]
        ) {
          return true;
        }
        break;

      case 2:
        //console.log("case 2");
        if (this.board[2] == this.board[1] && this.board[1] == this.board[0]) {
          return true;
        } else if (
          this.board[2] == this.board[5] &&
          this.board[5] == this.board[8]
        ) {
          return true;
        } else if (
          this.board[2] == this.board[4] &&
          this.board[4] == this.board[6]
        ) {
          return true;
        }
        break;

      case 3:
        //console.log("case 3");
        if (this.board[0] == this.board[3] && this.board[3] == this.board[6]) {
          return true;
        } else if (
          this.board[3] == this.board[4] &&
          this.board[4] == this.board[5]
        ) {
          return true;
        }
        break;

      case 4:
        //console.log("case 4");
        if (this.board[0] == this.board[4] && this.board[4] == this.board[8]) {
          return true;
        } else if (
          this.board[2] == this.board[4] &&
          this.board[4] == this.board[6]
        ) {
          return true;
        } else if (
          this.board[1] == this.board[4] &&
          this.board[4] == this.board[7]
        ) {
          return true;
        } else if (
          this.board[3] == this.board[4] &&
          this.board[4] == this.board[5]
        ) {
          return true;
        }
        break;

      case 5:
        //console.log("case 5");
        if (this.board[2] == this.board[5] && this.board[5] == this.board[8]) {
          return true;
        } else if (
          this.board[5] == this.board[4] &&
          this.board[4] == this.board[3]
        ) {
          return true;
        }
        break;

      case 6:
        //console.log("case 6");
        if (this.board[6] == this.board[7] && this.board[7] == this.board[8]) {
          return true;
        } else if (
          this.board[6] == this.board[3] &&
          this.board[3] == this.board[0]
        ) {
          return true;
        } else if (
          this.board[6] == this.board[4] &&
          this.board[4] == this.board[2]
        ) {
          return true;
        }
        break;

      case 7:
        //console.log("case 7");
        if (this.board[6] == this.board[7] && this.board[7] == this.board[8]) {
          return true;
        } else if (
          this.board[7] == this.board[4] &&
          this.board[4] == this.board[1]
        ) {
          return true;
        }
        break;

      case 8:
        //console.log("case 8");
        if (this.board[8] == this.board[7] && this.board[7] == this.board[6]) {
          return true;
        } else if (
          this.board[8] == this.board[5] &&
          this.board[5] == this.board[2]
        ) {
          return true;
        } else if (
          this.board[8] == this.board[4] &&
          this.board[4] == this.board[0]
        ) {
          return true;
        }
        break;

      default:
        console.log("No matching case found");
        break;
    }
  },
  checkDraw: function () {
    if (!this.board.includes(-1)) {
      return true;
    } 
    else {
      return false;
    }
  },
};

//sets the data-cell attributes in html to respective index
//in the array
//IIFE
(function () {
  let i = 0;
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.setAttribute("data-cell", i);
    i++;
  });
})();


//Player Factory
const Player = (pName, pSign) => {
  const getName = () => {
    return pName;
  };

  const getSign = () => {
    return pSign;
  };

  return { getName, getSign };
};

const result =document.querySelector('.result');

const p1 = Player("Player 1", "X");
const p2 = Player("Player 2", "O");

const playRound = (players) => {
  console.log("Round begins");

  // Define a variable to keep track of the player's turn
  let currentPlayer = players[0];

  // Add a click event listener to each cell
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", function markCell() {
      // Check if the clicked cell is empty
      if (game.board[cell.getAttribute("data-cell")] === -1) {
        // Mark the cell with the current player's sign
        game.board[cell.getAttribute("data-cell")] = currentPlayer.getSign();
        cell.textContent = game.board[cell.getAttribute("data-cell")];

        let curr_index = cell.getAttribute("data-cell");

        // Check if the game is over
        if (game.checkWinner(curr_index, currentPlayer.getSign())) {
          //console.log(currentPlayer.getName() + " wins!");
          result.textContent+=" "+ currentPlayer.getName() + " wins!";

          return;
        } else if (game.checkDraw()) {
          //console.log(" It's a draw!");
          result.textContent+=" It's a draw!";
          return;
        }

        // Switch to the next player's turn
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
      }
    });
  });
};

//Replay function
const replay =document.querySelector('.replay');
replay.addEventListener("click",function replayGame(){
    //Reset Array
    game.board.fill(-1);

    //Update Display
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell=>{
        cell.textContent="";
    })
    result.textContent="Winner : ";
})

playRound([p1, p2]);
