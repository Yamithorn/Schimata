// Possibly to refactor, had a boolean (default false) for each cell and when clicked on, it turns to true
// and have base coordinates of where each cell is located and have it unique to each of them then based on which one is clicked
// have them rearrange themselves within the grid and have it work side to side with a 5 by array of booleans to tell the state if each
// cell inside of the puzzle field

export default function ShapeContainer(cellArray) { // cellArray is an array that stores cells to draw them
    this.cellArray = cellArray;
    this.locus = null;
}

ShapeContainer.prototype.draw = function (context) {

    let length = this.cellArray.length;

    for (let i = 0; i < length; i++) {
        // debugger;
        // add conditional for when it is clicked to toggle between colors
        context.fillStyle = this.cellArray[i].clicked ? this.cellArray[i].clickedColor : this.cellArray[i].baseColor;
        context.fillRect(this.cellArray[i].xPos, this.cellArray[i].yPos, this.cellArray[i].cellSize, this.cellArray[i].cellSize);
    }
};

ShapeContainer.prototype.contains = function (mouseX, mouseY) {

    let length = this.cellArray.length;

    for (let i = 0; i < length; i++) {
        if ((mouseX >= this.cellArray[i].xPos) && (mouseX <= (this.cellArray[i].xPos + this.cellArray[i].cellSize)) &&
            (mouseY >= this.cellArray[i].yPos) && (mouseY <= (this.cellArray[i].yPos + this.cellArray[i].cellSize))) {
                // Make this cell true by having it store the state of the cell clicked as well, otherwise it is null
                // console.log(this.cellArray[i].message);
                this.locus = [this.cellArray[i].xGrid, this.cellArray[i].yGrid]; // [0, 0]; //
                console.log(this.cellArray[i].message);
                // debugger;
                this.cellArray[i].clicked = true;
                return true;
                // console.log("clicking");
        }
    }
};

ShapeContainer.prototype.overlapping = function (mouseX, mouseY, gridXPosition, gridYPosition, gridWidth, gridHeight, gridCellSize) {

    let gridSize = (gridWidth / gridCellSize) * (gridHeight / gridCellSize);

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
 
            if ((mouseX >= gridXPosition + (gridCellSize * j)) && (mouseX <= gridXPosition + (gridCellSize * (j + 1))) &&
                (mouseY >= gridYPosition + (gridCellSize * i)) && (mouseY <= gridYPosition + (gridCellSize * (i + 1)))) {

                let length = this.cellArray.length;

                for (let k = 0; k < length; k++) {

                    // debugger;
                    if (this.locus[0] > this.cellArray[k].xGrid) { // 
    
                        if (this.locus[1] > this.cellArray[k].yGrid) {
                            // debugger;
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * (j - this.locus[0]))) - (this.cellArray[k].xGrid * gridCellSize);
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * Math.abs(i - this.locus[1]))) + (this.cellArray[k].yGrid * gridCellSize);
                        }

                        else if (this.locus[1] === this.cellArray[k].yGrid) {
                            // debugger;
                            // this.cellArray[k].xPos = (gridXPosition + (gridCellSize * j)) - (this.cellArray[k].xGrid * gridCellSize);
                            // this.cellArray[k].yPos = gridYPosition + (gridCellSize * i);
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * (j - this.locus[0]))) - (this.cellArray[k].xGrid * gridCellSize);
                            this.cellArray[k].yPos = gridYPosition + (gridCellSize * i);
                        }

                        else if (this.locus[1] < this.cellArray[k].yGrid) { // 
                            // debugger;
                            // this.cellArray[k].xPos = (gridXPosition + (gridCellSize * j)) - (this.cellArray[k].xGrid * gridCellSize);
                            // this.cellArray[k].yPos = (gridYPosition + (gridCellSize * i)) + (this.cellArray[k].yGrid * gridCellSize);
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * (j - this.locus[0]))) - (this.cellArray[k].xGrid * gridCellSize);
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * (i - this.locus[1]))) + (this.cellArray[k].yGrid * gridCellSize);
                        }
                    }

                    else if (this.locus[0] === this.cellArray[k].xGrid) { //
                        
                        if (this.locus[1] > this.cellArray[k].yGrid) {
                            // debugger;
                            // this.cellArray[k].xPos = gridXPosition + (gridCellSize * j);
                            this.cellArray[k].xPos = gridXPosition + (gridCellSize * j);
                            // this.cellArray[k].yPos = (gridYPosition + (gridCellSize * i)) - (this.cellArray[k].yGrid * gridCellSize);
                            this.cellArray[k].yPos = Math.abs((gridYPosition + (gridCellSize * (i - this.locus[1]))) + (this.cellArray[k].yGrid * gridCellSize));
                        }

                        else if (this.locus[1] === this.cellArray[k].yGrid) {
                            // debugger;
                            this.cellArray[k].xPos = gridXPosition + (gridCellSize * j);
                            this.cellArray[k].yPos = gridYPosition + (gridCellSize * i);
                        }

                        else if (this.locus[1] < this.cellArray[k].yGrid) {
                            // debugger;
                            this.cellArray[k].xPos = gridXPosition + (gridCellSize * j);
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * (i - this.locus[1]))) + (this.cellArray[k].yGrid * gridCellSize);
                        }
                    }

                    else if (this.locus[0] < this.cellArray[k].xGrid) { //
                        
                        if (this.locus[1] > this.cellArray[k].yGrid) {
                            // debugger;
                            // this.cellArray[k].xPos = (gridXPosition + (gridCellSize * j));
                            // this.cellArray[k].yPos = (gridYPosition + (gridCellSize * i)) - (this.cellArray[k].yGrid * gridCellSize);

                            // this.cellArray[k].xPos = (gridXPosition + (gridCellSize * (j - this.cellArray[k].xGrid)));
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * (j + this.cellArray[k].xGrid)));
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * (i - this.locus[1]))) + (this.cellArray[k].yGrid * gridCellSize);
                        }

                        else if (this.locus[1] === this.cellArray[k].yGrid) { //
                            // debugger;
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * j)) + (this.cellArray[k].xGrid * gridCellSize);
                            // this.cellArray[k].yPos = gridYPosition + (gridCellSize * i) + (this.cellArray[k].yGrid * gridCellSize);
                            this.cellArray[k].yPos = gridYPosition + (gridCellSize * (i - this.locus[1])) + (this.cellArray[k].yGrid * gridCellSize);
                        }

                        else if (this.locus[1] < this.cellArray[k].yGrid) {
                            // debugger;
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * j)) + (this.cellArray[k].xGrid * gridCellSize);
                            // this.cellArray[k].yPos = (gridYPosition + (gridCellSize * i)) + (this.cellArray[k].yGrid * gridCellSize);
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * (i - this.locus[1]))) + (this.cellArray[k].yGrid * gridCellSize);
                        }
                    }
                }
                return;
            }
        }
    }
};

ShapeContainer.prototype.overlapOtherShape = function(firstShape, secondShape) {
    
};