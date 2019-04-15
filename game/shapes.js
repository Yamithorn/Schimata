class Square {
    constructor(xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, message) {
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
    }
}

class Shape {
    constructor(...cells) {

    }
}

export const singleCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 0, 0, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
];

export const squareCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 0, 138, 108, "#db3236", "pink", false, "(0,0) is being clicked"),
    new Square(1, 0, 0, 246, 108, "#db3236", "pink", false, "(0,1) is being clicked"),
    new Square(0, 1, 108, 138, 108, "#db3236", "pink", false, "(1,0) is being clicked"),
    new Square(1, 1, 108, 246, 108, "#db3236", "pink", false, "(1,1) is being clicked")
];

export const smallTCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 0, 384, 108, "#4885ed", "pink", false, "(0,0) is being clicked"),
    new Square(0, 1, 0, 492, 108, "#4885ed", "pink", false, "(0,1) is being clicked"),
    new Square(1, 1, 0, 600, 108, "#4885ed", "pink", false, "(1,1) is being clicked"),
    new Square(0, 2, 108, 492, 108, "#4885ed", "pink", false, "(0,2) is being clicked")
];

export const smallLCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 246, 0, 108, "#f4c20d", "pink", false, "(0,0) is being clicked"),
    new Square(0, 1, 246, 108, 108, "#f4c20d", "pink", false, "(0,1) is being clicked"),
    new Square(1, 1, 354, 108, 108, "#f4c20d", "pink", false, "(1,1) is being clicked"),
];

export const bigLCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 246, 246, 108, "#551A8B", "pink", false, "(0,0) is being clicked"),
    new Square(0, 1, 246, 354, 108, "#551A8B", "pink", false, "(0,1) is being clicked"),
    new Square(0, 2, 246, 462, 108, "#551A8B", "pink", false, "(0,2) is being clicked"),
    new Square(1, 2, 354, 462, 108, "#551A8B", "pink", false, "(1,2) is being clicked")
];

export const doubleCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 246, 590, 108, "#009999", "pink", false, "(0,0) is being clicked"),
    new Square(1, 0, 354, 590, 108, "#009999", "pink", false, "(1,0) is being clicked"),
];

export const singleCellShapeTwo = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 482, 0, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
];

export const singleCellShapeThree = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 482, 128, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
];

export const singleCellShapeFour = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 482, 256, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
];

export const squareCellShapeTwo = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 482, 384, 108, "#db3236", "pink", false, "(0,0) is being clicked"),
    new Square(1, 0, 590, 384, 108, "#db3236", "pink", false, "(0,1) is being clicked"),
    new Square(0, 1, 482, 492, 108, "#db3236", "pink", false, "(1,0) is being clicked"),
    new Square(1, 1, 590, 492, 108, "#db3236", "pink", false, "(1,1) is being clicked")
];