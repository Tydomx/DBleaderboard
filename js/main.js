document.addEventListener("DOMContentLoaded", function () {
  const leaderboard = document.getElementById("leaderboard");

  // sample data
  let players = [
    { name: "Player 1", score: 10 },
    { name: "Player 2", score: 30 },
    { name: "Player 3", score: 50 },
  ];

  function renderLeaderboard() {
    leaderboard.innerHTML = "";
    players.forEach((player, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td><input type="text" value="${player.name}" data-index="${index}" class="edit-name"></td>
        <td><input type="text" value="${player.points}" data-index="${index}" class="edit-points"></td>
        <td><button onclick="removePlayer(${index})">Remove</button></td>
        `;

      leaderboard.appendChild(row);
    });
  }

  window.removePlayer = function (index) {
    players.splice(index, 1);
    renderLeaderboard();
  };

  leaderboard.addEventListener("input", function (e) {
    const target = e.target;
    const index = target.dataset.index;
    if (target.classList.contains("edit-name")) {
      players[index].name = target.value;
    } else if (target.classList.contains("edit-points")) {
      players[index].points = parseInt(target.value) || 0;
    }
  });

  renderLeaderboard();
});
