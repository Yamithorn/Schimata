/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./game/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./game/canvas.js":
/*!************************!*\
  !*** ./game/canvas.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CanvasState; });
function CanvasState(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.getContext("2d");
    this.context.lineWidth = 2;
    this.grid = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false]
    ];
    
    // this.context.globalCompositeOperation = "destination-over";

    // When there is a border or padding, this will fix the coordinate issues that occur
    // var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
    // if (document.defaultView && document.defaultView.getComputedStyle) {
    //     this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)["paddingLeft"], 10) || 0;
    //     this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)["paddingTop"], 10) || 0;
    //     this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)["borderLeftWidth"], 10) || 0;
    //     this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)["borderTopWidth"], 10) || 0;
    // }

    // Some pages have fixed-position bars at the top or left of the page and will mess up the coordinates, below fixes that
    // let html = document.body.parentNode;
    // this.htmlTop = html.offsetTop;
    // this.htmlLeft = html.offsetLeft;

    // Keeping track of state

    this.valid = false; // When set to false, the canvas will redraw everything
    this.shapes = []; // The collection of shapes to be drawn
    this.dragging = false; // Keeps track of whether or not there is dragging
    this.selection = null;
    this.dragoffXArray = []; //0;
    this.dragoffYArray = []; //0;
    this.mouseActive = false;

    //
    this.inside = false;
    this.colliding = false;

    // Events

    let that = this;

    // fixes issue when double clicking causes text to get selected on the canvas
    canvas.addEventListener("selectstart", function (e) {
        e.preventDefault();
        return false;
    }, false);

    canvas.addEventListener("mousedown", function (e) {

        new Audio("../sound/click.wav").play();

        let mouse = that.getMouse(e);
        let mouseX = mouse.x;
        let mouseY = mouse.y;
        let shapes = that.shapes;
        let len = shapes.length;

        for (let i = len - 1; i >= 0; i--) {
            if (shapes[i].contains(mouseX, mouseY)) {

                that.mouseActive = true;
                let selectedShape = shapes[i];
                let length = selectedShape.cellArray.length;

                for (let j = 0; j < length; j++) {
                    // Keep track of where we clicked in the object so we can move it smoothly
                    that.dragoffXArray.push(mouseX - selectedShape.cellArray[j].xPos);
                    that.dragoffYArray.push(mouseY - selectedShape.cellArray[j].yPos);
                    that.dragging = true;
                    that.selection = selectedShape;
                    that.valid = false;
                }
                // debugger;
                // console.log("clicking over here");
                return;
            }
        }

        if (that.selection) {
            that.selection = null;
            that.valid = false;
        }
    }, true);
    
    canvas.addEventListener("mousemove", function (e) {

        if (that.dragging) {

            let mouse = that.getMouse(e);
            let length = that.selection.cellArray.length;

            for (let i = 0; i < length; i++) {
                // Have the other cells move based on the current locus cell's grid position and triangulate their positions from there
                that.selection.cellArray[i].xPos = mouse.x - that.dragoffXArray[i];
                that.selection.cellArray[i].yPos = mouse.y - that.dragoffYArray[i];
                //******//
                // debugger;
                // if (that.selection.cellArray[i].cover[0] !== null && that.selection.cellArray[i].cover[1] !== null) {
                //     that.grid[that.selection.cellArray[i].cover[0]][that.selection.cellArray[i].cover[1]] = false;
                // }
                //******//
                that.valid = false; // Something is dragging so we must redraw
            }
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // Iterate through the cells when they are being dragged and reset the cover back to [null, null] //
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }
    }, true);

    document.addEventListener("mouseup", (e) => {
        that.dragging = false;
        that.dragoffXArray = [];
        that.dragoffYArray = [];
        that.mouseActive = false;
        // that.selection = null;

        // if (that.selection) {
        //     let length = that.selection.cellArray.length;
        //     for (let i = 0; i < length; i++) {
        //         that.selection.cellArray[i].xPos = that.selection.cellArray[i].originX;
        //         that.selection.cellArray[i].yPos = that.selection.cellArray[i].originY;
        //         that.selection.cellArray[i].clicked = false;
        //     }
        // }
        that.valid = false;
        // debugger;
    }, true);

    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 81) {

            let shapesLength = that.shapes.length;
            let gridLength = that.grid.length;

            for (let i = 0; i < shapesLength; i++) {
                for (let j = 0; j < that.shapes[i].cellArray.length; j++) {
                    // debugger;
                    that.shapes[i].cellArray[j].xPos = that.shapes[i].cellArray[j].originX;
                    that.shapes[i].cellArray[j].yPos = that.shapes[i].cellArray[j].originY;
                }
            }

            for (let i = 0; i < gridLength; i++) {
                for (let j = 0; j < gridLength; j++) {
                    that.grid[i][j] = false;
                }
            }

            that.valid = false;
        }
    }, true);

    canvas.addEventListener("mouseup", (e) => {

        that.dragging = false;
        // Empty out arrays for future use
        that.dragoffXArray = [];
        that.dragoffYArray = [];
        that.mouseActive = false;
        that.inside = false;
        // debugger;

        // Add logic for shapes to snap onto grid
        // use the mouseX and mouseY and see if it is overlapping within the grid
        // debugger;
        if (that.selection) {
            // debugger;
            let totalShapesLength = this.shapes.length;
            for (let i = 0; i < totalShapesLength; i++) {
                if (that.selection.locus !== this.shapes[i].locus) {
                    that.colliding = that.selection.overlappingOtherShapes(this.shapes[i], 108);
                }
            }

            let mouse = that.getMouse(e);
            let mouseX = mouse.x;
            let mouseY = mouse.y;
            let length = that.selection.cellArray.length;

            for (let i = 0; i < length; i++) {
                // if (that.selection.cellArray[i].xPos > (740 - 54) && that.selection.cellArray[i].yPos > (0 - 54) && 
                //     that.selection.cellArray[i].xPos < (1280 + 54) && that.selection.cellArray[i].yPos < (54 + 540)) {
                        // debugger;
                if (that.selection.cellArray[i].xPos > 740 && that.selection.cellArray[i].yPos > 0 &&
                    that.selection.cellArray[i].xPos < 1280 && that.selection.cellArray[i].yPos < 540) {
                        that.inside = true;
                        // debugger;
                }
                else {
                    for (let j = 0; j < length; j++) {
                        // SLIGHTLY BUGGY BUT STILL WORKS
                        // debugger;
                        //////////////////////////////////////////////////////////////////////////////TRY WORKING FROM HERE/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        that.selection.cellArray[j].xPos = that.selection.cellArray[j].originX;
                        that.selection.cellArray[j].yPos = that.selection.cellArray[j].originY;

                        if (that.selection.cellArray[j].cover[0] !== null && that.selection.cellArray[j].cover[1] !== null) {
                            that.grid[that.selection.cellArray[j].cover[1]][that.selection.cellArray[j].cover[0]] = false;
                        }
                    }
                    // debugger;
                    // console.log(that.grid);
                    that.inside = false; 
                    break;
                }
            }
            // debugger;
            if (that.inside && !that.colliding) {
                // debugger;
                for (let i = 0; i < length; i++) {
                    // add in logic to make sure all of the shapes are within the square for it to snap
                    // console.log(`mouse x is ${mouseX} and mouse y is ${mouseY}`);
                    that.selection.overlapping(mouseX, mouseY, 740, 0, 540, 540, 108, that.grid);
                    that.selection.cellArray[i].clicked = false;
                }
                // console.log(that.grid);
                // console.log(that.selection);

                that.selection.locus = null;
                that.valid = false; // Something is dragging so we must redraw
                that.inside = false;
            }

            for (let i = 0; i < length; i++) {
                that.selection.cellArray[i].clicked = false;
            }
        }
    }, true);

    // canvas.addEventListener("dblclick", function (e) {
    //     let mouse = that.getMouse(e);
    //     that.addShape(new Shape(mouse.x - 10, mouse.y - 10, 20, 20, "rgba(0,255,0,.6)"));
    // }, true);

    this.selectionColor = "black";
    // this.selectionWidth = 2;
    this.interval = 30;
    setInterval(function () {
        that.draw();
    }, that.interval);
}

