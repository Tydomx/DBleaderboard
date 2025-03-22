let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

function renderLeaderboard() {
  const tbody = document.getElementById("leaderboard");
  tbody.innerHTML = "";
  leaderboard.sort((a, b) => b.points - a.points);
  leaderboard.forEach((player) => {
    const row = `<tr><td>${player.name}</td><td>${player.points}</td></tr>`;
    tbody.innerHTML += row;
  });
}

function updateScore() {
  const playerName = document.getElementById("name").value.trim();
  const playerPoints = parseInt(document.getElementById("points").value, 10);
  if (!playerName || isNaN(playerPoints)) return;

  const playerIndex = leaderboard.findIndex((p) => p.name === playerName);
  if (playerIndex !== -1) {
    leaderboard[playerIndex].points = playerPoints;
  } else {
    leaderboard.push({ name: playerName, points: playerPoints });
  }

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  renderLeaderboard();
}

renderLeaderboard();
