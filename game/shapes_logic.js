// Possibly to refactor, had a boolean (default false) for each cell and when clicked on, it turns to true
// and have base coordinates of where each cell is located and have it unique to each of them then based on which one is clicked
// have them rearrange themselves within the grid and have it work side to side with a 5 by array of booleans to tell the state if each
// cell inside of the puzzle field

export default function ShapeContainer(cellArray) { // cellArray is an array that stores cells to draw them
    this.cellArray = cellArray;
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

                    // let length = this.colorArray.length;
                    let length = this.cellArray.length;

                    for (let k = 0; k < length; k++) {
                        // this.xCoordArray[k] = gridXPosition + (gridCellSize * j);
                        // this.yCoordArray[k] = gridYPosition + (gridCellSize * i);
                    }

                    // console.log(`The x coordinate for the cell is ${this.xCoordArray[j]} and the coordinate is ${gridCellSize * i}`);
                    // console.log(`The y coordinate for the cell is ${this.yCoordArray[i]} and the coordinate is ${gridCellSize * i}`);
            }
        }
    }
};