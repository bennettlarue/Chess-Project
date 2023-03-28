# Chess in React

## Description
This project is a simple implementation of chess using react. I it wrote in my free time as a way to strength my skills in ths library and in Javascript in general, as well as a way to gain experience in completing and deploying web projects. I had a lot of fun making it and in the process I gained some valuable experience in publishing my work to github and managing larger scale project consisting of several Javascript, CSS, HTML files and various assets.

## Features
* Chess rules are enforced by calculating the legal moves for each piece and only allowing the player to make one of those moves.
* Piece movements are animated!
* All pervious moves are logged to the "Moves" box.

## How to Play
Starting with white, the player may select any piece of the current color by clicking it. Each space they can move that piece to will be displayed in red, and they may move the piece to one of these spaces by clicking it. 

## How it works
* The game works by storing the information of the board in an array. On this array, pieces are denoted as two character strings, with the first letter representing its color and the second representing what kind of piece it is. For example the piece for a black pawn would be "BP". Empty spaces are denoted as null.
* In order to display the board, the program iterates through this array, adding an empty square to the page if the value is null, and if it contains a piece value, it adds the image of that piece to square.
* When a space is clicked by the user that contains a piece of the color to move, the location of that piece in the array is stored in a variable. All of the possible moves that that piece can make are calculated and stored in an array.
* Next, if the user selects a space that exists in the array of possible moves, then the selected piece is moved to that space and its pervious position is set to null. 