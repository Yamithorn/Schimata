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
                // console.log(this.cellArray[i].message);
                // debugger;
                this.cellArray[i].clicked = true;
                return true;
                // console.log("clicking");
        }
    }
};

ShapeContainer.prototype.overlapping = function (mouseX, mouseY, gridXPosition, gridYPosition, gridWidth, gridHeight, gridCellSize, grid) {

    let gridSize = (gridWidth / gridCellSize);

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {

            let length = this.cellArray.length;
            let mouseCenterX = Math.trunc((mouseX + Math.abs(mouseX - gridCellSize)) / 2);
            let mouseCenterY = Math.trunc((mouseY + Math.abs(mouseY - gridCellSize)) / 2);
            let gridXCellTop = gridXPosition + (gridCellSize * j);
            let gridYCellTop = gridYPosition + (gridCellSize * i);
            let gridXCellBottom = gridXPosition + (gridCellSize * (j + 1));
            let gridYCellBottom = gridYPosition + (gridCellSize * (i + 1));

            if (mouseX >= gridXCellTop && 
                mouseX <= gridXCellBottom &&
                mouseY >= gridYCellTop && 
                mouseY <= gridYCellBottom) {

            // if (mouseCenterX >= gridXCellTop && 
            //     mouseCenterX <= gridXCellBottom && 
            //     mouseCenterY >= gridYCellTop && 
            //     mouseCenterY <= gridYCellBottom) {

                for (let k = 0; k < length; k++) {

                    if (this.locus[0] > this.cellArray[k].xGrid) { // 
                        if (this.locus[1] > this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * (j - this.locus[0]))) - (this.cellArray[k].xGrid * gridCellSize);
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * Math.abs(i - this.locus[1]))) + (this.cellArray[k].yGrid * gridCellSize);

                            if (this.cellArray[k].cover[0] !== null && this.cellArray[k].cover[1] !== null) {
                                grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = false;
                            }

                            this.cellArray[k].cover = [(j - this.locus[0]) + this.cellArray[k].xGrid, (i - this.locus[1]) + this.cellArray[k].yGrid];
                            grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = true;
                        }

                        else if (this.locus[1] === this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * (j - this.locus[0]))) - (this.cellArray[k].xGrid * gridCellSize);
                            this.cellArray[k].yPos = gridYPosition + (gridCellSize * i);

                            if (this.cellArray[k].cover[0] !== null && this.cellArray[k].cover[1] !== null) {
                                grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = false;
                            }

                            this.cellArray[k].cover = [(j - this.locus[0]) + this.cellArray[k].xGrid, (i - this.locus[1]) + this.cellArray[k].yGrid];
                            grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = true;
                        }

                        else if (this.locus[1] < this.cellArray[k].yGrid) { // 
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * (j - this.locus[0]))) - (this.cellArray[k].xGrid * gridCellSize);
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * (i - this.locus[1]))) + (this.cellArray[k].yGrid * gridCellSize);

                            if (this.cellArray[k].cover[0] !== null && this.cellArray[k].cover[1] !== null) {
                                grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = false;
                            }
                            
                            this.cellArray[k].cover = [(j - this.locus[0]) + this.cellArray[k].xGrid, (i - this.locus[1]) + this.cellArray[k].yGrid];
                            grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = true;
                        }
                    }

                    else if (this.locus[0] === this.cellArray[k].xGrid) { //
                        if (this.locus[1] > this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = gridXPosition + (gridCellSize * j);
                            this.cellArray[k].yPos = Math.abs((gridYPosition + (gridCellSize * (i - this.locus[1]))) + (this.cellArray[k].yGrid * gridCellSize));
                            
                            if (this.cellArray[k].cover[0] !== null && this.cellArray[k].cover[1] !== null) {
                                grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = false;
                            }

                            this.cellArray[k].cover = [(j - this.locus[0]) + this.cellArray[k].xGrid, (i - this.locus[1]) + this.cellArray[k].yGrid];
                            grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = true;
                        }

                        else if (this.locus[1] === this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = gridXPosition + (gridCellSize * j);
                            this.cellArray[k].yPos = gridYPosition + (gridCellSize * i);
                            
                            if (this.cellArray[k].cover[0] !== null && this.cellArray[k].cover[1] !== null) {
                                grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = false;
                            }

                            this.cellArray[k].cover = [(j - this.locus[0]) + this.cellArray[k].xGrid, (i - this.locus[1]) + this.cellArray[k].yGrid]; // checked
                            grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = true;
                        }

                        else if (this.locus[1] < this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = gridXPosition + (gridCellSize * j);
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * (i - this.locus[1]))) + (this.cellArray[k].yGrid * gridCellSize);
                            
                            if (this.cellArray[k].cover[0] !== null && this.cellArray[k].cover[1] !== null) {
                                grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = false;
                            }

                            this.cellArray[k].cover = [(j - this.locus[0]) + this.cellArray[k].xGrid, (i - this.locus[1]) + this.cellArray[k].yGrid];
                            grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = true;
                        }
                    }

                    else if (this.locus[0] < this.cellArray[k].xGrid) { //
                        if (this.locus[1] > this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * (j + this.cellArray[k].xGrid)));
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * (i - this.locus[1]))) + (this.cellArray[k].yGrid * gridCellSize);
                            
                            if (this.cellArray[k].cover[0] !== null && this.cellArray[k].cover[1] !== null) {
                                grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = false;
                            }

                            this.cellArray[k].cover = [(j - this.locus[0]) + this.cellArray[k].xGrid, (i - this.locus[1]) + this.cellArray[k].yGrid];
                            grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = true;
                        }

                        else if (this.locus[1] === this.cellArray[k].yGrid) { //
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * j)) + (this.cellArray[k].xGrid * gridCellSize);
                            this.cellArray[k].yPos = gridYPosition + (gridCellSize * (i - this.locus[1])) + (this.cellArray[k].yGrid * gridCellSize);
                            
                            if (this.cellArray[k].cover[0] !== null && this.cellArray[k].cover[1] !== null) {
                                grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = false;
                            }

                            this.cellArray[k].cover = [(j - this.locus[0]) + this.cellArray[k].xGrid, (i - this.locus[1]) + this.cellArray[k].yGrid];
                            grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = true;
                        }

                        else if (this.locus[1] < this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * j)) + (this.cellArray[k].xGrid * gridCellSize);
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * (i - this.locus[1]))) + (this.cellArray[k].yGrid * gridCellSize);
                           
                            if (this.cellArray[k].cover[0] !== null && this.cellArray[k].cover[1] !== null) {
                                grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = false;
                            }
                            
                            this.cellArray[k].cover = [(j - this.locus[0]) + this.cellArray[k].xGrid, (i - this.locus[1]) + this.cellArray[k].yGrid];
                            grid[this.cellArray[k].cover[1]][this.cellArray[k].cover[0]] = true;
                        }
                    }
                }
                return true;
            }

            else {
                for (let k = 0; k < length; k++) { 
                    this.cellArray[k].xPos = this.cellArray[k].originX;
                    this.cellArray[k].yPos = this.cellArray[k].originY;

                    // if (this.cellArray[k].cover[0] !== null && this.cellArray[k].cover[1] !== null) {
                    //     grid[this.cellArray[k].cover[0]][this.cellArray[k].cover[1]] = false;
                    // }
                }
            }
        }
    }
};