CanvasState.prototype.addShape = function (shape) {
    this.shapes.push(shape);
    this.valid = false;
};

CanvasState.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
};

// While draw is called as often as the interval variable demands, it only ever does something if the canvas gets invalidated by our code
CanvasState.prototype.draw = function () {

    // If our state is invalid, redraw and validate!
    if (!this.valid) {
        let context = this.context;
        let shapes = this.shapes;
        this.clear();

        // Add stuff you want to be drawn in the background here
        // Puzzle Field
        // context.rect(540, 0, 540, 540); // x, y, width, height
        
        // Draw all shapes
        let len = shapes.length;

        for (let i = 0; i < len; i++) {

            let shape = shapes[i];
            // let length = shape.colorArray.length;
            let length = shape.length;

            for (let j = 0; j < length; j++) {
                // if (shape.xCoordArray[i] > this.width || shape.yCoordArray[i] > this.height || 
                //     shape.xCoordArray[i] + shape.shapeWidthArray[i] < 0 || shape.yCoordArray[i] + shape.shapeHeightArray[i] < 0) continue;
                if (shape[j].xPos > this.width || shape[j].yPos > this.height ||
                    shape[j].xPos + shape[j].cellSize < 0 || shape[j].yPos + shape[j].cellSize < 0) continue;
            }

            shapes[i].draw(context);
        }

        let logicLength = this.grid.length;
        let val = 0;

        for (let i = 0; i < logicLength; i++) {
            for (let j = 0; j < logicLength; j++) {
                if (this.grid[i][j]) {
                    val++;
                }
            }
        }

        if (val === 25) {
            alert("You win!");
            val = 26;
        }
        else {
            val = 0;
        }

        // Draw selection 
        // Stroke along the edge of the selected shape
        // if (this.selection != null) {
        //     context.strokeStyle = this.selectionColor;
        //     context.lineWidth = this.selectionWidth;
        //     let selectedShape = this.selection;
        //     context.strokeRect(selectedShape.xCoord, selectedShape.yCoord, selectedShape.shapeWidth, selectedShape.shapeHeight);
        // }

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                context.rect(740 + (108 * i), 0 + (108 * j), 108, 108);
            }
        }
        // context.rect(540, 0, 108, 108);
        context.stroke();

        if ((this.selection != null) && this.mouseActive) {
            // debugger;
            context.strokeStyle = this.selectionColor;
            // context.lineWidth = this.selectionWidth;
            let selectedShape = this.selection;
            let length = selectedShape.cellArray.length;
            for (let i = 0; i < length; i++) {
                // debugger;
                // context.strokeRect(selectedShape.xCoordArray[i], selectedShape.yCoordArray[i], 
                //     selectedShape.shapeWidthArray[i], selectedShape.shapeHeightArray[i]);
                context.strokeRect(selectedShape.cellArray[i].xPos, selectedShape.cellArray[i].yPos, 
                    selectedShape.cellArray[i].cellSize, selectedShape.cellArray[i].cellSize);
            }
        }

        this.valid = true;
    }
};

