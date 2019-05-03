class Square {
    constructor(xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, message) {
        this.originX = xPos;
        this.originY = yPos;
        this.xGrid = xGrid;
        this.yGrid = yGrid;
        this.xPos = xPos;
        this.yPos = yPos;
        this.cellSize = cellSize;
        this.baseColor = baseColor;
        this.clickedColor = clickedColor;
        this.clicked = clicked;
        // this.state = state; // locus for dragging (point of focus)
        this.message = message;
        this.cover = [null, null];
    }
}

class Shape {
    constructor(...cells) {

    }
}

// export const shapeGenerator = function() {
//     const shapeGrid = [[true, false, false],
//                     [false, false, false],
//                     [false, false, false]];
//     for (let i = 0; i < shapeGrid.length; i++) {
//         for (let j = 0; j < shapeGrid[i].length; j++) {

//         }
//     }
// };

export const singleCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 300, 100, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
];

export const squareCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 300, 238, 108, "#db3236", "pink", false, "(0,0) is being clicked"),
    new Square(1, 0, 408, 238, 108, "#db3236", "pink", false, "(1,0) is being clicked"),
    new Square(0, 1, 300, 346, 108, "#db3236", "pink", false, "(0,1) is being clicked"),
    new Square(1, 1, 408, 346, 108, "#db3236", "pink", false, "(1,1) is being clicked")
];

export const smallTCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 300, 484, 108, "#4885ed", "pink", false, "(0,0) is being clicked"),
    new Square(0, 1, 300, 592, 108, "#4885ed", "pink", false, "(0,1) is being clicked"),
    new Square(1, 1, 408, 592, 108, "#4885ed", "pink", false, "(1,1) is being clicked"),
    new Square(0, 2, 300, 700, 108, "#4885ed", "pink", false, "(0,2) is being clicked")
    // new Square(1, 1, 0, 600, 108, "#4885ed", "pink", false, "(1,1) is being clicked"),
    // new Square(0, 2, 108, 492, 108, "#4885ed", "pink", false, "(0,2) is being clicked")
];

export const smallLCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 546, 100, 108, "#f4c20d", "pink", false, "(0,0) is being clicked"),
    new Square(0, 1, 546, 208, 108, "#f4c20d", "pink", false, "(0,1) is being clicked"),
    new Square(1, 1, 654, 208, 108, "#f4c20d", "pink", false, "(1,1) is being clicked"),
];

export const bigLCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 546, 346, 108, "#551A8B", "pink", false, "(0,0) is being clicked"),
    new Square(0, 1, 546, 454, 108, "#551A8B", "pink", false, "(0,1) is being clicked"),
    new Square(0, 2, 546, 562, 108, "#551A8B", "pink", false, "(0,2) is being clicked"),
    new Square(1, 2, 654, 562, 108, "#551A8B", "pink", false, "(1,2) is being clicked")
];

export const doubleCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 546, 690, 108, "#009999", "pink", false, "(0,0) is being clicked"),
    new Square(1, 0, 654, 690, 108, "#009999", "pink", false, "(1,0) is being clicked"),
];

export const singleCellShapeTwo = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 782, 100, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
];

export const singleCellShapeThree = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 782, 228, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
];

export const singleCellShapeFour = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 782, 356, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
];

export const squareCellShapeTwo = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 782, 484, 108, "#db3236", "pink", false, "(0,0) is being clicked"),
    new Square(1, 0, 890, 484, 108, "#db3236", "pink", false, "(0,1) is being clicked"),
    new Square(0, 1, 782, 592, 108, "#db3236", "pink", false, "(1,0) is being clicked"),
    new Square(1, 1, 890, 592, 108, "#db3236", "pink", false, "(1,1) is being clicked")
];