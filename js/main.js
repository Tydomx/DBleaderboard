document.addEventListener("DOMContentLoaded", function () {
  const leaderboard = document.getElementById("leaderboard");
  const addPlayerForm = document.getElementById("add-player-form");
  const playerNameInput = document.getElementById("player-name");
  const playerPointsInput = document.getElementById("player-points");

  // sample data for initial leaderboard
  let players = [
    { name: "Player 1", points: 10, ptsRem: 0 },
    { name: "Player 2", points: 30, ptsRem: 0 },
    { name: "Player 3", points: 50, ptsRem: 0 },
  ];

  // rendering the leaderboard
  function renderLeaderboard() {
    leaderboard.innerHTML = ""; // clear the leaderboard
    players.forEach((player, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td><input type="text" value="${player.name}" data-index="${index}" class="edit-name"></td>
        <td><input type="text" value="${player.points}" data-index="${index}" class="edit-points"></td>
        <td><input type="text" value="${player.ptsRem}" data-index="${index}" class="edit-pts-rem"></td>
        <td><button onclick="removePlayer(${index})">Remove</button></td>
        `;

      leaderboard.appendChild(row); // append the row to the leaderboard
    });
  }

  // remove player from the leaderboard
  window.removePlayer = function (index) {
    players.splice(index, 1); // remove player at given index
    renderLeaderboard(); // re-render the leaderboard
  };

  // event listener to handle the input changes (editing name/points)
  leaderboard.addEventListener("input", function (e) {
    const target = e.target;
    const index = target.dataset.index;
    if (target.classList.contains("edit-name")) {
      players[index].name = target.value;
    } else if (target.classList.contains("edit-points")) {
      players[index].points = parseInt(target.value) || 0;
    } else if (target.classList.contains("edit-pts-rem")) {
      players[index].ptsRem = parseInt(target.value) || 0; // update points remaining
    }
  });

  // eventlistener to add in new players
  addPlayerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = playerNameInput.value.trim();
    const points = parseInt(playerPointsInput.value) || 0;
    const ptsRem = 0;

    if (name) {
      players.push({ name, points, ptsRem });
      renderLeaderboard();
      playerNameInput.value = "";
      playerPointsInput.value = "";
    }
  });

  renderLeaderboard();
});