// Creates an object with an x and y defined, set to the mouse position relative to that state's canvas

CanvasState.prototype.getMouse = function (e) {
    // var element = this.canvas, offsetX = 0, offsetY = 0, mouseX, mouseY;
    let element = this.canvas;
    let offsetX = 0;
    let offsetY = 0;
    let mouseX, mouseY;

    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offSetParent));
    }

    // Add padding and border style widths to offset
    // Also add the <html> offsets in case there's a position: fixed bar
    // offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    // offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mouseX = e.pageX - offsetX;
    mouseY = e.pageY - offsetY;

    // Returning a simple javascript object with x and y defined
    return { x: mouseX, y: mouseY };
};

/***/ }),

/***/ "./game/game.js":
/*!**********************!*\
  !*** ./game/game.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shapes_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shapes_logic */ "./game/shapes_logic.js");
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas */ "./game/canvas.js");
/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shapes */ "./game/shapes.js");




function init() {
    const canvasField = document.getElementById("canvas-field");

    canvasField.setAttribute("width", "1280");
    canvasField.setAttribute("height", "720");

    // const ctx = canvasField.getContext("2d");

    // Corner square is 270 by 270
    let state = new _canvas__WEBPACK_IMPORTED_MODULE_1__["default"](canvasField);
    // cell is 108 by 108
    state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_0__["default"](_shapes__WEBPACK_IMPORTED_MODULE_2__["singleCellShape"]));
    state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_0__["default"](_shapes__WEBPACK_IMPORTED_MODULE_2__["squareCellShape"]));
    state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_0__["default"](_shapes__WEBPACK_IMPORTED_MODULE_2__["smallTCellShape"]));
    state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_0__["default"](_shapes__WEBPACK_IMPORTED_MODULE_2__["smallLCellShape"]));
    state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_0__["default"](_shapes__WEBPACK_IMPORTED_MODULE_2__["bigLCellShape"]));
    state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_0__["default"](_shapes__WEBPACK_IMPORTED_MODULE_2__["doubleCellShape"]));
    state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_0__["default"](_shapes__WEBPACK_IMPORTED_MODULE_2__["singleCellShapeTwo"]));
    state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_0__["default"](_shapes__WEBPACK_IMPORTED_MODULE_2__["singleCellShapeThree"]));
    state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_0__["default"](_shapes__WEBPACK_IMPORTED_MODULE_2__["singleCellShapeFour"]));
    state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_0__["default"](_shapes__WEBPACK_IMPORTED_MODULE_2__["squareCellShapeTwo"]));
}

init();

/***/ }),

/***/ "./game/shapes.js":
/*!************************!*\
  !*** ./game/shapes.js ***!
  \************************/
