# tic-tac-toe

In this exercise, you will create a simple [tic-tac-toe](https://en.wikipedia.org/wiki/Tic-tac-toe) game. Two players will sit at the computer and take turns clicking on squares to indicate where they would like to move. When one player has won, the game ends.

When you need a break, marvel at how [this song](https://www.youtube.com/watch?v=0uLI6BnVh6w) is applicable but still pretty boring.

This will be more free-form than the others. I've provided a little structure, but most of it is up to you. Have fun with it! Feel free to look at prior exercises for an example of how things could work. If you're not totally sure where some functionality belongs, don't worry, and just keep moving forward. Done is better than perfect. Functionality can always be moved around later, but if the app works, then we're in good shape.

## Setup

Install the dependencies:

```
npm install
```

Run the server:

```
npm start
```

(There is no `index.html` yet, so you won't see anything when you run the server.)

## Implementation

You should commit after each one of these steps. You may commit more often if you'd like.

1. Create the `index.html` and `index.css` files. `index.js` has been provided for you.
    * In `index.html`, include `jquery` on the page. You can load it via a CDN, or you can copy the jquery script from another directory in this project and source it on the page.
1. Add the basic view structure to `index.html`.
    * Later, we make everything dynamic. For now, just hardcode things, and we'll make it interactive later.
    * Include a header, like "medium-budget tic-tac-toe game"
    * Add a board for the game.
    * Add an indicator of whose turn it is.
1. Add the ability to switch turns by clicking on a grid space.
    * Don't worry about actually placing pieces; just update the "whose turn is it now" indicator in the view.
1. Add the ability to mark a grid space with a player's piece.
    * Don't worry about ensuring that you can't overwrite an existing piece. Just update the clicked grid space to have the current player's piece.
1. Only allow players to click on empty space.
    * Clicking on a space that already has a piece should have no effect.
1. After each piece is placed, check to see if the game has been won.
    * If it has, display a message indicating who the winner is.
    * If there is a tie, display that as well.
1. Add a button to reset the game back to the initial state.
1. Save and load the current game state in local storage.
1. After the game is won, highlight the winning line of pieces in some way.
1. Make the app look good on mobile.
    * Make the app usable via touch.
1. As players keep playing and hitting "reset" to start new games, keep a record of past games.
    * Display how many games each player has won.
    * Display how many games have ended in a tie.
    * Display how many games have been reset before ending.
    * Persist this information in local storage.
1. Add a button to let the computer decide where to move next.
    * At first, the computer should just randomly place a piece.
1. Make the computer a little smarter.
    * Follow this algorithm (or anything else you come up with):
        * If you can win in one move, place a piece in that spot.
        * If you already have a piece on the board, and there is a possible way to construct a win with that piece, place another piece to work towards that win.
        * Otherwise, pick a spot at random and put a piece there.
1. Add a less opaque version of the X or O when hovering over the square.
1. Add ability to flip coin to determine who goes first
1. Add game over state to tied games

Good luck!
