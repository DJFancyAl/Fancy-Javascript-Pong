let game = {
    render: function(){
        ball.start()
    },
    start: function(){
        gameboard.clear()

        ball.x += ball.speed
        ball.y += ball.dy

        if(ball.y - ball.d < 0){
            ball.dy *= -1;
        }

        if(ball.y + ball.d > gameboard.board.height){
            ball.dy *= -1;
        }
        
        ball.create()
        player1.move()
        player1.create()
        requestAnimationFrame(game.start);
    }
}