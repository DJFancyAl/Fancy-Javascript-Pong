# Fancy-Javascript-Pong

# NYU-SD-07 Milestone Project: Planning

_Before you start programming your project_... plan it!

Complete the planning sections below and include them in the README.md of your project repository. Once you're done, reach out to your instructional staff -- they'll examine your plan, help you scope it appropriately for the tools available to you and think ahead toward technical solutions, and point out any areas that could use any more thought. _Use the template below!_

---

## Project Description

I'm looking to create a "Pong" style game where two paddles bounce a ball back and forth across the window. The objective is to hit the ball past the opposing paddle to score a point. The first player to score 5 points wins the game!

I want to make a dynamic game with a lot of motion - where the player has to be reactive (as opposed to a game that just waits for user input). I am also designing this game to challenge myself by adding dynamic features such as 1 player, and 2 player modes. I also want the visuals of the game to change as the scores advance. This will keep the players interested and engaged. Here are a few features I want the game to have:

- Ability to toggle between "1 Player" and "2 Player" modes.
- Keep game score and a total of matches won - match scores will be saved to localstorage
- With each point scored - the styling will change. Indicating that the match is nearing an end.

## Game Logic

Create the user interface. It must include:

1. Selection menu at the top with a title, user options, and scores.
2. A <canvas> element where the game will actually be played.
3. Possibly a background image that spreads the whole page.

Create the canvas elements:

1. Player 1 paddle
2. Player 2 paddle
3. The ball

Create the gameplay. When the user hits the "Up" or "Down" arrow key the game will begin:

1. The ball will move at an angle towards Player 2's side.
2. User 2's paddle (either computer or human player) can move up and down to get in position for the ball.
3. If there's an object collision then the ball will bounce at an angle back towards user 1. If there is no collison then the ball will exit the screen and User 1 will score a point.
4. If the ball returns then User 1 will try to collide with the ball.
5. The first player to score 5 points wins the match.

Allow toggling between 1 Player and 2 Player modes:

1. In one player mode the user will face the computer's paddle. The computer will be tough to beat so I need to create a way for it to lose once in a while.
2. In two player mode - player1 will use the "W" and "S" keys to move their paddle up and down. Player 2 will use the "Up" and "Down" arrow keys(I'm not actually sure this is possible, but I'll try.)

Track the scores:

1. There will be two scoreboards at the top of the screen - one for the game score and one for the match score.
2. The game score will update when a point is scored.
3. The match score will update when a game is won.
4. The match score will be saved and loaded from localstorage until the user clicks the "reset" button or toggles player modes.

## Deliverables

### MVP Criteria

- The game will be playable by 1 or 2 players.
- The game will keep score, and the first player to reach 5 points will win the match.
- The game will notify players when a point is scored and when a match is won.
- The code will be well organized in different files. Variables and functions will be organized with encapsulation.
- Instructions will be included within the game and in the readme file.
- Code syntax will be well commented and very readable.

### Post-MVP Plans

- The game will play sounds when points are scored and matches are won.
- The match scores will be saved and retreived from localstorage.
- Ball movement will be more dynamic - maybe showing "squashing animations" and more random behavior.

## Project Planning

| Date      | Goals                                                                    |
| --------- | ------------------------------------------------------------------------ |
| Mon. 2/13 | Create GitHub repository. Complete README.md.                            |
| Wed. 2/15 | Have "pong" functionality working with object colision.                  |
| Sat. 2/18 | Have computer opponent moving on own and a "reset" button working.       |
| Mon. 2/20 | Be able to toggle between 1 and 2 players, and have background change.   |
| Wed. 2/22 | Have match scores save in localstorage, troubleshoot, improve styling.   |
| Sat. 2/25 | Deploy to GitHub Pages. Submit completed project. Project presentations. |
