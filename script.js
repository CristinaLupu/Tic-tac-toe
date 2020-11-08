class TicTacToe {
  //* Variables
  //? flag used to stop the click on cells
  isGameOn = true;

  player = {
    X: "X",
    O: "O",
    playerTurn: "X",
  };

  originBoard = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];

  cells = document.querySelectorAll(".cell");

  //* Methods
  //? on page load and every time the replay button is pressed
  resetProgress() {
    //? flag used for X to always start the game
    this.player.playerTurn = true;

    document.querySelector(".endgame").style.display = "none";
    this.originBoard = [
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ];
    //? remove text, color and enable the click on every cell
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].innerText = "";
      this.cells[i].style.removeProperty("background-color");
      this.cells[i].onclick = () => {
        if (this.isGameOn) {
          this.turnClick(this.cells[i]);
        }
      };
    }
  }
  //? verify if is either X or O's turn to play
  turnClick(element) {
    const matCoords = element.id.split("-");
    if (this.player.playerTurn) {
      this.player.playerTurn = false;
      //? is for the UI
      element.innerText = this.player.X;
      //? for the update of the origin board
      this.originBoard[matCoords[0]][matCoords[1]] = this.player.X;
    } else {
      this.player.playerTurn = true;
      element.innerText = this.player.O;
      this.originBoard[matCoords[0]][matCoords[1]] = this.player.O;
    }

    this.gameOver();
  }
  //? on every move checks if it s a winner or a tie
  gameOver() {
    const winner = this.checkWinner(this.originBoard);
    if (winner) {
      this.isGameOn = false;
      //? show who won
      document.querySelector(".endgame").style.display = "block";
      document.querySelector(".endgame .text").innerText =
        winner.whoWon + " wins!";
      winner.ids.forEach((id) => {
        document.getElementById(id).style.backgroundColor = "blue";
      });
    } else if (this.checkTie(this.originBoard)) {
      this.isGameOn = false;
      document.querySelector(".endgame").style.display = "block";
      document.querySelector(".endgame .text").innerText = "Draw!";
      for (let i = 0; i < this.cells.length; i++) {
        this.cells[i].style.backgroundColor = "green";
      }
    }
  }
  //? verifies the winning combos
  checkWinner(matBoard) {
    for (let i = 0; i < matBoard.length; i++) {
      //  * pentru linii
      if (
        matBoard[i][0] == matBoard[i][1] &&
        matBoard[i][0] == matBoard[i][2] &&
        matBoard[i][0] !== undefined
      ) {
        return {
          whoWon: matBoard[i][0],
          ids: [`${i}-0`, `${i}-1`, `${i}-2`],
        };
      }
      // *  pentru coloane
      else if (
        matBoard[0][i] == matBoard[1][i] &&
        matBoard[0][i] == matBoard[2][i] &&
        matBoard[0][i] !== undefined
      ) {
        return {
          whoWon: matBoard[0][i],
          ids: [`0-${i}`, `1-${i}`, `2-${i}`],
        };
      }
    }
    //*pentru diagonala principala
    if (
      matBoard[0][0] == matBoard[1][1] &&
      matBoard[0][0] == matBoard[2][2] &&
      matBoard[0][0] != undefined
    ) {
      return {
        whoWon: matBoard[0][0],
        ids: [`0-0`, `1-1`, `2-2`],
      };
    }
    //*pentru diagonala secundara

    if (
      matBoard[0][2] == matBoard[1][1] &&
      matBoard[0][2] == matBoard[2][0] &&
      matBoard[0][2] != undefined
    ) {
      return {
        whoWon: matBoard[0][2],
        ids: [`0-2`, `1-1`, `2-0`],
      };
    }
  }

  //? if in the originBoard is an undefined value then it s not a tie
  checkTie(matBoard) {
    let isTie = true;
    for (let i = 0; i < matBoard.length; i++) {
      for (let j = 0; j < matBoard[i].length; j++) {
        if (matBoard[i][j] == undefined) {
          isTie = false;
        }
      }
    }
    return isTie;
  }

  constructor() {
    this.resetProgress();
  }
}

function startGame() {
  new TicTacToe();
}

new TicTacToe();
