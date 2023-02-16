let game = {
    started: false,
    set: false,
    ctx: gameboard.ctx,
    setup: function(){
        this.started = false
        gameboard.clear()
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
        this.ctx.font = "bolder 60px Arial";
        this.ctx.fillStyle = "#E67BF7";
        this.ctx.textAlign = "center";
        this.ctx.fillText("PLAYER " + player , gameboard.board.width/2, (gameboard.board.height/2) - 60)
        this.ctx.font = "bolder 60px Arial";
        this.ctx.fillText("wins the match!", gameboard.board.width/2, (gameboard.board.height/2) + 30)
        player1.currentScore = 0
        player2.currentScore = 0
        gameboard.scores[0].textContent = 0
        gameboard.scores[1].textContent = 0
    }
}