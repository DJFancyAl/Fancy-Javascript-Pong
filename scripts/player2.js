let player2 = {
    w: 0, // Width of player 2's paddle (set on setup)
    l: 0, // Length of player 2's paddle (set on setup)
    x: 0, // X position of player 2's paddle (set on setup)
    y: 0, // Y position of player 2's paddle (set on setup)
    s: 0, // Speed of player 2's paddle (set on setup)
    ctx: gameboard.ctx,
    create: function(){
        // Handles rendering of Player 2's paddle
        let grd = this.ctx.createLinearGradient(this.x + 10, this.y, this.x - 5  , this.y);
        grd.addColorStop(0, "#E67BF7");
        grd.addColorStop(1, "#9A5BFF");
        this.ctx.strokeStyle = "#F9E3BD";

        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.w,0,Math.PI);
        this.ctx.arc(this.x,this.y-this.l,this.w,Math.PI, 0);
        this.ctx.lineTo(this.x + this.w, this.y);
        this.ctx.stroke();
        this.ctx.fillStyle = grd;
        this.ctx.fill()
    },
    direction: null, // Direction of player 2's paddle (set with the move funciton)
    move: function(){
        // Tells paddle to move along Y axis based on the direction set
        if(game.mode == 1){
            // If 1 player mode - change paddle direction based on ball position
            if(this.y > ball.y + 60){
                this.direction = 'up'
            } else if(this.y < ball.y -60) {
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
    currentScore: 0, // Current game score for Player 2
    matchScore: 0, // Current match score for Player 2
    score: function(){
        // Performs actions when Player 2 scores
        this.currentScore += 1
        gameboard.scores[1].textContent = this.currentScore
        gameboard.scoreAnimation(0)

        if(this.currentScore > player1.currentScore){
            // Increases the ball speed if Player 2 scores
            ball.speed -= 3
        }

        if(this.currentScore == 5){
            // Performs actions if Player 2 wins the match
            this.matchScore += 1
            game.endMatch(2)
            gameboard.scores[3].textContent = this.matchScore
            return
        }

        this.ctx.font = "bolder 60px Tahoma";
        this.ctx.fillStyle = "#F9E3BD";
        this.ctx.textAlign = "center";
        this.ctx.fillText("PLAYER 2 SCORES!", gameboard.board.width/2, (gameboard.board.height/2) - 60)
        this.ctx.fillStyle = "#E67BF7";
        this.ctx.font = "bolder 50px Tahoma";
        this.ctx.fillText(player1.currentScore + " - " + player2.currentScore, gameboard.board.width/2, (gameboard.board.height/2) + 30)
    },
    setUp: function(){
        // Sets up Player 2 for the game
        this.w = 10,
        this.l = 120,
        this.x = gameboard.board.width - 20,
        this.y = (gameboard.board.height/2) + 60,
        this.s = 10,

        this.create()
    }
}

window.addEventListener('keydown', (e) => {
    // Handles arrow key events if in 2 player mode
    if(game.mode == 2 && e.key == "ArrowUp"){
        player2.direction = "up"
    }
    if(game.mode == 2 && e.key == "ArrowDown"){
        player2.direction = "down"
    }
})

window.addEventListener('keyup', (e) => {
    // Stops the paddles movement on keyup
    if(game.mode == 2 && e.key == "ArrowUp" || e.key == "ArrowDown")
    player2.direction = null
})