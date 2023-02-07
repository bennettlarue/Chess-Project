const movement = {

    calculatePositionData : () => {
        let spacesToEdge = [];
        
        for (let col = 0; col < 8; col++) {
            for (let row = 0; row < 8; row++) {

                let numNorth = col;
                let numSouth = col - 7;
                let numWest = row -7;
                let numEast = row;

                //let spaceIndex = col + (row * 8);

                spacesToEdge.push({
                    numNorth,
                    numSouth,
                    numWest,
                    numEast
                });
            }
        }
        
        return spacesToEdge;
    }
}

module.exports = movement;