let player2 = {
    w: 10,
    l: 120,
    x: gameboard.board.width - 20,
    y: (gameboard.board.height/2) + 60,
    s: 6,
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
        if(this.direction  == 'up' && this.y > (this.l + this.w + 5)){
            this.y -= this.s;
        }
        if(this.direction  == 'down' && this.y < (gameboard.board.height - this.w - 5)){
            this.y += this.s;
        }
    }
}

player2.create()
window.addEventListener('keydown', (e) => {
    if(e.key == "ArrowUp"){
        player2.direction = "up"
    }
    if(e.key == "ArrowDown"){
        player2.direction = "down"
    }
})

window.addEventListener('keyup', () => {
    player2.direction = null
})