ShapeContainer.prototype.overlappingOtherShapes = function(shape, cellSize) {
    let cellArrayLength = this.cellArray.length;
    let shapeLength = shape.cellArray.length;

    for (let i = 0; i < cellArrayLength; i++) {
        for (let j = 0; j < shapeLength; j++) {

            if (this.cellArray[i].xPos < (shape.cellArray[j].xPos + Math.trunc(cellSize/2)) && 
                (this.cellArray[i].xPos + Math.trunc(cellSize/2)) > shape.cellArray[j].xPos &&
                this.cellArray[i].yPos < (shape.cellArray[j].yPos + Math.trunc(cellSize/2)) && 
                (this.cellArray[i].yPos + Math.trunc(cellSize/2)) > shape.cellArray[j].yPos) {
            // if (this.cellArray[i].xPos < (shape.cellArray[j].xPos + cellSize) &&
            //     (this.cellArray[i].xPos + cellSize) > shape.cellArray[j].xPos &&
            //     this.cellArray[i].yPos < (shape.cellArray[j].yPos + cellSize) &&
            //     (this.cellArray[i].yPos + cellSize) > shape.cellArray[j].yPos) {

                this.cellArray[i].xPos = this.cellArray[i].originX;
                this.cellArray[i].yPos = this.cellArray[i].originY;
                return true;
            }
        }
    }
    // return false;
};