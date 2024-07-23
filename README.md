This React app is my version of the "Concentration" card game.

-------------------------------------------------------------------

I built this project using React where I made extensive use of the useState and useEffect hooks to foster dynamic behaviour and control rendering. Other technologies I used include JavaScript for proficient DOM manipulation, CSS (heavy use of grid and flexbox), HTML, and Git.

-------------------------------------------------------------------

Here are the rules of the game:

There are 16 tiles (or cards) on the board, each hiding a letter that may be revealed by the player. For each of the 8 letters in the game, there are two tiles. The player is only allowed to reveal the letters behind two tiles at a time. When two tiles sharing the same letter are revealed, they are permanently revealed (no longer hidden). The player's goal is to reveal all 16 cards with as little moves (clicking a tile to reveal it) as possible. A new round begins each time the player reveals all 16 cards, challenging the player to beat their own record (lowest number of moves in a round), which is displayed each round.

-------------------------------------------------------------------

In the future, I plan to implement a difficulty setting, where the player is allowed to choose their difficulty, which scales with the number of cards on the board. I also plan to use images instead of letters as the contents of the tiles.
