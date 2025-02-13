window.addEventListener("DOMContentLoaded", () => {
  const fieldsElement = Array.from(document.querySelectorAll(".field"));
  const currentPlayerElement = document.querySelector(".player span");
  const resetArrowElement = document.querySelector(".arrow");
  const announcer = document.querySelector(".announcer");
  let board = JSON.parse(localStorage.getItem("ticTacToeBoard")) || ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = localStorage.getItem("ticTacToePlayer") || "X";
  let isGameOn = true;
  const playerXWon = "Player X won!";
  const player0Won = "Player O won!";
  const tie = "Tie!";
  const possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  function saveGameState() {
    localStorage.setItem("ticTacToeBoard", JSON.stringify(board));
    localStorage.setItem("ticTacToePlayer", currentPlayer);
  }
  function loadGameState() {
    board.forEach((value, index) => {
      if (value) {
        fieldsElement[index].classList.add(`player${value}`);
      }
    });
    if (currentPlayerElement) {
      currentPlayerElement.textContent = currentPlayer;
    }
  }
  function updateHoverEffects() {
    fieldsElement.forEach((field) => {
      if (isValidAction(field)) {
        field.classList.remove("x-hover", "o-hover");
        field.classList.add(currentPlayer === "X" ? "x-hover" : "o-hover");
      }
    });
  }
  function resultCheck() {
    let roundFinished = false;
    for (let i = 0; i < possibleWins.length; i++) {
      const [a, b, c] = possibleWins[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        roundFinished = true;
        break;
      }
    }
    if (roundFinished) {
      announcement(currentPlayer === "X" ? playerXWon : player0Won);
      isGameOn = false;
      return;
    }
    if (!board.includes("")) {
      announcement(tie);
    }
  }
  function announcement(type) {
    if (!announcer) return;
    switch (type) {
      case player0Won:
        announcer.innerHTML = "<div class='ann'>Player O won!</div>";
        break;
      case playerXWon:
        announcer.innerHTML = "<div class='ann'>Player X won!</div>";
        break;
      case tie:
        announcer.innerHTML = "<div class='tie'>Tie!</div>";
    }
    announcer.classList.remove("hide");
  }
  function isValidAction(field) {
    return !(field.classList.contains("playerX") || field.classList.contains("playerO"));
  }
  function updateBoard(index) {
    board[index] = currentPlayer;
    saveGameState();
  }
  function changePlayer() {
    if (currentPlayerElement) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      currentPlayerElement.textContent = currentPlayer;
      saveGameState();
    }
  }
  function userAction(field, index) {
    if (isValidAction(field) && isGameOn) {
      field.classList.add(`player${currentPlayer}`);
      field.classList.remove("x-hover", "o-hover");
      updateBoard(index);
      resultCheck();
      if (isGameOn) {
        changePlayer();
        updateHoverEffects();
      }
    }
  }
  function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameOn = true;
    localStorage.removeItem("ticTacToeBoard");
    localStorage.removeItem("ticTacToePlayer");
    if (announcer) {
      announcer.textContent = "";
      announcer.classList.add("hide");
    }
    if (currentPlayer === "O") {
      changePlayer();
    }
    fieldsElement.forEach((field) => {
      field.classList.remove("playerX", "playerO", "x-hover", "o-hover");
    });
    updateHoverEffects();
  }
  fieldsElement.forEach((field, index) => {
    field.addEventListener("click", () => userAction(field, index));
  });
  if (resetArrowElement) {
    resetArrowElement.addEventListener("click", resetBoard);
  }
  loadGameState();
  updateHoverEffects();
});
//# sourceMappingURL=main.js.map
