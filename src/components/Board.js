import Square from "./Square";
import React, { useState } from "react";
import pieces from "./images/index";
import movement from "./lib/movement";

//space colors
const white = "#dbd8e3";
const black = "#5c5470";
const red =   "#f95959";

const Board = () => {
  const [selectedSpace, setSelectedSpace] = useState(null); // Space selected by the user for the selected piece to move to.
  const [pieceToMove, setPieceToMove] = useState(null); // Piece selected by the user.
  const [animating, setAnimating] = useState(false); // True while a piece is playing a movement animation.
  const [colorToMove, setColorToMove] = useState("W"); // "W" when it's white's turn, "B" when it's black's turn.
  const [availableSpaces, setAvailableSpaces] = useState([]);

  const [board, setBoard] = useState([
    "WR", "WN", "WB", "WK", "WQ", "WB", "WN", "WR",
    "WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP",
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    "BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP",
    "BR", "BN", "BB", "BK", "BQ", "BB", "BN", "BR",
  ]);
  
 
  function handleClick(space) {
    // Check if the space contains a piece and if the piece belongs to current color. 
    if (board[space] != null && board[space][0] == colorToMove) {
      setPieceToMove([space]); // Select piece on this space.
      setAvailableSpaces(movement.getAvailableMoves(space, board)) // Get all moves that this piece can make.
      return true;
    }

    // Check if the user has already selected a piece, and if the space they selected is legal.
    else if (pieceToMove != null && availableSpaces.includes(space)) {
      setAvailableSpaces([]); // Clear available moves.
      movePiece(space); 
      switchColorToMove();
      return true;
    }

    else return false;
  }

  function movePiece(space) {
    let info = document.getElementById("game-info-text");
    let moveDiv = document.createElement("div");
    let text = document.createTextNode(moveToString(space));
    moveDiv.appendChild(text);  // Create a new div with the current move as its text.
    info.appendChild(moveDiv);

    setSelectedSpace([space]);
    setAnimating(true); // Animate piece move transition.

      setTimeout(() => { // Execute after piece has finished animation.
        setAnimating(false);
        const newBoard = board.slice(); 
        newBoard[space] = board[pieceToMove]; // Move piece to new space.
        newBoard[pieceToMove] = null; // Set old space to empty.

        setPieceToMove(null); // Clear selected piece.
        setBoard(newBoard);
      }, 200);
  }

  // Converts a given move to a string in the format "BP to a5".
  function moveToString(space) {
    let letters = 'abcdefgh';
    return(board[pieceToMove] + " to " + letters[space%8] + (Math.floor(space/8) + 1));
  }

  function switchColorToMove() {
    if (colorToMove === "B") setColorToMove("W");
    else setColorToMove("B"); 
  }

  // Creates a square on the board given a background color, piece image, and animation. 
  function makeSquare(space, color, image, animatePiece) {
    let animation = "";
    
    try {
      // Setup movement animation
      let xDifference = (selectedSpace % 8) - (pieceToMove % 8)
      let yDifference = Math.floor(selectedSpace/8) - Math.floor(pieceToMove/8);
      // Apply if the piece is animating.
      if (animatePiece && pieceToMove == space) {
        animation = `translate3d(${xDifference * 75}px, ${
          yDifference * 75
        }px, 0px)`;
      }
    } catch {}
  
    return (
      <Square
        img={pieces.get(image)}
        style={{
          background: color,
          boarder: '1px solid black',
        }}
        imageStyle={{
          transform: animation,
          transition: "transform .2s ease-in-out",
        }}
        onClick={() => handleClick(space)}
        onAnimationEnd={() => setAnimating(false)}
      />
    );
  }
  /*
  Main function for drawing the chess board and the pieces.
  Returns 9 divs that each contain 9 squares. The images the
  squares contain is determined by the "board" useState.
  */
  function drawBoard() {
    

    //Create array to store board elements.
    let squares = [];
    for (let row = 0; row < 8; row++) {
      //Create array to store elements of this row.
      let squareRow = [];
      for (let col = 0; col < 8; col++) {
        //Every even square is white and every odd is black.
        let isWhite = (col + row) % 2 === 0;

        let animate = false;
        if (animating) animate = true;

        if (availableSpaces.includes(col + (row * 8)))
          squareRow.push(makeSquare(col + (row * 8), red, board[col + (row * 8)], animate));
        else if (isWhite)
          squareRow.push(makeSquare(col + (row * 8), white, board[col + (row * 8)], animate));
        else
          squareRow.push(makeSquare(col + (row * 8), black, board[col + (row * 8)], animate));
      }
      squares.push(squareRow);
    }
    return (
      <div className="board" >
        <div>{squares[0]}</div>
        <div>{squares[1]}</div>
        <div>{squares[2]}</div>
        <div>{squares[3]}</div>
        <div>{squares[4]}</div>
        <div>{squares[5]}</div>
        <div>{squares[6]}</div>
        <div>{squares[7]}</div>
      </div>
    );
  }

  return drawBoard();
};

export default Board;
