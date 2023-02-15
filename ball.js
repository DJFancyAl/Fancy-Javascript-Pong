let ball = {
    x: 0,
    y: 0,
    d: 15,
    dy: 0,
    speed: 5,
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

        if(this.x > player2.x || this.x < player1.x){
            this.speed *= -1;
        }
    }
}

ball.setup()
ball.create()
