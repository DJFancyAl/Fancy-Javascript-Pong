let gameboard = {
    board: document.querySelector('canvas'),
    ctx: '',
    clear: function(){
        this.ctx.clearRect(0, 0, this.board.width, this.board.height)
    },
    scores: document.getElementsByClassName('score')
}

gameboard.ctx = gameboard.board.getContext('2d')