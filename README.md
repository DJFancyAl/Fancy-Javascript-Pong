# Fancy-Javascript-Pong

## Inspiration

This game was designed to provide a dyanmic and fast-paced gaming experience. I set out to create a game with a lot of motion where the player would have to constantly be engaged with their computer's keyboard. I wanted the game to move so quick that the player couldn't look away, but I also wanted to game to be endlessly playable. Then "AHA!" It's time to make a pong game...

Play the game [here.](https://djfancyal.github.io/Fancy-Javascript-Pong/) 

---

## Instructions

Learn how to play "Fancy Javascript Pong" below.

### The Game

Playing this game is easy. Winning it on the other hand...not so much. The objective is to score 5 points before your opponent by getting the ball past their paddle. Once a player has scored 5 points - the match will is won! Want a rematch?? Match score will be kept also, so you can play as many games as you like.

### Game Modes

The game may be played in either single player or two player modes. Choose which one by using the options buttons in the upper right. Upon playing the game, "Player 1" will always control the paddle on the left side of the screen, while "Player 2" will always use the right paddle. The controls will change depending on which mode you choose:

**Single Player:** this is the opportunity to really hone your skills against the computer opponent. When playing against the computer the player will use the Up Arrow to move the paddle up and the Down Arrow to move the paddle down. The computer opponent will try to return the ball, but be ready -he's super competitive.

**Two Player:** now it's time to face off against your friend (or enemy)...This time both paddles can be controlled. However, Player 1's controls will change. In this game mode Player 1 will use the W key to move the paddle up and the S key to move it down. Meanwhile, Player 2 may use the Up Arrow and Down Arrow keys as before.

`*Game & Match scores will be reset if you change game mode or click the "Reset" button`

### Scores

Players will immediately be notified if a point is scored. Additionally, the scoreboard in the upper left will flash green and update the score. Need a break? Well match scores will be saved, so you can always come back later and pick up right where you left off. Keep the matches going until the ultimate winner is decided!

### Playing the Game

The game is designed for fast-paced action. To start the point, just press the Space button on your keyboard, and the ball will take off. Be ready, as the ball will take off in a random angle and you may need to react right away.

Now move your paddle into position. If the ball hits anywhere in the middle of your paddle then it will deflect back towards your opponent. Good defense like this is never a bad option! However, your opponent may find it easy to keep up with your moves... To really throw them off their game - try hitting the ball towards the ends of your paddle. This will cause the angle of the ball to change, and make it much more difficult for your opponent to get into position.

**Was that too easy?** Well things are about to get much more challenging. With each point scored the ball will speed up a little bit. Getting that 1st point on the board may be easy work finishing off a game will test your speed and skills. Try to get ahead of your opponent and stay there, otherwise they may leave you in the dust!

---

## How it was Built

The game was built with pure HTML, CSS, and JavaScript.

### HTML

To make such a game with so much fast paced movement, it quickly became clear that I would need something more than HTML elements (DIVs, SPANs, etc.) to make the game work. The solution was the HTML [\<Canvas\> element](https://www.w3schools.com/graphics/canvas_intro.asp). The Canvas element allows you to "draw" on the canvas using JavaScript.

The canvas element:

    <canvas width="1200" height="600">Your browser does not support the HTML5 canvas tag.</canvas>

### Drawing the Game

Drawing on a canvas element is fairly easy to understand. After a short time I was drawing lines, arcs, and rectangles. With this I could create the main components of my game - the ball and paddles:

Creating the ball with a gradient:

    let grd = this.ctx.createRadialGradient(x, y, d, x, y, 6);
    grd.addColorStop(0, "white");
    grd.addColorStop(1, "#E67BF7");
    this.ctx.beginPath();
    this.ctx.arc(x, y, d, 0, 2 * Math.PI);
    this.ctx.fillStyle = grd;
    this.ctx.fill()

However, making those components move was an entirely different challenge...since the components are not actually elements, but are just drawn on the canvas - I needed to redraw them over and over again as their positions changed. For this I used the `requestAnimationFrame()` function, which will continue looping that function for every frame of movement.

My move and render function:

    requestID = requestAnimationFrame(game.start);
    game.started = true
    gameboard.clear()

    ball.move()
    ball.create()
    player1.move()
    player1.create()
    player2.move()
    player2.create()

As you can see, every time this function is looped the gameboard (canvas) is cleared. Then the ball is moved and rendered. Player 1 is moved and rendered. Lastly player 2 is moved and rendered.

---

## Future Plans

I would love to continue improving the **Fancy JavaScript Pong** game. There are a couple of small bugs which can be corrected. Noticably - the ball gets "pinched" between the paddle and the wall sometimes. Causing it to bounce around a little before ejecting out.

Additionally I would like to add additional functionality - for starters I would like make the game more responsive. Right now the game is played on a canvas element that is 1200px x 600px in size. This limits which screens it can be played on. Lastly, I would like to add customizability where the user can choose thier own color theme.

---

## Credits

#### Learning to use the canvas element

- Title: HTML Canvas Tutorial _ Author:(w3 Schools)) _ Date: (2023 _ Availability: (https://www.w3schools.com/graphics/canvas_intro.asp) _

#### Learning to make a ball bounce

- Title: HTML5 Canvas Part 2 - Animation _ Author:(Potts, T)) _ Date: (2019) _ Availability: (https://codepen.io/Tyler_Potts_/pen/YzzwXBJ?editors=0010) \_

#### Creating Modals

- Title: How TO - CSS/JS Modal* Author:(w3 Schools)) * Date: (2023 _ Availability: (https://www.w3schools.com/howto/howto_css_modals.asp) _

#### SVG Backgounds

Free SVG Background by [BGJar](https://bgjar.com/).

#### Audio

Sounds provided by [Sound Bible](https://soundbible.com/).