/*! exports provided: singleCellShape, squareCellShape, smallTCellShape, smallLCellShape, bigLCellShape, doubleCellShape, singleCellShapeTwo, singleCellShapeThree, singleCellShapeFour, squareCellShapeTwo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "singleCellShape", function() { return singleCellShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squareCellShape", function() { return squareCellShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smallTCellShape", function() { return smallTCellShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smallLCellShape", function() { return smallLCellShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bigLCellShape", function() { return bigLCellShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doubleCellShape", function() { return doubleCellShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "singleCellShapeTwo", function() { return singleCellShapeTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "singleCellShapeThree", function() { return singleCellShapeThree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "singleCellShapeFour", function() { return singleCellShapeFour; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squareCellShapeTwo", function() { return squareCellShapeTwo; });
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

const singleCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 0, 0, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
];

const squareCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 0, 138, 108, "#db3236", "pink", false, "(0,0) is being clicked"),
    new Square(1, 0, 108, 138, 108, "#db3236", "pink", false, "(1,0) is being clicked"),
    new Square(0, 1, 0, 246, 108, "#db3236", "pink", false, "(0,1) is being clicked"),
    new Square(1, 1, 108, 246, 108, "#db3236", "pink", false, "(1,1) is being clicked")
];

const smallTCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 0, 384, 108, "#4885ed", "pink", false, "(0,0) is being clicked"),
    new Square(0, 1, 0, 492, 108, "#4885ed", "pink", false, "(0,1) is being clicked"),
    new Square(1, 1, 108, 492, 108, "#4885ed", "pink", false, "(1,1) is being clicked"),
    new Square(0, 2, 0, 600, 108, "#4885ed", "pink", false, "(0,2) is being clicked")
    // new Square(1, 1, 0, 600, 108, "#4885ed", "pink", false, "(1,1) is being clicked"),
    // new Square(0, 2, 108, 492, 108, "#4885ed", "pink", false, "(0,2) is being clicked")
];

const smallLCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 246, 0, 108, "#f4c20d", "pink", false, "(0,0) is being clicked"),
    new Square(0, 1, 246, 108, 108, "#f4c20d", "pink", false, "(0,1) is being clicked"),
    new Square(1, 1, 354, 108, 108, "#f4c20d", "pink", false, "(1,1) is being clicked"),
];

const bigLCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 246, 246, 108, "#551A8B", "pink", false, "(0,0) is being clicked"),
    new Square(0, 1, 246, 354, 108, "#551A8B", "pink", false, "(0,1) is being clicked"),
    new Square(0, 2, 246, 462, 108, "#551A8B", "pink", false, "(0,2) is being clicked"),
    new Square(1, 2, 354, 462, 108, "#551A8B", "pink", false, "(1,2) is being clicked")
];

const doubleCellShape = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 246, 590, 108, "#009999", "pink", false, "(0,0) is being clicked"),
    new Square(1, 0, 354, 590, 108, "#009999", "pink", false, "(1,0) is being clicked"),
];

const singleCellShapeTwo = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 482, 0, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
];

const singleCellShapeThree = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 482, 128, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
];

const singleCellShapeFour = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 482, 256, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
];

const squareCellShapeTwo = [
    // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
    new Square(0, 0, 482, 384, 108, "#db3236", "pink", false, "(0,0) is being clicked"),
    new Square(1, 0, 590, 384, 108, "#db3236", "pink", false, "(0,1) is being clicked"),
    new Square(0, 1, 482, 492, 108, "#db3236", "pink", false, "(1,0) is being clicked"),
    new Square(1, 1, 590, 492, 108, "#db3236", "pink", false, "(1,1) is being clicked")
];

/***/ }),

/***/ "./game/shapes_logic.js":
/*!******************************!*\
  !*** ./game/shapes_logic.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShapeContainer; });
// Possibly to refactor, had a boolean (default false) for each cell and when clicked on, it turns to true
// and have base coordinates of where each cell is located and have it unique to each of them then based on which one is clicked
// have them rearrange themselves within the grid and have it work side to side with a 5 by array of booleans to tell the state if each
// cell inside of the puzzle field

function ShapeContainer(cellArray) { // cellArray is an array that stores cells to draw them
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

            // if (this.cellArray[i].xPos < (shape.cellArray[j].xPos + Math.trunc(cellSize/2)) && 
            //     (this.cellArray[i].xPos + Math.trunc(cellSize/2)) > shape.cellArray[j].xPos &&
            //     this.cellArray[i].yPos < (shape.cellArray[j].yPos + Math.trunc(cellSize/2)) && 
            //     (this.cellArray[i].yPos + Math.trunc(cellSize/2)) > shape.cellArray[j].yPos) {
            if (this.cellArray[i].xPos < (shape.cellArray[j].xPos + cellSize) &&
                (this.cellArray[i].xPos + cellSize) > shape.cellArray[j].xPos &&
                this.cellArray[i].yPos < (shape.cellArray[j].yPos + cellSize) &&
                (this.cellArray[i].yPos + cellSize) > shape.cellArray[j].yPos) {

                this.cellArray[i].xPos = this.cellArray[i].originX;
                this.cellArray[i].yPos = this.cellArray[i].originY;
                return true;
            }
        }
    }
    return false;
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map