# Concentration Card Game
This React app is my version of the "Concentration" card game.

## Overview

I built this project using React, making extensive use of the useState and useEffect hooks to foster dynamic behavior and control rendering. The other technologies I used include:

- JavaScript: For proficient DOM manipulation
- CSS: Heavy use of Grid and Flexbox
- HTML
- Git

## Game Rules

- There are 16 tiles (or cards) on the board, each hiding a letter that may be revealed by the player.
- For each of the 8 letters in the game, there are two tiles.
- The player is only allowed to reveal the letters behind two tiles at a time.
- When two tiles sharing the same letter are revealed, they remain permanently revealed (no longer hidden).
- The player's goal is to reveal all 16 cards with as few moves (clicks) as possible.
- A new round begins each time the player reveals all 16 cards, challenging the player to beat their own record (lowest number of moves in a round), which is displayed each round.

## Future Plans

- Implement a difficulty setting, where the player can choose their difficulty level, scaling with the number of cards on the board.
- Use images instead of letters as the contents of the tiles.
- Add sound effects