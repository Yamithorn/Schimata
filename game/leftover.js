// import { shapeBigL, shapeLittleL, shapeBigI, shapeLittleI, shapeCell, shapeSquare, shapeHalfCross } from "./shapes";

// const canvasField = document.getElementById("canvas-field");
// const canvasBoard = document.getElementById("canvas-board");

// canvasField.addEventListener("click", function() { console.log("clicked"); }, false);

// canvasField.setAttribute("width", "720");
// canvasField.setAttribute("height", "720");

// canvasBoard.setAttribute("width", "480");
// canvasBoard.setAttribute("height", "480");

// const contextField = canvasField.getContext("2d");
// const contextBoard = canvasBoard.getContext("2d");
// const gridSize = 5;

function CanvasState(canvas, context) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = context;

    this.valid = false;
    this.shapes = [];
    this.dragging = false;
    this.selection = null;
    this.dragoffx = 0;
    this.dragoffy = 0;
}

// let shapeX1 = 50;
// let shapeY1 = 50;

// let shapeX2 = 50;
// let shapeY2 = 400;

// let shapeX3 = 300;
// let shapeY3 = 50;

// let shapeX4 = 300;
// let shapeY4 = 500;

// let shapeX5 = 450;
// let shapeY5 = 50;

// let shapeX6 = 450;
// let shapeY6 = 175;

// let shapeX7 = 450;
// let shapeY7 = 400;

// const bigL = new shapeBigL(canvasField, canvasBoard, gridSize, contextField, contextBoard, shapeX1, shapeY1, "#3cba54"); // color green
// const littleL = new shapeLittleL(canvasField, canvasBoard, gridSize, contextField, contextBoard, shapeX2, shapeY2, "#db3236"); // color red
// const bigI = new shapeBigI(canvasField, canvasBoard, gridSize, contextField, contextBoard, shapeX3, shapeY3, "#4885ed"); // color blue
// const littleI = new shapeLittleI(canvasField, canvasBoard, gridSize, contextField, contextBoard, shapeX4, shapeY4, "#f4c20d"); // color yellow
// const cell = new shapeCell(canvasField, canvasBoard, gridSize, contextField, contextBoard, shapeX5, shapeY5, "#551A8B"); /// color purple
// const square = new shapeSquare(canvasField, canvasBoard, gridSize, contextField, contextBoard, shapeX6, shapeY6, "#000000"); // color black
// const halfCross = new shapeHalfCross(canvasField, canvasBoard, gridSize, contextField, contextBoard, shapeX7, shapeY7, "#009999"); // color cyan

// Have the shapes move by changing their shapeX and shapeY
// add event listener to canvas object

canvas.addEventListener("selectstart", function(e) { e.preventDefault(); return false; }, false);

canvasField.addEventListener("click", function (event) { 

}, false);

// Multiples of 96 for 5 x 5 grid

// BIG L
// ctx.beginPath();
// ctx.moveTo(0, 0); // startpoint
// ctx.lineTo(30, 0); // x: 30 to the right
// ctx.lineTo(30, 60); // x: 30, y: down 90
// ctx.lineTo(60, 60);
// ctx.lineTo(60, 90);
// ctx.lineTo(0, 90); // x: reset to 0, y: maintain at 90
// ctx.closePath();
// ctx.fillStyle = '#f00';
// ctx.fill();

export const shapeBigL = function (canvasField, canvasBoard, gridSize, contextField, contextBoard, x, y, color) {
    const cellSize = (canvasBoard.width / gridSize); // 96 at the moment
    const cellSizeDouble = (canvasBoard.width / gridSize) * 2;
    const cellSizeTriple = (canvasBoard.width / gridSize) * 3;

    contextField.beginPath();
    contextField.moveTo(x, y); // start
    contextField.lineTo(x + cellSize, y); // right
    contextField.lineTo(x + cellSize, y + cellSizeDouble); // down
    contextField.lineTo(x + cellSizeDouble, y + cellSizeDouble);
    contextField.lineTo(x + cellSizeDouble, y + cellSizeTriple);
    contextField.lineTo(x, y + cellSizeTriple);
    contextField.closePath();
    contextField.fillStyle = color;
    contextField.fill();
};

