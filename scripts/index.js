// Perfrom tasks when the game is loaded
window.onload = () => {
    game.setup()
    gameboard.startMessage()
    gameboard.getScores()
    gameboard.checkScreen()
}


// Buttons
let reset = document.getElementById('reset')
let instructions = document.getElementById("instructions");
let credits = document.getElementById("credit")
let muted = document.getElementsByName('muted')[0]


//  * Title: How To Create a Modal Box * Author:(W3 Schools)) * Date: (2023) * Availability: (https://www.w3schools.com/howto/howto_css_modals.asp) * 
// Modals
let instructionModal = document.getElementById("instruction-modal");
let creditsModal = document.getElementById("credits-modal");
let screenModal = document.getElementById("screen-modal");
let closeInstruction = document.getElementsByClassName("close")[0];
let closeCredits = document.getElementsByClassName("close")[1];

// Event Listeners
window.addEventListener('resize', gameboard.checkScreen) // Checks screen size when window is changed.

instructions.addEventListener('click', () => {
    //Opens the modal
    instructionModal.style.display = "block";
})

credits.addEventListener('click', () => {
    //Opens the modal
    creditsModal.style.display = "block";
})

closeInstruction.addEventListener('click', () =>{
    // Closes the modal
    instructionModal.style.display = "none";
})

closeCredits.addEventListener('click', () =>{
    // Closes the modal
    creditsModal.style.display = "none";
})

window.addEventListener('click', (e) => {
    // Closes the modal if side is clicked
    if (e.target == instructionModal) {
        instructionModal.style.display = "none";
      }
    if (e.target == creditsModal) {
        creditsModal.style.display = "none";
      }
})


// Reset Button
reset.addEventListener('click', game.reset)

// Mute Button
muted.addEventListener('change', () => {
    if(muted.checked){
        gameboard.bounce.muted = true
        gameboard.wall.muted = true
        gameboard.point.muted = true
        gameboard.victory.muted = true
    } else {
        gameboard.bounce.muted = false
        gameboard.wall.muted = false
        gameboard.point.muted = false
        gameboard.victory.muted = false
    }
})

// Keys
window.addEventListener('keydown', e => e.preventDefault())
window.addEventListener('keyup', e => {
    if(game.started){
        return
    }

    if(e.key == ' '){
        if(!game.set){
            game.setup()
            return
        }
        game.started = true
        game.start()
    }
})