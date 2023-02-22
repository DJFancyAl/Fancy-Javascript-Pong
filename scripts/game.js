let game = {
    started: false, // Tells if gameplay is active (used to control key event handlers)
    set: false, // Tells if the board is set
    ctx: gameboard.ctx,
    setup: function(){
        // Sets up for a new point
        this.started = false
        gameboard.clear()
        gameboard.setBackground()
        ball.setup()
        player1.setUp()
        player2.setUp()
        this.stop = false
        this.set = true
    },
    start: function(){
        // Starts the game and handles rendering
        requestID = requestAnimationFrame(game.start);
        gameboard.clear()
        
        ball.move()
        ball.create()
        player1.move()
        player1.create()
        player2.move()
        player2.create()
        
        if(game.stop){
            // Stops the loop if a point is scored
            cancelAnimationFrame(requestID);
            game.set = false
            game.started = false
        }
    },
    stop: false, // Tells if the game is stopped (used to stop the animation loop)
    endMatch: function(player){
        // Performs the actions when a match is completed.
        gameboard.victory.play()
        gameboard.scoreAnimation(1)
        this.ctx.font = "bolder 60px Tahoma";
        this.ctx.fillStyle = "#F9E3BD";
        this.ctx.textAlign = "center";
        this.ctx.fillText("PLAYER " + player , gameboard.board.width/2, (gameboard.board.height/2) - 60)
        this.ctx.font = "bolder 60px Tahoma";
        this.ctx.fillText("wins the match!", gameboard.board.width/2, (gameboard.board.height/2) + 30)
        this.ctx.fillStyle = "#E67BF7";
        this.ctx.font = "bolder 30px Tahoma";
        this.ctx.fillText("Press space to play another.", gameboard.board.width/2, (gameboard.board.height/2) + 00)
        player1.currentScore = 0
        player2.currentScore = 0
        gameboard.scores[0].textContent = 0
        gameboard.scores[1].textContent = 0
        gameboard.saveScores()
        ball.speed = 14
    },
    mode: 1, // Stores the game mode ("One Player" vs. "Two Player")
    setMode: function(){
        // Gets the selected game mode and sets the variable above.
        for(let i=0; i < gameboard.modes.length; i++){
            if(gameboard.modes[i].checked){
                game.mode = gameboard.modes[i].value
                game.reset()
                ball.speed = 14
            }
        }
    },
    reset: function(){
        // Performs actions to reset the entire gameboard.
        player1.currentScore = 0
        player2.currentScore = 0
        player1.matchScore = 0
        player2.matchScore = 0
        gameboard.resetScores()
        gameboard.saveScores()
        game.setup()
        ball.speed = 14
        gameboard.startMessage()
    }
}

// Event listeners for the mode radio buttons.
for(let i=0; i < gameboard.modes.length; i++){
    gameboard.modes[i].addEventListener('click', game.setMode)
}