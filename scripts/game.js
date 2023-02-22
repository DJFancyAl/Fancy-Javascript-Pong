let game = {
    started: false,
    set: false,
    ctx: gameboard.ctx,
    setup: function(){
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
        requestID = requestAnimationFrame(game.start);
        game.started = true
        gameboard.clear()
        
        ball.move()
        ball.create()
        player1.move()
        player1.create()
        player2.move()
        player2.create()
        
        if(game.stop){
            cancelAnimationFrame(requestID);
            game.set = false
            game.started = false
        }
    },
    stop: false,
    endMatch: function(player){
        gameboard.victory.play()
        gameboard.scoreAnimation(1)
        this.ctx.font = "bolder 60px Arial";
        this.ctx.fillStyle = "#F9E3BD";
        this.ctx.textAlign = "center";
        this.ctx.fillText("PLAYER " + player , gameboard.board.width/2, (gameboard.board.height/2) - 60)
        this.ctx.font = "bolder 60px Arial";
        this.ctx.fillText("wins the match!", gameboard.board.width/2, (gameboard.board.height/2) + 30)
        player1.currentScore = 0
        player2.currentScore = 0
        gameboard.scores[0].textContent = 0
        gameboard.scores[1].textContent = 0
        gameboard.saveScores()
        ball.speed = 14
    },
    mode: 1,
    setMode: function(){
        for(let i=0; i < gameboard.modes.length; i++){
            if(gameboard.modes[i].checked){
                game.mode = gameboard.modes[i].value
                game.reset()
                ball.speed = 14
            }
        }
    },
    reset: function(){
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

for(let i=0; i < gameboard.modes.length; i++){
    gameboard.modes[i].addEventListener('click', game.setMode)
}