// LITTLE L
// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.lineTo(30, 0);
// ctx.lineTo(30, 30);
// ctx.lineTo(60, 30);
// ctx.lineTo(60, 60);
// ctx.lineTo(0, 60);
// ctx.closePath();
// ctx.fillStyle = '#f00';
// ctx.fill();

export const shapeLittleL = function (canvasField, canvasBoard, gridSize, contextField, contextBoard, x, y, color) {
    const cellSize = (canvasBoard.width / gridSize); // 96 at the moment
    const cellSizeDouble = (canvasBoard.width / gridSize) * 2;
    const cellSizeTriple = (canvasBoard.width / gridSize) * 3;

    contextField.beginPath();
    contextField.moveTo(x, y); // start
    contextField.lineTo(x + cellSize, y); // right
    contextField.lineTo(x + cellSize, y + cellSize); // down
    contextField.lineTo(x + cellSizeDouble, y + cellSize); // right
    contextField.lineTo(x + cellSizeDouble, y + cellSizeDouble);
    contextField.lineTo(x, y + cellSizeDouble);
    contextField.closePath();
    contextField.fillStyle = color;
    contextField.fill();
};

// BIG I
// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.lineTo(30, 0);
// ctx.lineTo(30, 90);
// ctx.lineTo(0,90);
// ctx.closePath();
// ctx.fillStyle = '#f00';
// ctx.fill();

export const shapeBigI = function (canvasField, canvasBoard, gridSize, contextField, contextBoard, x, y, color) {
    const cellSize = (canvasBoard.width / gridSize); // 96 at the moment
    const cellSizeDouble = (canvasBoard.width / gridSize) * 2;
    const cellSizeTriple = (canvasBoard.width / gridSize) * 3;
    const cellSizeQuadruple = (canvasBoard.width / gridSize) * 4;

    contextField.beginPath();
    contextField.moveTo(x, y); // start
    contextField.lineTo(x + cellSize, y); // right
    contextField.lineTo(x + cellSize, y + cellSizeQuadruple); // down
    contextField.lineTo(x, y + cellSizeQuadruple);
    contextField.closePath();
    contextField.fillStyle = color;
    contextField.fill();
};

// LITTLE I
// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.lineTo(30, 0);
// ctx.lineTo(30, 60);
// ctx.lineTo(0, 60);
// ctx.closePath();
// ctx.fillStyle = '#f00';
// ctx.fill();

export const shapeLittleI = function (canvasField, canvasBoard, gridSize, contextField, contextBoard, x, y, color) {
    const cellSize = (canvasBoard.width / gridSize); // 96 at the moment
    const cellSizeDouble = (canvasBoard.width / gridSize) * 2;
    const cellSizeTriple = (canvasBoard.width / gridSize) * 3;
    const cellSizeQuadruple = (canvasBoard.width / gridSize) * 4;

    contextField.beginPath();
    contextField.moveTo(x, y); // start
    contextField.lineTo(x + cellSize, y); // right
    contextField.lineTo(x + cellSize, y + cellSizeDouble); // down
    contextField.lineTo(x, y + cellSizeDouble);
    contextField.closePath();
    contextField.fillStyle = color;
    contextField.fill();
};

// CELL
// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.lineTo(30, 0);
// ctx.lineTo(30, 30);
// ctx.lineTo(0, 30);
// ctx.closePath();
// ctx.fillStyle = '#f00';
// ctx.fill();

export const shapeCell = function (canvasField, canvasBoard, gridSize, contextField, contextBoard, x, y, color) {
    const cellSize = (canvasBoard.width / gridSize); // 96 at the moment
    const cellSizeDouble = (canvasBoard.width / gridSize) * 2;
    const cellSizeTriple = (canvasBoard.width / gridSize) * 3;
    const cellSizeQuadruple = (canvasBoard.width / gridSize) * 4;

    contextField.beginPath();
    contextField.moveTo(x, y); // start
    contextField.lineTo(x + cellSize, y); // right
    contextField.lineTo(x + cellSize, y + cellSize); // down
    contextField.lineTo(x, y + cellSize);
    contextField.closePath();
    contextField.fillStyle = color;
    contextField.fill();
};

