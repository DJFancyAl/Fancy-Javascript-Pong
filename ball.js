let ball = {
    x: 0, //The x location of the center of the ball
    y: 0, // The y Location of the center of the ball
    d: 15, // The diameter of the ball
    dy: 0, // The y speed of the ball
    speed: 12, // The x speed of the ball (game speed)
    ctx: gameboard.ctx,
    create: function(){
        // Draws the ball into the canvas
        let grd = this.ctx.createRadialGradient(this.x, this.y, this.d, this.x, this.y, 6);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "#E67BF7");
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.d, 0, 2 * Math.PI);
        this.ctx.fillStyle = grd;
        this.ctx.fill()
    },
    setup: function(){
        // Sets the ball to start position and sets the starting "y" speed which creates the ball angle
        this.x = gameboard.board.width/2
        this.y = gameboard.board.height/2,
        this.dy = Math.floor(Math.random() * 8) + 1;
        this.dy = Math.floor(Math.random() * 2) == 1 ? this.dy *1 : this.dy*-1;

        this.create()
    },
    move: function(){
        // Handles movement of the ball including collisions and scores
        this.x += this.speed
        this.y += this.dy

        if(this.y - this.d < 0){
            this.dy *= -1;
            gameboard.wall.play()
        }

        if(this.y + this.d > gameboard.board.height){
            this.dy *= -1;
            gameboard.wall.play()
        }

        if(this.x < player1.x + player1.w + this.d && this.y < player1.y + 25 && this.y  > (player1.y-player1.l-25)){
            this.speed *= -1;
            gameboard.bounce.play()
        }

        if(this.x > player2.x - player2.w - this.d &&  this.y < player2.y + 25 && this.y  > (player2.y-player2.l-25)){
            this.speed *= -1;
            gameboard.bounce.play()
        }

        if(this.x > gameboard.board.width){
            game.stop = true
            gameboard.point.play()
            player1.score()
        }

        if(this.x < 0){
            game.stop = true
            gameboard.point.play()
            player2.score()
        }
    }
}

