import Game from './game.mjs';
document.getElementById('start-game-button').onclick = e => {
    document.getElementById('main-menu-container').style.display = 'none';

    document.getElementById('game-container').style.display = 'flex';
    window._game = new Game();
}
document.getElementById('leader-board-button').onclick = e => {
    document.getElementById('main-menu-container').style.display = 'none';

    document.getElementById('leader-board-container').style.display = 'flex';

}
document.getElementById('back-to-main-menu').onclick = e => {
    document.getElementById('main-menu-container').style.display = 'flex';

    document.getElementById('leader-board-container').style.display = 'none';

}