// LITTLE HALF CROSS
// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.lineTo(30, 0);
// ctx.lineTo(30, 30);
// ctx.lineTo(60, 30);
// ctx.lineTo(60, 60);
// ctx.lineTo(30, 60);
// ctx.lineTo(30,90);
// ctx.lineTo(0, 90);
// ctx.closePath();
// ctx.fillStyle = '#f00';
// ctx.fill();

export const shapeHalfCross = function (canvasField, canvasBoard, gridSize, contextField, contextBoard, x, y, color) {
    const cellSize = (canvasBoard.width / gridSize); // 96 at the moment
    const cellSizeDouble = (canvasBoard.width / gridSize) * 2;
    const cellSizeTriple = (canvasBoard.width / gridSize) * 3;

    contextField.beginPath();
    contextField.moveTo(x, y); // start
    contextField.lineTo(x + cellSize, y); // right
    contextField.lineTo(x + cellSize, y + cellSize); // down
    contextField.lineTo(x + cellSizeDouble, y + cellSize); // right
    contextField.lineTo(x + cellSizeDouble, y + cellSizeDouble);
    contextField.lineTo(x + cellSize, y + cellSizeDouble);
    contextField.lineTo(x + cellSize, y + cellSizeTriple);
    contextField.lineTo(x, y + cellSizeTriple);
    contextField.closePath();
    contextField.fillStyle = color;
    contextField.fill();
};

// SQUARE
// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.lineTo(60, 0);
// ctx.lineTo(60, 60);
// ctx.lineTo(0, 60);
// ctx.closePath();
// ctx.fillStyle = '#f00';
// ctx.fill();

export const shapeSquare = function (canvasField, canvasBoard, gridSize, contextField, contextBoard, x, y, color) {
    const cellSize = (canvasBoard.width / gridSize); // 96 at the moment
    const cellSizeDouble = (canvasBoard.width / gridSize) * 2;
    const cellSizeTriple = (canvasBoard.width / gridSize) * 3;
    const cellSizeQuadruple = (canvasBoard.width / gridSize) * 4;

    contextField.beginPath();
    contextField.moveTo(x, y); // start
    contextField.lineTo(x + cellSizeDouble, y); // right
    contextField.lineTo(x + cellSizeDouble, y + cellSizeDouble); // down
    contextField.lineTo(x, y + cellSizeDouble);
    contextField.closePath();
    contextField.fillStyle = color;
    contextField.fill();
};

//*********************************************************//

ShapeContainer.prototype.overlapping = function (mouseX, mouseY, gridXPosition, gridYPosition, gridWidth, gridHeight, gridCellSize) {

    let gridSize = (gridWidth / gridCellSize) * (gridHeight / gridCellSize);
    // debugger
    for (let i = 0; i < gridSize; i++) {

        if ((mouseX >= gridXPosition + (gridCellSize * i)) && (mouseX <= gridXPosition + (gridCellSize * (i + 1))) &&
            (mouseY >= gridYPosition + (gridCellSize * i)) && (mouseY <= gridYPosition + (gridCellSize * (i + 1)))) {
            // if ((mouseX >= gridXPosition + (gridCellSize * i)) && (mouseX <= gridXPosition + gridWidth) &&
            //     (mouseY >= gridYPosition + (gridCellSize * i)) && (mouseY <= gridYPosition + gridHeight)) {
            this.xCoordArray[i] = gridXPosition + (gridCellSize * i);
            this.yCoordArray[i] = gridYPosition + (gridCellSize * i);

            console.log(`The x coordinate for the cell is ${this.xCoordArray[i]} and the coordinate is ${gridCellSize * i}`);
            console.log(`The y coordinate for the cell is ${this.yCoordArray[i]} and the coordinate is ${gridCellSize * i}`);
        }
        // if ((this.xCoordArray[i] >= gridXPosition + (gridCellSize * i)) && (this.xCoordArray[i] <= gridXPosition + gridWidth) &&
        // (this.yCoordArray[i] >= gridYPosition + (gridCellSize * i)) && (this.yCoordArray[i] <= gridYPosition + gridHeight)) {
        // if ((this.xCoordArray[i] >= gridXPosition + (gridCellSize * i)) && (this.xCoordArray[i] <= gridXPosition + (gridCellSize * (i + 1))) &&
        //     (this.yCoordArray[i] >= gridYPosition + (gridCellSize * i)) && (this.yCoordArray[i] <= gridYPosition + (gridCellSize * (i + 1)))) {

        // this.xCoordArray[i] = gridXPosition + (gridCellSize * i);
        // this.yCoordArray[i] = gridYPosition + (gridCellSize * i);

        // console.log(`The x coordinate for the cell is ${this.xCoordArray[i]} and the coordinate is ${gridCellSize * i}`);
        // console.log(`The y coordinate for the cell is ${this.yCoordArray[i]} and the coordinate is ${gridCellSize * i}`);
        // } 
    }
};

