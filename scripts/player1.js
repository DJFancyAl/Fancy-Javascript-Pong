let player1 = {
    w: 0,
    l: 0,
    x: 0,
    y: 0,
    s: 0,
    ctx: gameboard.ctx,
    create: function(){
        let grd = this.ctx.createLinearGradient(this.x + 5, this.y, this.x - 10  , this.y);
        grd.addColorStop(0, "#9A5BFF");
        grd.addColorStop(1, "#E67BF7");
        this.ctx.strokeStyle = "#F9E3BD";

        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.w,0,Math.PI);
        this.ctx.arc(this.x,this.y-this.l,this.w,Math.PI, 0);
        this.ctx.lineTo(this.x + this.w, this.y);
        this.ctx.lineWidth = 5
        this.ctx.stroke();
        this.ctx.fillStyle = grd;
        this.ctx.fill()
    },
    direction: null,
    move: function(){
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
        gameboard.scores[0].textContent = this.currentScore
        gameboard.scoreAnimation(0)

        if(this.currentScore > player2.currentScore){
            ball.speed += 3
        }
        
        if(this.currentScore == 5){
            this.matchScore += 1
            game.endMatch(1)
            gameboard.scores[2].textContent = this.matchScore
            return
        }
        
        this.ctx.font = "bolder 60px Arial";
        this.ctx.fillStyle = "#F9E3BD";
        this.ctx.textAlign = "center";
        this.ctx.fillText("PLAYER 1 SCORES!", gameboard.board.width/2, (gameboard.board.height/2) - 60)
        this.ctx.font = "bolder 50px Arial";
        this.ctx.fillText(player1.currentScore + " - " + player2.currentScore, gameboard.board.width/2, (gameboard.board.height/2) + 30)  
    },
    setUp: function(){
        this.w = 10,
        this.l = 120,
        this.x = 20,
        this.y = (gameboard.board.height/2) + 60,
        this.s = 10,

        this.create()
    }
}


window.addEventListener('keydown', (e) => {
    if(game.mode == 2 && e.key == "w"){
        player1.direction = "up"
    }
    if(game.mode == 2 && e.key == "s"){
        player1.direction = "down"
    }
    if(game.mode == 1 && e.key == "ArrowUp"){
        player1.direction = "up"
    }
    if(game.mode == 1 && e.key == "ArrowDown"){
        player1.direction = "down"
    }
})

window.addEventListener('keyup', () => {
    player1.direction = null
})