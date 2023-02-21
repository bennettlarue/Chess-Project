const movement = {

    containsFriendlyPiece(pieceIndex, spaceIndex, board) {
        let pieceValue = board[pieceIndex]
        let spaceValue = board[spaceIndex]

        if (spaceValue != null && pieceValue[0] === spaceValue[0]) {
            return true;
        }

        return false;
    },
    
    containsEnemyPiece(pieceIndex, spaceIndex, board) {
        let pieceValue = board[pieceIndex]
        let spaceValue = board[spaceIndex]

        if (spaceValue != null && pieceValue[0] !== spaceValue[0]) {
            return true;
        }

        return false;
    },

    calculatePositionData() {
        let spacesToEdge = [];
        
        for (let col = 0; col < 8; col++) {
            for (let row = 0; row < 8; row++) {

                let numNorth = col;
                let numSouth = Math.abs(col - 7);
                let numWest = Math.abs(row -7);
                let numEast = row;
                let numNorthWest = Math.min(numNorth, numWest);
                let numNorthEast = Math.min(numNorth, numEast);
                let numSouthWest = Math.min(numSouth, numWest); 
                let numSouthEast = Math.min(numSouth, numEast); 


                spacesToEdge.push({
                    "cardinalDirections":   
                        [numNorth,
                         numSouth,
                         numWest,
                         numEast],

                    "ordinalDirections":
                    [numNorthWest,
                     numNorthEast,
                     numSouthWest,
                     numSouthEast ]           
                });
            }
        }
        
        return spacesToEdge;
    },

    getCardinalSlidingMoves(pieceIndex, board) {
        let spacesToEdge = this.calculatePositionData();
        
        let directionsX = [0, 0, +1, -1]
        let directionsY = [-1, +1, 0, 0]

        let availableSpaces = []
        let cardinalDirections = spacesToEdge[pieceIndex]["cardinalDirections"]
        

        for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
            for (let j = 0; j < cardinalDirections[directionIndex]; j++) {
                
                let spaceIndex = pieceIndex + ((j + 1) * directionsX[directionIndex]) + (((j + 1) * directionsY[directionIndex]) * 8)

                if (this.containsFriendlyPiece(pieceIndex, spaceIndex, board)) break;

                availableSpaces.push(spaceIndex)

                if (this.containsEnemyPiece(pieceIndex, spaceIndex, board)) break;
            }
        }

        return availableSpaces;
    },

    getOrdinalSlidingMoves(pieceIndex, board) {

        let spacesToEdge = this.calculatePositionData();
        
        let directionsX = [+1, -1, +1, -1]
        let directionsY = [-1, -1, +1, +1]

        let availableSpaces = []
        let ordinalDirections = spacesToEdge[pieceIndex]["ordinalDirections"]
        
        for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
            for (let j = 0; j < ordinalDirections[directionIndex]; j++) {
                let spaceIndex = pieceIndex + ((j + 1) * directionsX[directionIndex]) + (((j + 1) * directionsY[directionIndex]) * 8)
                //let spaceValue = board[spaceIndex]

                if (this.containsFriendlyPiece(pieceIndex, spaceIndex, board)) break;

                availableSpaces.push(spaceIndex)

                if (this.containsEnemyPiece(pieceIndex, spaceIndex, board)) break;
            }
        }

        return availableSpaces;
    }

}

module.exports = movement;