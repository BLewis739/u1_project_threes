# Threes in Javascript

# Date: 3/10/22

### By: Brad Lewis

[GitHub](https://github.com/BLewis739) | [LinkedIn](https://www.linkedin.com/in/brad-lewis-8b110a100/)

---

## **_Description_**

Threes game is similar to the popular 2048 game. The player is given a board of tiles and uses the arrow keys to move them. When smaller titles combine, they change their values to higher numbers. Once the board is full and no moves can be made, the game is over and the player's score is calculated.

The startegy of threes differs from 2048 because there is a greater variety in the values of new tiles. In 2048, every new tile is a 2 or 4, so a player can simply stack tiles along one edge of the board indefinitely. In threes, higher value tiles are often generated as new tiles, which can disrupt a player's attempt to place higher value tiles along an edge.

The original threes game is available here: [Play Threes Game](http://play.threesgame.com/)

---

## **_Development_**

This game was built as a project for the General Assembly Software Engineering Immersive course. It utilizes HTML, CSS, and JavaScript in its design, with the game mechanics run entirely in JavaScript.

The gameplay is slightly modified compared to the original threes game. This version has more elements of chance, which makes conventional strategy more difficult to use. Games such as threes and 2048 are primarily based in skill until late in the game, when elements of chance play a bigger role. However in this version, chance plays a bigger role earlier in the game, making it likely that even a skilled player will struggle to advance for a high amount of turns.

The biggest change to the mechanics is in the generation of new tiles. The game begins with two 1 and 2 tiles on the board, and a queue of 25 tiles containing 36% 1 tiles, 36% 2 tiles, and 28% 3 tiles (this is found in the makeFirstTileQueue function). After this queue is depleted, the queue is refreshed every 21 tiles.

The new tile queues are primarily tiles of 1, 2, and 3. However, some large tiles can also appear in the queue. This is the distribution of tiles in the later queues:

28.6% 1 tiles
28.6% 2 tiles
23.8% 3 tiles
4.8% 6 tiles
14.2% large tiles

The large tiles are chosen using random selection based on the tiles currently present on the board. The value of the largest tile is set as the current maximum. Three larger tiles are then selected. The maximum of the first tile is 1 value lower than the current highest tile. However, it could be as low as 2 or 3 values lower than the highest tile, because there is a random subtraction factor that subtracts and additional 0-2 values.

The next large tiles are at least 2 or 3 values lower than the highest tile, and have the same 0-2 subtraction factor. The minimum value of the large tile is 3, so if any of the subtraction factors cause the value to get too low, it will be adjusted to be three.

Here is an example of how these random subtraction factors can cause unpredictability in the tile queue. Let's consider a board where the highest value tile is 384.

The order of tile values following 384 is 192, 96, 48, 24, 12, 6, and 3.

Highest value tile: 384
First large tile: 192, 96, or 48
Second large tile: 96, 48, or 24
Third large tile: 48, 24, or 12

These tiles are inserted into the tile queue and then appear randomly as the player makes moves. The reason that this causes unpredictability is because 85.8% of tiles are small values. It is strategic for the player to try to stack these tiles on one side of the board so they can be combined more easily while staying separate from the higher value tiles. However when there are larger value tiles in the queue, the player must decide how to deviate from traditional strategy.

In testing the game, these changes made it significantly more challenging. To compensate, two other major changes have been made to aid players. First, in the traditional threes game, while larger tiles were part of the queue, their exact identity was hidden in the tile preview. So players could see a large tile was next, but would not know whether it was as high as 192 or as low as 6. In this version, the exact tile value is shown in the preview.

The other major change is that it is possible to generate a new tile even if a move cannot be made in a certain direction. New tiles always appear on the side of the board opposite the direction of the move. For example, a down move causes a tile to appear in the top row. In traditional threes and 2048, if it is impossible to move downward, then the game does not allow a tile to be generated for the top row, even if there is space. In this version, the new tile can be generated in the top row even if the downward move cannot be made.
