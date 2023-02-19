let gameboard = {
    board: document.querySelector('canvas'), // Gets the canvas element
    ctx: '', // The cavas context - used for drawing.
    clear: function(){
        // Clears the canvas
        this.ctx.clearRect(0, 0, this.board.width, this.board.height)
    },
    scores: document.getElementsByClassName('score'), // Gets the 'score' elements. Used for updating the score.
    resetScores: function(){
        for(let i=0; i < this.scores.length; i++){
            this.scores[i].textContent = 0
        }
    },
    modes: document.getElementsByName('mode'), // Gets the 'mode' elements. Used for selecting game mode.
}

gameboard.ctx = gameboard.board.getContext('2d')

gameboard.resetScores()