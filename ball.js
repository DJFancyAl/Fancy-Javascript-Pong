// let ball = {
//     x: gameboard.board.width/2,
//     y: gameboard.board.height/2,
//     d: 10,
//     dy: 0,
//     speed: 5,
//     ctx: gameboard.board.getContext('2d'),
//     create: function(){
//         let grd = this.ctx.createRadialGradient(this.x, this.y, this.d, this.x, this.y, 6);
//         grd.addColorStop(0, "white");
//         grd.addColorStop(1, "#E67BF7");
//         this.ctx.beginPath();
//         this.ctx.arc(this.x, this.y, this.d, 0, 2 * Math.PI);
//         this.ctx.fillStyle = grd;
//         this.ctx.fill()
//     },
//     setup: function(){
//         this.dy = Math.floor(Math.random() * 8) + 1;
//         this.dy = Math.floor(Math.random() * 2) == 1 ? this.dy *1 : this.dy*-1;
//     },
//     start: function(){
//         this.ctx = ball.ctx
//         // this.ctx.clearRect(0, 0, gameboard.board.width, gameboard.board.height);\
//         gameboard.clear()

//         ball.x += ball.speed
//         ball.y += ball.dy

//         if(ball.y - ball.d < 0){
//             ball.dy *= -1;
//         }

//         if(ball.y + ball.d > gameboard.board.height){
//             ball.dy *= -1;
//         }
        
//         ball.create()
//         requestAnimationFrame(ball.start);
//     }
// }

// ball.create()
// ball.setup()

