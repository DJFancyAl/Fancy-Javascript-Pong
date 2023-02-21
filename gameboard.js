let gameboard = {
    background: document.getElementById("gameBack"), // Gets the container element
    board: document.querySelector('canvas'), // Gets the canvas element
    ctx: '', // The cavas context - used for drawing.
    clear: function(){
        // Clears the canvas
        this.ctx.clearRect(0, 0, this.board.width, this.board.height)
    },
    scores: document.getElementsByClassName('score'), // Gets the 'score' elements. Used for updating the score.
    scoreboards: document.getElementsByClassName('score-tab'), // Gets the 'score-tab' elements. Used for updating the score.
    resetScores: function(){
        // Sets the scoreboard to all zeros.
        for(let i=0; i < this.scores.length; i++){
            this.scores[i].textContent = 0
        }
    },
    saveScores: function(){
        // Saves player scores and mode to localstorage
        localStorage.setItem("player1", JSON.stringify(player1.matchScore))
        localStorage.setItem("player2", JSON.stringify(player2.matchScore))
        localStorage.setItem("mode", JSON.stringify(game.mode))
    },
    getScores: function(){
        // Gets player scores and mode from localstorage
        let score1 = JSON.parse(localStorage.getItem("player1"))
        let score2 = JSON.parse(localStorage.getItem("player2"))
        let mode = JSON.parse(localStorage.getItem("mode"))
        
        if(mode){
            game.mode = mode
        } else {
            game.mode = 1
        }

        if(game.mode == '1'){
            this.modes[0].checked = true
        } else {
            this.modes[1].checked = true
        }

        
        if(score1){
            player1.matchScore = score1
        } else {
            player1.matchScore = 0
        }
    
        if(score2){
            player2.matchScore = score2
        } else {
            player2.matchScore = 0
        }

        gameboard.scores[2].textContent = player1.matchScore
        gameboard.scores[3].textContent = player2.matchScore
    },
    setBackground: function(){
        // Sets the container's background to a random image
        let rand = Math.round(Math.random() * (this.backgrounds.length-1))
        while(rand == this.currentBg){
            rand = Math.round(Math.random() * (this.backgrounds.length-1))
        }
        this.currentBg = rand
        let encoded = window.btoa(this.backgrounds[rand]);

        this.background.style.background = "url(data:image/svg+xml;base64,"+encoded+")";
        this.background.style.backgroundSize = 'cover'
    },
    scoreAnimation: function(board){
        // Flashes a scoreboard green when a point is scored or a match ends.
        this.scoreboards[board].style.backgroundColor = 'var(--success)'
        this.scoreboards[board].style.transform = 'scale(1.2)'
        setTimeout(() => {
            this.scoreboards[board].style.backgroundColor = 'var(--sand)'
            this.scoreboards[board].style.transform = 'scale(1)'
        }, 1500)
    },
    modes: document.getElementsByName('mode'), // Gets the 'mode' elements. Used for selecting game mode.
    bounce: document.getElementById('bounce'), // Gets the 'bounce' audio element
    wall: document.getElementById('wall'), // Gets the 'wall' audio element
    point: document.getElementById('point'), // Gets the 'point' audio element
    victory: document.getElementById('victory'), // Gets the 'point' audio element
    currentBg: 0, // Index of the current background
    backgrounds: [ // SVG elements used for the backgrounds
    `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="1200" height="600" preserveAspectRatio="none" viewBox="0 0 1200 600"><g mask="url(&quot;#SvgjsMask1018&quot;)" fill="none"><path d="M46.87 -0.73L111.82 36.77L111.82 111.77L46.87 149.27L-18.08 111.77L-18.08 36.77zM111.82 336.77L176.78 374.27L176.78 449.27L111.82 486.77L46.87 449.27L46.87 374.27zM241.73 561.77L306.69 599.27L306.69 674.27L241.73 711.77L176.78 674.27L176.78 599.27zM306.69 449.27L371.64 486.77L371.64 561.77L306.69 599.27L241.73 561.77L241.73 486.77zM436.59 -0.73L501.55 36.77L501.55 111.77L436.59 149.27L371.64 111.77L371.64 36.77zM436.59 224.27L501.55 261.77L501.55 336.77L436.59 374.27L371.64 336.77L371.64 261.77zM501.55 561.77L566.5 599.27L566.5 674.27L501.55 711.77L436.59 674.27L436.59 599.27zM631.45 111.77L696.41 149.27L696.41 224.27L631.45 261.77L566.5 224.27L566.5 149.27zM566.5 224.27L631.45 261.77L631.45 336.77L566.5 374.27L501.55 336.77L501.55 261.77zM631.45 336.77L696.41 374.27L696.41 449.27L631.45 486.77L566.5 449.27L566.5 374.27zM566.5 449.27L631.45 486.77L631.45 561.77L566.5 599.27L501.55 561.77L501.55 486.77zM696.41 -0.73L761.36 36.77L761.36 111.77L696.41 149.27L631.45 111.77L631.45 36.77zM761.36 111.77L826.32 149.27L826.32 224.27L761.36 261.77L696.41 224.27L696.41 149.27zM696.41 224.27L761.36 261.77L761.36 336.77L696.41 374.27L631.45 336.77L631.45 261.77zM761.36 561.77L826.32 599.27L826.32 674.27L761.36 711.77L696.41 674.27L696.41 599.27zM891.27 111.77L956.22 149.27L956.22 224.27L891.27 261.77L826.31 224.27L826.31 149.27zM826.31 224.27L891.27 261.77L891.27 336.77L826.31 374.27L761.36 336.77L761.36 261.77zM891.27 561.77L956.22 599.27L956.22 674.27L891.27 711.77L826.31 674.27L826.31 599.27zM1021.18 336.77L1086.13 374.27L1086.13 449.27L1021.18 486.77L956.22 449.27L956.22 374.27zM1021.18 561.77L1086.13 599.27L1086.13 674.27L1021.18 711.77L956.22 674.27L956.22 599.27zM1086.13 224.27L1151.08 261.77L1151.08 336.77L1086.13 374.27L1021.18 336.77L1021.18 261.77zM1151.08 336.77L1216.04 374.27L1216.04 449.27L1151.08 486.77L1086.13 449.27L1086.13 374.27zM1151.08 561.77L1216.04 599.27L1216.04 674.27L1151.08 711.77L1086.13 674.27L1086.13 599.27zM1280.99 111.77L1345.94 149.27L1345.94 224.27L1280.99 261.77L1216.04 224.27L1216.04 149.27zM1280.99 336.77L1345.94 374.27L1345.94 449.27L1280.99 486.77L1216.04 449.27L1216.04 374.27z" stroke="rgba(249, 227, 189, 0.4)" stroke-width="2"></path><path d="M39.37 -0.73 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM104.32 36.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM104.32 111.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM39.37 149.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM-25.58 111.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM-25.58 36.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM104.32 336.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM169.28 374.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM169.28 449.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM104.32 486.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM39.37 449.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM39.37 374.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM234.23 561.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM299.19 599.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM299.19 674.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM234.23 711.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM169.28 674.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM169.28 599.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM299.19 449.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM364.14 486.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM364.14 561.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM234.23 486.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM429.09 -0.73 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM494.05 36.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM494.05 111.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM429.09 149.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM364.14 111.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM364.14 36.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM429.09 224.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM494.05 261.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM494.05 336.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM429.09 374.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM364.14 336.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM364.14 261.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM494.05 561.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM559 599.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM559 674.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM494.05 711.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM429.09 674.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM429.09 599.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.95 111.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.91 149.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.91 224.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.95 261.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM559 224.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM559 149.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.95 336.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM559 374.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.91 374.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.91 449.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.95 486.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM559 449.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.95 561.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM494.05 486.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.91 -0.73 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.86 36.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.86 111.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.95 36.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.82 149.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.82 224.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.86 261.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.86 336.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.86 561.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.82 599.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.82 674.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.86 711.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.91 674.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.91 599.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.77 111.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM948.72 149.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM948.72 224.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.77 261.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.81 224.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.81 149.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.77 336.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.81 374.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.77 561.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM948.72 599.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM948.72 674.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.77 711.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.81 674.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.81 599.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.68 336.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.63 374.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.63 449.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.68 486.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM948.72 449.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM948.72 374.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.68 561.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.63 599.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.63 674.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.68 711.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.63 224.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.58 261.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.58 336.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.68 261.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.54 374.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.54 449.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.58 486.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.58 561.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.54 599.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.54 674.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.58 711.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.49 111.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.44 149.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.44 224.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.49 261.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.54 224.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.54 149.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.49 336.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.44 374.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.44 449.27 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.49 486.77 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0z" fill="rgba(249, 227, 189, 0.4)"></path><path d="M81.27 190.42L124.58 215.42L124.58 265.42L81.27 290.42L37.97 265.42L37.97 215.42zM81.27 340.42L124.58 365.42L124.58 415.42L81.27 440.42L37.97 415.42L37.97 365.42zM81.27 490.42L124.58 515.42L124.58 565.42L81.27 590.42L37.97 565.42L37.97 515.42zM124.58 -34.58L167.88 -9.58L167.88 40.42L124.58 65.42L81.27 40.42L81.27 -9.58zM167.88 190.42L211.18 215.42L211.18 265.42L167.88 290.42L124.58 265.42L124.58 215.42zM124.58 265.42L167.88 290.42L167.88 340.42L124.58 365.42L81.27 340.42L81.27 290.42zM167.88 340.42L211.18 365.42L211.18 415.42L167.88 440.42L124.58 415.42L124.58 365.42zM124.58 415.42L167.88 440.42L167.88 490.42L124.58 515.42L81.27 490.42L81.27 440.42zM167.88 490.42L211.18 515.42L211.18 565.42L167.88 590.42L124.58 565.42L124.58 515.42zM124.58 565.42L167.88 590.42L167.88 640.42L124.58 665.42L81.27 640.42L81.27 590.42zM254.48 340.42L297.78 365.42L297.78 415.42L254.48 440.42L211.18 415.42L211.18 365.42zM211.18 565.42L254.48 590.42L254.48 640.42L211.18 665.42L167.88 640.42L167.88 590.42zM297.78 -34.58L341.09 -9.58L341.09 40.42L297.78 65.42L254.48 40.42L254.48 -9.58zM297.78 115.42L341.09 140.42L341.09 190.42L297.78 215.42L254.48 190.42L254.48 140.42zM341.09 490.42L384.39 515.42L384.39 565.42L341.09 590.42L297.78 565.42L297.78 515.42zM297.78 565.42L341.09 590.42L341.09 640.42L297.78 665.42L254.48 640.42L254.48 590.42zM427.69 40.42L471 65.42L471 115.42L427.69 140.42L384.39 115.42L384.39 65.42zM471 115.42L514.3 140.42L514.3 190.42L471 215.42L427.69 190.42L427.69 140.42zM471 265.42L514.3 290.42L514.3 340.42L471 365.42L427.69 340.42L427.69 290.42zM471 415.42L514.3 440.42L514.3 490.42L471 515.42L427.69 490.42L427.69 440.42zM514.3 490.42L557.6 515.42L557.6 565.42L514.3 590.42L471 565.42L471 515.42zM471 565.42L514.3 590.42L514.3 640.42L471 665.42L427.69 640.42L427.69 590.42zM557.6 -34.58L600.9 -9.58L600.9 40.42L557.6 65.42L514.3 40.42L514.3 -9.58zM557.6 115.42L600.9 140.42L600.9 190.42L557.6 215.42L514.3 190.42L514.3 140.42zM600.9 190.42L644.21 215.42L644.21 265.42L600.9 290.42L557.6 265.42L557.6 215.42zM557.6 265.42L600.9 290.42L600.9 340.42L557.6 365.42L514.3 340.42L514.3 290.42zM600.9 340.42L644.21 365.42L644.21 415.42L600.9 440.42L557.6 415.42L557.6 365.42zM557.6 415.42L600.9 440.42L600.9 490.42L557.6 515.42L514.3 490.42L514.3 440.42zM557.6 565.42L600.9 590.42L600.9 640.42L557.6 665.42L514.3 640.42L514.3 590.42zM730.81 -34.58L774.11 -9.58L774.11 40.42L730.81 65.42L687.51 40.42L687.51 -9.58zM774.11 190.42L817.42 215.42L817.42 265.42L774.11 290.42L730.81 265.42L730.81 215.42zM774.11 340.42L817.42 365.42L817.42 415.42L774.11 440.42L730.81 415.42L730.81 365.42zM730.81 565.42L774.11 590.42L774.11 640.42L730.81 665.42L687.51 640.42L687.51 590.42zM817.42 -34.58L860.72 -9.58L860.72 40.42L817.42 65.42L774.11 40.42L774.11 -9.58zM860.72 190.42L904.02 215.42L904.02 265.42L860.72 290.42L817.42 265.42L817.42 215.42zM817.42 265.42L860.72 290.42L860.72 340.42L817.42 365.42L774.11 340.42L774.11 290.42zM860.72 490.42L904.02 515.42L904.02 565.42L860.72 590.42L817.42 565.42L817.42 515.42zM904.02 115.42L947.32 140.42L947.32 190.42L904.02 215.42L860.72 190.42L860.72 140.42zM947.32 490.42L990.63 515.42L990.63 565.42L947.32 590.42L904.02 565.42L904.02 515.42zM904.02 565.42L947.32 590.42L947.32 640.42L904.02 665.42L860.72 640.42L860.72 590.42zM1033.93 40.42L1077.23 65.42L1077.23 115.42L1033.93 140.42L990.63 115.42L990.63 65.42zM990.63 115.42L1033.93 140.42L1033.93 190.42L990.63 215.42L947.32 190.42L947.32 140.42zM1033.93 340.42L1077.23 365.42L1077.23 415.42L1033.93 440.42L990.63 415.42L990.63 365.42zM1077.23 -34.58L1120.53 -9.58L1120.53 40.42L1077.23 65.42L1033.93 40.42L1033.93 -9.58zM1077.23 115.42L1120.53 140.42L1120.53 190.42L1077.23 215.42L1033.93 190.42L1033.93 140.42zM1077.23 265.42L1120.53 290.42L1120.53 340.42L1077.23 365.42L1033.93 340.42L1033.93 290.42zM1120.53 490.42L1163.84 515.42L1163.84 565.42L1120.53 590.42L1077.23 565.42L1077.23 515.42zM1077.23 565.42L1120.53 590.42L1120.53 640.42L1077.23 665.42L1033.93 640.42L1033.93 590.42zM1163.84 -34.58L1207.14 -9.58L1207.14 40.42L1163.84 65.42L1120.53 40.42L1120.53 -9.58zM1207.14 40.42L1250.44 65.42L1250.44 115.42L1207.14 140.42L1163.84 115.42L1163.84 65.42zM1163.84 115.42L1207.14 140.42L1207.14 190.42L1163.84 215.42L1120.53 190.42L1120.53 140.42z" stroke="rgba(230, 123, 247, 0.4)" stroke-width="2"></path></g><defs><mask id="SvgjsMask1018"><rect width="1200" height="600" fill="#ffffff"></rect></mask></defs></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="1200" height="600" preserveAspectRatio="none" viewBox="0 0 1200 600"><g mask="url(&quot;#SvgjsMask1084&quot;)" fill="none"><path d="M -40.61345285985385,358 C -0.61,335.8 79.39,237.6 159.38654714014615,247 C 239.39,256.4 279.39,452.2 359.38654714014615,405 C 439.39,357.8 479.39,15 559.3865471401461,11 C 639.39,7 679.39,381.2 759.3865471401461,385 C 839.39,388.8 879.39,36.6 959.3865471401461,30 C 1039.39,23.4 1079.39,337.2 1159.3865471401461,352 C 1239.39,366.8 1351.26,112.6 1359.3865471401461,104 C 1367.51,95.4 1231.88,268 1200,309" stroke="rgba(154, 91, 255, 0.6)" stroke-width="2"></path><path d="M -140.2009416465011,541 C -100.2,438 -20.2,44.6 59.7990583534989,26 C 139.8,7.4 179.8,414.4 259.7990583534989,448 C 339.8,481.6 379.8,219.2 459.7990583534989,194 C 539.8,168.8 579.8,315.6 659.7990583534989,322 C 739.8,328.4 779.8,175.8 859.7990583534989,226 C 939.8,276.2 979.8,609 1059.7990583534988,573 C 1139.8,537 1231.76,67.4 1259.7990583534988,46 C 1287.84,24.6 1211.96,382 1200,466" stroke="rgba(230, 123, 247, 0.6)" stroke-width="2"></path><path d="M -207.5186959883049,410 C -167.52,338.6 -87.52,63 -7.518695988304902,53 C 72.48,43 112.48,328.2 192.4813040116951,360 C 272.48,391.8 312.48,220.4 392.4813040116951,212 C 472.48,203.6 512.48,322 592.4813040116951,318 C 672.48,314 712.48,182.8 792.4813040116951,192 C 872.48,201.2 912.48,357.6 992.4813040116951,364 C 1072.48,370.4 1150.98,215 1192.481304011695,224 C 1233.99,233 1198.5,372 1200,409" stroke="rgba(230, 123, 247, 0.6)" stroke-width="2"></path><path d="M -254.25264904864275,180 C -214.25,258.6 -134.25,554.8 -54.25264904864275,573 C 25.75,591.2 65.75,269.4 145.74735095135725,271 C 225.75,272.6 265.75,596.8 345.74735095135725,581 C 425.75,565.2 465.75,223.2 545.7473509513572,192 C 625.75,160.8 665.75,422.6 745.7473509513572,425 C 825.75,427.4 865.75,193.8 945.7473509513572,204 C 1025.75,214.2 1094.9,465 1145.7473509513572,476 C 1196.6,487 1189.15,302.4 1200,259" stroke="rgba(230, 123, 247, 0.6)" stroke-width="2"></path><path d="M -2.4739951907753834,494 C 37.53,452.8 117.53,295 197.52600480922462,288 C 277.53,281 317.53,468.2 397.5260048092246,459 C 477.53,449.8 517.53,272 597.5260048092246,242 C 677.53,212 717.53,326 797.5260048092246,309 C 877.53,292 917.53,155.8 997.5260048092246,157 C 1077.53,158.2 1117.53,318.6 1197.5260048092246,315 C 1277.53,311.4 1397.03,117 1397.5260048092246,139 C 1398.02,161 1239.51,367.8 1200,425" stroke="rgba(249, 227, 189, 0.6)" stroke-width="2"></path></g><defs><mask id="SvgjsMask1084"><rect width="1200" height="600" fill="#ffffff"></rect></mask></defs></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="1440" height="560" preserveAspectRatio="none" viewBox="0 0 1440 560"><g mask="url(&quot;#SvgjsMask1010&quot;)" fill="none"><path d="M43.08 140C19.86 78.84 15.81 41.64 44.64 0C64.27 -28.36 92.32 0 140 0C210 0 210 0 280 0C350 0 350 0 420 0C490 0 490 0 560 0C630 0 630 0 700 0C760 0 762.2 -6.42 820 0C832.2 1.36 830.26 15.56 840 15.56C849.01 15.56 846.27 1.25 857.5 0C916.27 -6.53 918.75 0 980 0C1050 0 1050 0 1120 0C1190 0 1190 0 1260 0C1330 0 1330 0 1400 0C1451.97 0 1468.58 -24.05 1503.94 0C1538.58 23.55 1527.48 46.59 1540 95.2C1545.51 116.59 1540 117.6 1540 140C1540 166.67 1545.94 167.74 1540 193.33C1529.69 237.74 1507.5 237.4 1507.5 280C1507.5 314.44 1531.75 311.88 1540 347.41C1548 381.88 1540 383.71 1540 420C1540 448 1557.5 457.67 1540 476C1490.68 527.67 1473.65 519.63 1406.36 560C1403.65 561.63 1403.18 560 1400 560C1395 560 1393.61 563.35 1390 560C1323.61 498.35 1329.51 437.21 1260 430C1194.51 423.21 1187.47 478.3 1120 532C1105.8 543.3 1113.33 556.67 1096.67 560C1043.33 570.67 1038.34 560 980 560C923.83 560 893.69 591.16 867.65 560C835.18 521.16 873.36 487.73 862.99 420C859.54 397.47 851.77 379.47 840 379.47C828.05 379.47 820.34 397.27 815.56 420C801.35 487.54 835.52 519.43 802.03 560C777.74 589.43 751.01 560 700 560C630 560 630 560 560 560C491 560 490.32 561.34 422 560C420.32 559.97 421.49 558.06 420 557.25C350.49 519.44 340.72 481.9 280 482.76C244.06 483.27 263.06 539.92 226.67 560C193.06 578.54 183.33 560 140 560C70 560 35 595 0 560C-35 525 0 490 0 420C0 420 0 420 0 420C70 358.31 69.55 357.76 140 296.61C150.2 287.76 161.3 289.76 161.3 280C161.3 267.05 151.55 264.86 140 251.18C92.44 194.86 67.54 204.43 43.08 140" stroke="rgba(230, 123, 247, 0.4)" stroke-width="2"></path><path d="M560 58.33C521.21 68.14 507.5 102.98 507.5 140C507.5 166.43 535.49 160.81 560 185.23C605.74 230.81 602.55 234.09 648 280C672.55 304.81 672.43 326.67 700 326.67C732.77 326.67 761.33 314.3 768.68 280C781.33 220.97 763.83 205.48 740 140C729.49 111.13 727.42 103.74 700 91.3C637.42 62.91 617.46 43.79 560 58.33" stroke="rgba(230, 123, 247, 0.4)" stroke-width="2"></path><path d="M420 246.52C405 246.52 389.2 264.34 389.2 280C389.2 293.71 404.9 305.25 420 305.25C434.3 305.25 448 293.61 448 280C448 264.25 434.4 246.52 420 246.52" stroke="rgba(154, 91, 255, 0.4)" stroke-width="2"></path><path d="M132.82 140C112.07 71.08 92.62 53.52 95.36 0C96.21 -16.48 117.68 0 140 0C210 0 210 0 280 0C308 0 336 -15.52 336 0C336 29.28 319.04 57.55 280 89.6C233.76 127.55 223.12 115.84 165.45 140C153.12 145.16 151.58 148.24 140 148.24C135.27 148.24 134.39 145.2 132.82 140" stroke="rgba(154, 91, 255, 0.4)" stroke-width="2"></path><path d="M346.32 140C346.32 121.59 388.59 98.82 420 98.82C437.93 98.82 445 120.3 445 140C445 156.1 436.32 170.43 420 170.43C386.98 170.43 346.32 157.39 346.32 140" stroke="rgba(154, 91, 255, 0.4)" stroke-width="2"></path><path d="M700 15.22C677.95 15.22 653.33 3.9 653.33 0C653.33 -3.71 676.66 0 700 0C710 0 720 -3.37 720 0C720 4.24 711.29 15.22 700 15.22" stroke="rgba(249, 227, 189, 0.4)" stroke-width="2"></path><path d="M802.5 140C803.28 112.54 821.45 93.33 840 93.33C858.3 93.33 874.69 112.63 876.21 140C879.87 205.96 866.99 212.36 850.37 280C848.88 286.04 844.57 287.37 840 287.37C836.74 287.37 835.83 284.37 834.72 280C817.08 210.69 800.64 205.88 802.5 140" stroke="rgba(154, 91, 255, 0.4)" stroke-width="2"></path><path d="M980 26.42C959.41 26.42 945 7.35 945 0C945 -5.86 962.5 0 980 0C1050 0 1120 -6.55 1120 0C1120 6.66 1046.91 26.42 980 26.42" stroke="rgba(154, 91, 255, 0.4)" stroke-width="2"></path><path d="M1400 81.95C1363.75 81.95 1318.05 24 1318.05 0C1318.05 -16.97 1359.03 0 1400 0C1425.45 0 1450.91 -14.15 1450.91 0C1450.91 26.82 1430.18 81.95 1400 81.95" stroke="rgba(230, 123, 247, 0.4)" stroke-width="2"></path><path d="M237.39 280C237.39 237.93 259.39 194.78 280 194.78C300.29 194.78 319.2 237.86 319.2 280C319.2 318.16 300.26 355.38 280 355.38C259.35 355.38 237.39 318.23 237.39 280" stroke="rgba(230, 123, 247, 0.4)" stroke-width="2"></path><path d="M511.64 280C535.39 259.04 537.05 239.08 560 239.08C580.23 239.08 577.74 260.83 598 280C647.74 327.06 648.17 326.75 700 371.54C729.17 396.75 752.45 386.69 760 420C773.81 480.92 765.74 506.27 742.71 560C735.74 576.27 721.36 560 700 560C630 560 630 560 560 560C516 560 506.94 577.81 472 560C436.94 542.13 451.55 518.76 420 488.63C378.25 448.76 325.41 452.37 325.41 420C325.41 389.36 375.98 395.71 420 362.62C469.09 325.71 465.39 320.81 511.64 280" stroke="rgba(249, 227, 189, 0.4)" stroke-width="2"></path><path d="M1028.61 280C1071.01 236.77 1071.53 199.76 1120 199.76C1178.15 199.76 1223.45 225.32 1241.85 280C1260.51 335.44 1231.34 359.47 1194.12 420C1170.41 458.55 1153.4 445.3 1120 478.15C1082.23 515.3 1093.61 535.55 1051.79 560C1023.61 576.47 1015.89 560 980 560C945.43 560 921.56 583.13 910.86 560C889.17 513.13 895.13 483.18 915.22 420C929.7 374.43 948.22 381.74 980 342.5C1004.91 311.74 1001.01 308.14 1028.61 280" stroke="rgba(154, 91, 255, 0.4)" stroke-width="2"></path><path d="M1299.2 280C1309.75 232.07 1356.75 208 1400 208C1429.65 208 1431.38 240.47 1445 280C1467.9 346.47 1487.04 361.92 1473.04 420C1464.54 455.26 1433.98 466.67 1400 466.67C1374.13 466.67 1368.72 448.51 1353.33 420C1318.32 355.17 1286.42 338.07 1299.2 280" stroke="rgba(249, 227, 189, 0.4)" stroke-width="2"></path><path d="M67.31 420C101.89 386.16 101.44 355.93 140 355.93C186.24 355.93 236.24 378.34 236.92 420C237.91 480.38 190.85 491.36 143.33 560C142.39 561.36 141.67 560 140 560C70 560 47.32 582.68 0 560C-22.68 549.14 -13.57 521.15 0 492.92C20.08 451.15 31.89 454.66 67.31 420" stroke="rgba(154, 91, 255, 0.4)" stroke-width="2"></path><path d="M1077.22 280C1095.73 258.51 1097.31 242.44 1120 242.44C1147.22 242.44 1176.18 252.12 1177.04 280C1178.92 340.9 1152.74 351.07 1125.49 420C1124.22 423.22 1122.25 421.65 1120 424.31C1062.97 491.65 1067.66 501.13 1006.92 560C997.66 568.97 993.46 560 980 560C967.04 560 955.05 570.9 954.07 560C948.78 500.9 956.08 488.04 967.46 420C969.04 410.54 973.97 412.69 980 405C1028.85 342.69 1025.73 339.79 1077.22 280" stroke="rgba(249, 227, 189, 0.4)" stroke-width="2"></path><path d="M134.62 420C134.62 417.1 137.14 415.25 140 415.25C143.42 415.25 147.18 416.9 147.18 420C147.18 424.66 143.25 430.77 140 430.77C136.97 430.77 134.62 424.86 134.62 420" stroke="rgba(230, 123, 247, 0.4)" stroke-width="2"></path><path d="M420 420C428.54 384.04 489.89 400.9 560 400C629.89 399.1 630.59 406.8 700 416.41C702.81 416.8 704.44 417.33 704.44 420C704.44 434.68 704.51 436.11 700 451.11C683.45 506.11 699.39 531.16 662.31 560C629.39 585.61 611.15 560 560 560C541 560 534.59 572.59 522 560C464.59 502.59 409.54 464.04 420 420" stroke="rgba(154, 91, 255, 0.4)" stroke-width="2"></path></g><defs><mask id="SvgjsMask1010"><rect width="1440" height="560" fill="#ffffff"></rect></mask></defs></svg>`,
    ]
}

gameboard.ctx = gameboard.board.getContext('2d')
gameboard.resetScores()
gameboard.setBackground()