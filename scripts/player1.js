let player1 = {
    w: 0, // Width of player 1's paddle (set on setup)
    l: 0, // Length of player 1's paddle (set on setup)
    x: 0, // X position of player 1's paddle (set on setup)
    y: 0, // Y position of player 1's paddle (set on setup)
    s: 0, // Speed of player 1's paddle (set on setup)
    ctx: gameboard.ctx,
    create: function(){
        // Handles rendering of Player 1's paddle
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
    direction: null, // Direction of player 1's paddle (set with the move funciton)
    move: function(){
        // Tells paddle to move along Y axis based on the direction set
        if(this.direction  == 'up' && this.y > (this.l + this.w + 5)){
            this.y -= this.s;
        }
        if(this.direction  == 'down' && this.y < (gameboard.board.height - this.w - 5)){
            this.y += this.s; 
        }
    },
    currentScore: 0, // Current game score for Player 1
    matchScore: 0, // Current match score for Player 1
    score: function(){
        // Performs actions when Player 1 scores
        this.currentScore += 1
        gameboard.scores[0].textContent = this.currentScore
        gameboard.scoreAnimation(0)

        if(this.currentScore > player2.currentScore){
            // Increases the ball speed if Player 1 scores
            ball.speed += 3
        }
        
        if(this.currentScore == 5){
            // Performs actions if Player 1 wins the match
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
        // Sets up Player 1 for the game
        this.w = 10,
        this.l = 120,
        this.x = 20,
        this.y = (gameboard.board.height/2) + 60,
        this.s = 10,

        this.create()
    }
}


window.addEventListener('keydown', (e) => {
    // Handles arrow key events
    if(game.mode == 2 && e.key == "w"){
        // If 2 player mode use "W" key for up
        player1.direction = "up"
    }
    if(game.mode == 2 && e.key == "s"){
        // If 2 player mode use "S" key for Down
        player1.direction = "down"
    }
    if(game.mode == 1 && e.key == "ArrowUp"){
        // If 1 player mode use "Arrow Up" key for up
        player1.direction = "up"
    }
    if(game.mode == 1 && e.key == "ArrowDown"){
        // If 1 player mode use "ArrowDown" key for Down
        player1.direction = "down"
    }
})

window.addEventListener('keyup', (e) => {
    // Stops the paddles movement on keyup
    if(game.mode == 2 && e.key == "w" || e.key == "s"){
        player1.direction = null
    }

    if(game.mode == 1 && e.key == "ArrowUp" || e.key == "ArrowDown"){
        player1.direction = null
    }
    
})