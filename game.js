let game = {
    setup: function(){
        cancelAnimationFrame(game.start)
        console.log('test')
        gameboard.clear()
        ball.setup()
    },
    start: function(e){
        if(e.repeat) return;

        gameboard.clear()
        
        ball.move()
        ball.create()
        player1.move()
        player1.create()
        player2.move()
        player2.create()
        
        requestAnimationFrame(game.start);
    }
}