//*********************************************************//

ShapeContainer.prototype.overlapping = function (mouseX, mouseY, gridXPosition, gridYPosition, gridWidth, gridHeight, gridCellSize) {

    let gridSize = (gridWidth / gridCellSize) * (gridHeight / gridCellSize);

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if ((mouseX >= gridXPosition + (gridCellSize * j)) && (mouseX <= gridXPosition + (gridCellSize * (j + 1))) &&
                (mouseY >= gridYPosition + (gridCellSize * i)) && (mouseY <= gridYPosition + (gridCellSize * (i + 1)))) {

                let length = this.cellArray.length;

                for (let k = 0; k < length; k++) {
                    // debugger;
                    if (this.locus[0] > this.cellArray[k].xGrid) {

                        if (this.locus[1] > this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * j)) - (this.cellArray[k].xGrid * gridCellSize);
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * i)) - (this.cellArray[k].yGrid * gridCellSize);
                        }

                        else if (this.locus[1] === this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * j)) - (this.cellArray[k].xGrid * gridCellSize);
                            this.cellArray[k].yPos = gridYPosition + (gridCellSize * i);
                        }

                        else if (this.locus[1] < this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * j)) - (this.cellArray[k].xGrid * gridCellSize);
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * i)) + (this.cellArray[k].yGrid * gridCellSize);
                        }
                    }

                    else if (this.locus[0] === this.cellArray[k].xGrid) {

                        if (this.locus[1] > this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = gridXPosition; //+ (gridCellSize * j);
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * i)) - (this.cellArray[k].yGrid * gridCellSize);
                        }

                        else if (this.locus[1] === this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = gridXPosition + (gridCellSize * j);
                            this.cellArray[k].yPos = gridYPosition + (gridCellSize * i);
                        }

                        else if (this.locus[1] < this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = gridXPosition + (gridCellSize * j);
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * i)) + (this.cellArray[k].yGrid * gridCellSize);
                        }
                    }

                    else if (this.locus[0] < this.cellArray[k].xGrid) {

                        if (this.locus[1] > this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * j)); //+ (this.cellArray[k].xGrid * gridCellSize);
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * i)) - (this.cellArray[k].yGrid * gridCellSize);
                        }

                        else if (this.locus[1] === this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * j)) + (this.cellArray[k].xGrid * gridCellSize);
                            this.cellArray[k].yPos = gridYPosition + (gridCellSize * i) + (this.cellArray[k].yGrid * gridCellSize);
                        }

                        else if (this.locus[1] < this.cellArray[k].yGrid) {
                            this.cellArray[k].xPos = (gridXPosition + (gridCellSize * j)) + (this.cellArray[k].xGrid * gridCellSize);
                            this.cellArray[k].yPos = (gridYPosition + (gridCellSize * i)) + (this.cellArray[k].yGrid * gridCellSize);
                        }
                    }
                }
                return;
            }
        }
    }
};