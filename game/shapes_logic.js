export default function ShapeContainer(shapeArray) { // shapeArray is an array that store shape objects to draw them
    
    // let length = shapeArray.length;

    // this.xCoordArray = [];
    // this.yCoordArray = [];
    // this.shapeWidthArray = [];
    // this.shapeHeightArray = [];
    // this.colorArray = [];

    this.shapeArray = shapeArray;

    // Possibly to refactor, had a boolean (default false) for each cell and when clicked on, it turns to true
    // and have base coordinates of where each cell is located and have it unique to each of them then based on which one is clicked
        // have them rearrange themselves within the grid and have it work side to side with a 5 by array of booleans to tell the state if each
        // cell inside of the puzzle field

    // for (let i = 0; i < length; i++) {
    //     this.xCoordArray.push(shapeArray[i].xCoord);
    //     this.yCoordArray.push(shapeArray[i].yCoord);
    //     this.shapeWidthArray.push(shapeArray[i].shapeWidth);
    //     this.shapeHeightArray.push(shapeArray[i].shapeHeight);
    //     this.colorArray.push(shapeArray[i].color);
    // }
}

ShapeContainer.prototype.draw = function (context) {

    // let length = this.colorArray.length;
    let length = this.shapeArray.length;

    for (let i = 0; i < length; i++) {
        // console.log(this.shapeArray[i].message);
        // debugger
        context.fillStyle = this.shapeArray[i].color;
        context.fillRect(this.shapeArray[i].xCoord, this.shapeArray[i].yCoord, this.shapeArray[i].shapeWidth, this.shapeArray[i].shapeHeight);
    }
};

ShapeContainer.prototype.contains = function (mouseX, mouseY) {

    // let length = this.colorArray.length;
    let length = this.shapeArray.length;

    for (let i = 0; i < length; i++) {
        // if ((mouseX >= this.xCoordArray[i]) && (mouseX <= (this.xCoordArray[i] + this.shapeWidthArray[i])) && 
        //     (mouseY >= this.yCoordArray[i]) && (mouseY <= (this.yCoordArray[i] + this.shapeHeightArray[i]))) {
        if ((mouseX >= this.shapeArray[i].xCoord) && (mouseX <= (this.shapeArray[i].xCoord + this.shapeArray[i].shapeWidth)) &&
            (mouseY >= this.shapeArray[i].yCoord) && (mouseY <= (this.shapeArray[i].yCoord + this.shapeArray[i].shapeHeight))) {
                // debugger;
                this.shapeArray[i].color = "pink";
                // Make this cell true
                //have it store the state of the cell clicked as well, otherwise it is null
                // debugger;
                //this.shapeArray[i].clicked = true;
                // console.log(this.shapeArray[i].message);
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
                    let length = this.shapeArray.length;

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