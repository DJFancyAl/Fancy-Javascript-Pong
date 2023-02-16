let button = document.querySelector('button')
let scores = document.getElementsByClassName('score')
scores[0] = player1.currentScore

button.addEventListener('click', game.start)
// window.addEventListener('keydown', game.start)