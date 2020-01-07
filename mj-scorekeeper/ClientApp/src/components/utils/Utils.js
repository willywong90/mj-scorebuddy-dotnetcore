const getPlayers = (gameId) => {
    fetch('/game/new', {
        method: 'get'
    }).then((response) => response.text())
    .then((data) => {
    });
};

export default Game;
