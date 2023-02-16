let ball = {
    x: 0,
    y: 0,
    d: 15,
    dy: 0,
    speed: 8,
    ctx: gameboard.ctx,
    create: function(){
        let grd = this.ctx.createRadialGradient(this.x, this.y, this.d, this.x, this.y, 6);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "#E67BF7");
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.d, 0, 2 * Math.PI);
        this.ctx.fillStyle = grd;
        this.ctx.fill()
    },
    setup: function(){
        this.x = gameboard.board.width/2
        this.y = gameboard.board.height/2,
        this.dy = Math.floor(Math.random() * 8) + 1;
        this.dy = Math.floor(Math.random() * 2) == 1 ? this.dy *1 : this.dy*-1;
    },
    move: function(){
        this.x += this.speed
        this.y += this.dy

        if(this.y - this.d < 0){
            this.dy *= -1;
        }

        if(this.y + this.d > gameboard.board.height){
            this.dy *= -1;
        }

        if(this.x < player1.x + player1.w + (this.d/2) && this.y < player1.y + 25 && this.y  > (player1.y-player1.l-25)){
            this.speed *= -1;
        }

        if(this.x > player2.x - player2.w - (this.d/2) &&  this.y < player2.y + 25 && this.y  > (player2.y-player2.l-25)){
            this.speed *= -1;
        }

        if(this.x > gameboard.board.width){
            game.stop = true
            player1.score()
        }

        if(this.x < 0){
            game.stop = true
            player2.score()
        }
    }
}

ball.setup()
ball.create()
