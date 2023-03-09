const movement = {

    containsPiece(spaceIndex, board) {
        return !(board[spaceIndex] == null)
    },

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

    pieceIsWhite(pieceIndex, board) {
        if (board[pieceIndex][0] == 'W') return true;
        return false;
    },

    pawnHasMoved(pieceIndex, board) {
        if ((this.pieceIsWhite(pieceIndex, board) && Math.floor(pieceIndex/8) == 1) ||
          (! this.pieceIsWhite(pieceIndex, board) && Math.floor(pieceIndex/8) == 6)) 
           return false;
        
        return true; 

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
        for (let directionIndex = 0; directionIndex < directionsArray.length; directionIndex++) {
            for (let i = 0; i < directionsArray[directionIndex].length; i ++) {
                
                let spaceIndex = directionsArray[directionIndex][i]
                
                if (this.containsFriendlyPiece(pieceIndex, spaceIndex, board)) break;
                
                availableMoves.push(spaceIndex)

                if (this.containsEnemyPiece(pieceIndex, spaceIndex, board)) break;
            }          
        }
        return availableMoves;
    },

    getQueenMoves(pieceIndex, board) {
        let slidingMoves = this.getSlidingMoves(pieceIndex);
        let possibleMoves = [slidingMoves.north, slidingMoves.south, slidingMoves.west, slidingMoves.east,
                            slidingMoves.northWest, slidingMoves.southWest, slidingMoves.northEast, slidingMoves.southEast]

        return this.checkDirectionsForValidMoves(pieceIndex, possibleMoves, board);  
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

    getKingMoves(pieceIndex, board) {
        let slidingMoves = this.getSlidingMoves(pieceIndex)
        let directions = Object.keys(slidingMoves)
        let availableMoves = [];
        for (let i = 0; i < directions.length; i++) {
            let spaceIndex = slidingMoves[directions[i]][0]
            if (!this.containsFriendlyPiece(pieceIndex, spaceIndex, board)) availableMoves.push(spaceIndex) 
        }
        return availableMoves;
    },

    getKnightMoves(pieceIndex, board) {
        let slidingMoves = this.getSlidingMoves(pieceIndex);
        
        let ordinalAdjacentSpaces = [slidingMoves.northWest[0], slidingMoves.southWest[0], slidingMoves.northEast[0], slidingMoves.southEast[0]]
        let directionsX = [+1, +1, -1, -1]
        let directionsY = [-1, +1, -1, +1]
        
        let availableMoves = []

        for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
            let xSpaceIndex = ordinalAdjacentSpaces[directionIndex] + directionsX[directionIndex]
            if (((directionsX[directionIndex] < 0 && slidingMoves.east.length >= 2) ||
                (directionsX[directionIndex] > 0 && slidingMoves.west.length >= 2)) &&
                !this.containsFriendlyPiece(pieceIndex, xSpaceIndex, board))
            availableMoves.push(xSpaceIndex)
            
            let ySpaceIndex = ordinalAdjacentSpaces[directionIndex] + (directionsY[directionIndex] * 8)
            if (((directionsX[directionIndex] < 0 && slidingMoves.east.length >= 1) ||
                (directionsX[directionIndex] > 0 && slidingMoves.west.length >= 1)) &&
                !this.containsFriendlyPiece(pieceIndex, ySpaceIndex, board))
            availableMoves.push(ySpaceIndex)
        }
        
        return availableMoves;
    },

    getPawnMoves(pieceIndex, board) {
        let slidingMoves = this.getSlidingMoves(pieceIndex);
        let availableMoves = []

        let yDirection;
        if (this.pieceIsWhite(pieceIndex, board)) yDirection = "south";
        else yDirection = "north";

        let spaceIndex = slidingMoves[yDirection][0]
        if (!this.containsPiece(spaceIndex, board)) {
            availableMoves.push(spaceIndex)
            spaceIndex = slidingMoves[yDirection][1]
            if (!this.containsPiece(spaceIndex, board) && !this.pawnHasMoved(pieceIndex, board))
            availableMoves.push(spaceIndex)
        }

        spaceIndex = slidingMoves[yDirection + "East"][0]
        if (this.containsEnemyPiece(pieceIndex, spaceIndex, board)) availableMoves.push(spaceIndex)
        spaceIndex = slidingMoves[yDirection + "West"][0 ]
        if (this.containsEnemyPiece(pieceIndex, spaceIndex, board)) availableMoves.push(spaceIndex)

        
        return availableMoves;   
    },

    getAvailableMoves(pieceIndex, board) {
        let pieceType = board[pieceIndex][1]
        
        switch(pieceType) {
            case "P":
                return this.getPawnMoves(pieceIndex, board)
            case "N":
                return this.getKnightMoves(pieceIndex, board)
            case "B":
                return this.getBishopMoves(pieceIndex, board)
            case "R":
                return this.getRookMoves(pieceIndex, board)
            case "Q":
                return this.getQueenMoves(pieceIndex, board)
            case "K":
                return this.getKingMoves(pieceIndex, board)

        }
    }
}

module.exports = movement;