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


                spacesToEdge.push(   
                    [numNorth,
                     numSouth,
                     numWest,
                     numEast,

                     numNorthWest,
                     numNorthEast,
                     numSouthWest,
                     numSouthEast ]           
                );
            }
        }
        
        return spacesToEdge;
    },

    getSlidingMoves(pieceIndex) {
        let spacesToEdge = this.calculatePositionData();
        
        let directionsX = [0, 0, +1, -1, +1, -1, +1, -1]
        let directionsY = [-1, +1, 0, 0, -1, -1, +1, +1]

        
        let availableSpaces = [
            [], [], [], [], [], [], [], []
        ]

        let directions = spacesToEdge[pieceIndex]
        
        for (let directionIndex = 0; directionIndex < 8; directionIndex++) {
            for (let j = 0; j < directions[directionIndex]; j++) {
                
                let spaceIndex = pieceIndex + ((j + 1) * directionsX[directionIndex]) + (((j + 1) * directionsY[directionIndex]) * 8)

                availableSpaces[directionIndex].push(spaceIndex)
            }
        }

        return {
            "north" : availableSpaces[0],
            "south" : availableSpaces[1],
            "west"  : availableSpaces[2],
            "east"  : availableSpaces[3],
            "northWest": availableSpaces[4],
            "northEast": availableSpaces[5],
            "southWest": availableSpaces[6],
            "southEast": availableSpaces[7]
        }
    },

    checkDirectionsForValidMoves(pieceIndex, directionsArray, board) {
        let availableMoves = []
        for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
            for (let i = 0; i < directionsArray[directionIndex].length; i ++) {
                
                let spaceIndex = directionsArray[directionIndex][i]
                
                if (this.containsFriendlyPiece(pieceIndex, spaceIndex, board)) break;
                
                availableMoves.push(spaceIndex)

                if (this.containsEnemyPiece(pieceIndex, spaceIndex, board)) break;
            }          
        }
        return availableMoves;
    },

    getRookMoves(pieceIndex, board) {
        let slidingMoves = this.getSlidingMoves(pieceIndex);
        let possibleMoves = [slidingMoves.north, slidingMoves.south, slidingMoves.west, slidingMoves.east]

        return this.checkDirectionsForValidMoves(pieceIndex, possibleMoves, board);
    },

    getBishopMoves(pieceIndex, board) {
        let slidingMoves = this.getSlidingMoves(pieceIndex);
        let possibleMoves = [slidingMoves.northWest, slidingMoves.southWest, slidingMoves.northEast, slidingMoves.southEast]

        return this.checkDirectionsForValidMoves(pieceIndex, possibleMoves, board);
    },

    getKnightMoves(pieceIndex, board) {
        let slidingMoves = this.getSlidingMoves(pieceIndex);
        
        let ordinalAdjacentSpaces = [slidingMoves.northWest[0], slidingMoves.southWest[0], slidingMoves.northEast[0], slidingMoves.southEast[0]]
    
        let directionsX = [+1, +1, -1, -1]
        let directionsY = [-1, +1, -1, +1]
        
        let availableMoves = []

        for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
            //let xSpaceIndex = ordinalAdjacentSpaces[directionIndex] + directionsX[directionIndex];
            //if ((slidingMoves.west.length > 2 && slidingMoves.east.length > 2))
            if ((directionsX[directionIndex] < 0 && slidingMoves.east.length >= 2) ||
                (directionsX[directionIndex] > 0 && slidingMoves.west.length >= 2))
            availableMoves.push(ordinalAdjacentSpaces[directionIndex] + directionsX[directionIndex])
            
            if ((directionsX[directionIndex] < 0 && slidingMoves.east.length >= 1) ||
                (directionsX[directionIndex] > 0 && slidingMoves.west.length >= 1))
            availableMoves.push(ordinalAdjacentSpaces[directionIndex] + (directionsY[directionIndex] * 8))
        }
        let data = this.calculatePositionData();
        console.log(data[pieceIndex])
        
        return availableMoves;
    }

}

module.exports = movement;