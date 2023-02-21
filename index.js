window.onload = () => {
    game.setup()
    gameboard.getScores()
}


// Buttons
let reset = document.getElementById('reset')
let instructions = document.getElementById("instructions");
let credits = document.getElementById("credit")


//  * Title: How To Create a Modal Box * Author:(W3 Schools)) * Date: (2023) * Availability: (https://www.w3schools.com/howto/howto_css_modals.asp) * 
// Modals
let instructionModal = document.getElementById("instruction-modal");
let creditsModal = document.getElementById("credits-modal");
let closeInstruction = document.getElementsByClassName("close")[0];
let closeCredits = document.getElementsByClassName("close")[1];

// Event Listeners
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