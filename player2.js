let player2 = {
    w: 0,
    l: 0,
    x: 0,
    y: 0,
    s: 0,
    ctx: gameboard.ctx,
    create: function(){
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.w,0,Math.PI);
        this.ctx.arc(this.x,this.y-this.l,this.w,Math.PI, 0);
        this.ctx.lineTo(this.x + this.w, this.y);
        this.ctx.stroke();
        this.ctx.fillStyle = "pink";
        this.ctx.fill()
    },
    direction: null,
    move: function(){
        if(game.mode == 1){
            if(this.y > ball.y + 80){
                this.direction = 'up'
            } else if(this.y < ball.y - 80) {
                this.direction = 'down'
            }
        }

        if(this.direction  == 'up' && this.y > (this.l + this.w + 5)){
            this.y -= this.s;
        }
        if(this.direction  == 'down' && this.y < (gameboard.board.height - this.w - 5)){
            this.y += this.s;
        }
    },
    currentScore: 0,
    matchScore: 0,
    score: function(){
        this.currentScore += 1
        gameboard.scores[1].textContent = this.currentScore

        if(this.currentScore > player1.currentScore){
            ball.speed -= 3
        }

        if(this.currentScore == 5){
            this.matchScore += 1
            game.endMatch(2)
            gameboard.scores[3].textContent = this.matchScore
            return
        }

        this.ctx.font = "bolder 60px Arial";
        this.ctx.fillStyle = "#E67BF7";
        this.ctx.textAlign = "center";
        this.ctx.fillText("PLAYER 2 SCORES!", gameboard.board.width/2, (gameboard.board.height/2) - 60)
        this.ctx.font = "bolder 50px Arial";
        this.ctx.fillText(player1.currentScore + " - " + player2.currentScore, gameboard.board.width/2, (gameboard.board.height/2) + 30)
    },
    setUp: function(){
        this.w = 10,
        this.l = 120,
        this.x = gameboard.board.width - 20,
        this.y = (gameboard.board.height/2) + 60,
        this.s = 10,

        this.create()
    }
}

window.addEventListener('keydown', (e) => {
    if(game.mode == 2 && e.key == "ArrowUp"){
        player2.direction = "up"
    }
    if(game.mode == 2 && e.key == "ArrowDown"){
        player2.direction = "down"
    }
})

window.addEventListener('keyup', () => {
    player2.direction = null
})