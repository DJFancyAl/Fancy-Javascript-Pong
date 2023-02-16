let game = {
    setup: function(){
        cancelAnimationFrame(game.start)
        console.log('test')
        gameboard.clear()
        ball.setup()
    },
    start: function(){
        requestID = requestAnimationFrame(game.start);
        gameboard.clear()
        
        ball.move()
        ball.create()
        player1.move()
        player1.create()
        player2.move()
        player2.create()
        
        if(game.stop){
            cancelAnimationFrame(requestID);
        }
    },
    stop: false
}