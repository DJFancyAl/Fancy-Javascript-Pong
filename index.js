window.onload = () => {
    game.setup()
}

let button = document.querySelector('button')

button.addEventListener('click', game.start)
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