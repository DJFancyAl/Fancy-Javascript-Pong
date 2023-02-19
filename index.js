window.onload = () => {
    game.setup()
    gameboard.getScores()
}

let button = document.querySelector('button')

button.addEventListener('click', game.reset)

window.addEventListener('keyup', e => {
    if(game.started){
        return
    }

    if(!game.set){
        game.setup()
        return
    }

    if(e.key == ' '){
        game.start()
    }
})