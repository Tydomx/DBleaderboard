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
    players.sort((a, b) => b.points - a.points); // sort players by points

    leaderboard.innerHTML = ""; // clear the leaderboard
    players.forEach((player, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input type="text" value="${player.name}" data-index="${index}" class="edit-name"></td>
        <td><input type="text" value="${player.points}" data-index="${index}" class="edit-points"></td>
        <td><input type="text" value="${player.ptsRem}" data-index="${index}" class="edit-pts-rem"></td>
        <td>
          <button onclick="enableEditing(${index})">Edit</button>
          <button onclick="saveChanges(${index})" style="display:none;">Save</button>
          <button onclick="removePlayer(${index})">Remove</button>
          </td>
        `;

      leaderboard.appendChild(row); // append the row to the leaderboard
    });
  }

  // Function to enable editing of points
  window.enableEditing = function (index) {
    const row = leaderboard.children[index];
    playerPointsInput.readOnly = false;
    row.querySelector("button:nth-child(1)").style.display = "none";
    row.querySelector("button:nth-child(2)").style.display = "inline";
  };

  // Function to save changes after editing points
  window.saveChanges = function (index) {
    const row = leaderboard.children[index];
    players[index].points =
      parseInt(row.querySelector(".edit-points").value) || 0;

    // Disable input after saving
    playerPointsInput.readOnly = true;

    // Toggle button visibility
    row.querySelector("button:nth-child(1)").style.display = "inline";
    row.querySelector("button:nth-child(2)").style.display = "none";

    renderLeaderboard();
  };

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
