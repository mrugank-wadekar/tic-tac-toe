//Game obj which stores board array
const game = {
  board: [-1, -1, -1, -1, -1, -1, -1, -1, -1],

  checkWinner: function (curr_index) {
    curr_index = parseInt(curr_index);
    switch (curr_index) {
      case 0:
        if (this.board[0] == this.board[3] && this.board[3] == this.board[6]) {
          return [true, 0, 3, 6];
        } else if (
          this.board[0] == this.board[1] &&
          this.board[1] == this.board[2]
        ) {
          return [true, 0, 1, 2];
        } else if (
          this.board[0] == this.board[4] &&
          this.board[4] == this.board[8]
        ) {
          return [true, 0, 4, 8];
        }
        return false;

      case 1:
        if (this.board[0] == this.board[1] && this.board[1] == this.board[2]) {
          return [true, 0, 1, 2];
        } else if (
          this.board[1] == this.board[4] &&
          this.board[4] == this.board[7]
        ) {
          return [true, 1, 4, 7];
        }
        return false;

      case 2:
        if (this.board[2] == this.board[1] && this.board[1] == this.board[0]) {
          return [true, 0, 1, 2];
        } else if (
          this.board[2] == this.board[5] &&
          this.board[5] == this.board[8]
        ) {
          return [true, 2, 5, 8];
        } else if (
          this.board[2] == this.board[4] &&
          this.board[4] == this.board[6]
        ) {
          return [true, 2, 4, 6];
        }
        return false;

      case 3:
        if (this.board[0] == this.board[3] && this.board[3] == this.board[6]) {
          return [true, 0, 3, 6];
        } else if (
          this.board[3] == this.board[4] &&
          this.board[4] == this.board[5]
        ) {
          return [true, 3, 4, 5];
        }
        return false;

      case 4:
        if (this.board[0] == this.board[4] && this.board[4] == this.board[8]) {
          return [true, 0, 4, 8];
        } else if (
          this.board[2] == this.board[4] &&
          this.board[4] == this.board[6]
        ) {
          return [true, 2, 4, 6];
        } else if (
          this.board[1] == this.board[4] &&
          this.board[4] == this.board[7]
        ) {
          return [true, 1, 4, 7];
        } else if (
          this.board[3] == this.board[4] &&
          this.board[4] == this.board[5]
        ) {
          return [true, 3, 4, 5];
        }
        return false;

      case 5:
        if (this.board[2] == this.board[5] && this.board[5] == this.board[8]) {
          return [true, 2, 5, 8];
        } else if (
          this.board[5] == this.board[4] &&
          this.board[4] == this.board[3]
        ) {
          return [true, 3, 4, 5];
        }
        return false;

      case 6:
        //console.log("case 6");
        if (this.board[6] == this.board[7] && this.board[7] == this.board[8]) {
          return [true, 6, 7, 8];
        } else if (
          this.board[6] == this.board[3] &&
          this.board[3] == this.board[0]
        ) {
          return [true, 6, 3, 0];
        } else if (
          this.board[6] == this.board[4] &&
          this.board[4] == this.board[2]
        ) {
          return [true, 6, 4, 2];
        }
        return false;

        break;

      case 7:
        //console.log("case 7");
        if (this.board[6] == this.board[7] && this.board[7] == this.board[8]) {
          return [true, 6, 7, 8];
        } else if (
          this.board[7] == this.board[4] &&
          this.board[4] == this.board[1]
        ) {
          return [true, 7, 4, 1];
        }
        return false;

        break;

      case 8:
        //console.log("case 8");
        if (this.board[8] == this.board[7] && this.board[7] == this.board[6]) {
          return [true, 8, 7, 6];
        } else if (
          this.board[8] == this.board[5] &&
          this.board[5] == this.board[2]
        ) {
          return [true, 8, 5, 2];
        } else if (
          this.board[8] == this.board[4] &&
          this.board[4] == this.board[0]
        ) {
          return [true, 8, 4, 0];
        }
        return false;

        break;

      default:
        console.log("No matching case found");
        break;
    }
  },
  checkDraw: function () {
    if (!this.board.includes(-1)) {
      return true;
    } else {
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

const result = document.querySelector(".result");



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

        let winCells = game.checkWinner(curr_index);

        if (winCells) {
          //const cells = document.querySelectorAll(".cell");
          const cell1 = document.querySelector(`[data-cell="${winCells[1]}"]`);
          const cell2 = document.querySelector(`[data-cell="${winCells[2]}"]`);
          const cell3 = document.querySelector(`[data-cell="${winCells[3]}"]`);

          cell1.style.backgroundColor = "rgb(54, 218, 54)";
          cell2.style.backgroundColor = "rgb(54, 218, 54)";
          cell3.style.backgroundColor = "rgb(54, 218, 54)";

          console.log(currentPlayer.getName() + " wins!");
          result.textContent += " " + currentPlayer.getName() + " wins!";

          return;
        } else if (game.checkDraw()) {
          //console.log(" It's a draw!");
          result.textContent += " It's a draw!";
          return;
        }

        // Switch to the next player's turn
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
      }
    });
  });
};

//Replay function
const replay = document.querySelector(".replay");
replay.addEventListener("click", function replayGame() {
  //Reset Array
  game.board.fill(-1);

  //Update Display
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "white";
  });
  result.textContent = "Winner : ";
});


const p1 = Player("Player 1", "X");
const p2 = Player("Player 2", "O");

playRound([p1, p2]);
