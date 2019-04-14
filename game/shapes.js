const basic = [
    {   
        xGrid: 0,
        yGrid: 0,

        xPos: 0,
        yPos: 0,

        width: 0,
        height: 0,

        baseColor: "",
        clickedColor: "",

        clicked: false,
        state: null,
        message: ""
    }
];

class Square {
    constructor(xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message) {
        this.xGrid = xGrid;
        this.yGrid = yGrid;
        this.xPos = xPos;
        this.yPos = yPos;
        this.cellSize = cellSize;
        this.baseColor = baseColor;
        this.clickedColor = clickedColor;
        this.clicked = clicked;
        this.state = state; // locus for dragging (point of focus)
        this.message = message;
    }
}

class Shape {
    constructor(...cells) {

    }
}

// When working, try doing a collection of squares of the class

// 1 by 1
// export const singleCellShape = [
//     {   // 1
//         xCoord: 10, // Try to convert to single digits and multiply them
//         yCoord: 10, // Try to convert to single digits and multiply them
//         shapeWidth: 108,
//         shapeHeight: 108,
//         color: "#3cba54",
//         clicked: false,
//         message: "0, 0 is being clicked"
//     }
// ];

export const singleCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 0, 0, 108, "#3cba54", "pink", false, null, "(0,0) is being clicked")
];

export const squareCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 0, 138, 108, "#db3236", "pink", false, null, "(0,0) is being clicked"),
    new Square(0, 1, 0, 246, 108, "#db3236", "pink", false, null, "(0,1) is being clicked"),
    new Square(1, 0, 108, 138, 108, "#db3236", "pink", false, null, "(1,0) is being clicked"),
    new Square(1, 1, 108, 246, 108, "#db3236", "pink", false, null, "(1,1) is being clicked")
];

// 2 by 2
export const squareShape = [
    {   // 1
        xCoord: 10,
        yCoord: 138,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#db3236",
        clicked: false,
        message: "0, 0 is being clicked"
    },
    {   // 2
        xCoord: 10,
        yCoord: 246,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#db3236",
        clicked: false,
        message: "0, 1 is being clicked"
    },
    { // 3
        xCoord: 118,
        yCoord: 138,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#db3236",
        clicked: false,
        message: "1, 0 is being clicked"
    },
    { // 4
        xCoord: 118,
        yCoord: 246,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#db3236",
        clicked: false,
        message: "1, 1 is being clicked"
    }
];

// Small T
export const smallTShape = [
    {   // 1
        xCoord: 10,
        yCoord: 384,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#4885ed",
        clicked: false
    },
    {   // 2
        xCoord: 10,
        yCoord: 492,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#4885ed",
        clicked: false
    },
    {   // 3
        xCoord: 10,
        yCoord: 600,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#4885ed",
        clicked: false
    },
    {   // 4
        xCoord: 118,
        yCoord: 492,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#4885ed",
        clicked: false
    }
];

// Little L shape
export const littleLShape = [
    {   // 1
        xCoord: 246,
        yCoord: 10,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#f4c20d",
        clicked: false
    },
    {   // 2
        xCoord: 246,
        yCoord: 118,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#f4c20d",
        clicked: false
    },
    {   // 3
        xCoord: 354,
        yCoord: 118,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#f4c20d",
        clicked: false
    }
];

// Big L Shape
export const bigLShape = [
    {   // 1
        xCoord: 246,
        yCoord: 246,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#551A8B",
        clicked: false
    },
    {   // 2
        xCoord: 246,
        yCoord: 354,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#551A8B",
        clicked: false
    },
    {   // 3
        xCoord: 246,
        yCoord: 462,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#551A8B",
        clicked: false
    },
    {   // 4
        xCoord: 354,
        yCoord: 462,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#551A8B",
        clicked: false
    }
];

// 1 by 1
export const doubleCellShape = [
    {   // 1
        xCoord: 246,
        yCoord: 590,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#009999",
        clicked: false
    },
    {   // 2
        xCoord: 354,
        yCoord: 590,
        shapeWidth: 108,
        shapeHeight: 108,
        color: "#009999",
        clicked: false
    }
];