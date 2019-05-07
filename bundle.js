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

/***/ "./game/button.js":
/*!************************!*\
  !*** ./game/button.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Button; });
class Button {
    constructor(width, height, xPos, yPos, baseColor, clickedColor, text) {
        this.width = width;
        this.height = height;

        this.xPos = xPos;
        this.yPos = yPos;

        this.baseColor = baseColor;
        this.clickedColor = clickedColor;
        this.color = this.baseColor;

        this.text = text;
        this.clicked = false;
        this.active = false;
    }

    drawButton(context, canvasWidth) {
        context.lineWidth = 15;
        context.strokeRect(this.xPos, this.yPos, this.width, this.height);
        context.fillStyle = this.color;
        context.fillRect(this.xPos, this.yPos, this.width, this.height);
        // context.font = "40px Arial";
        context.font = Math.trunc(canvasWidth * 0.021) + "px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "black";
        context.fillText(this.text, this.xPos + (this.width/2), this.yPos + (this.height/2));
    }

    contains(mouseX, mouseY) {
        if ((mouseX >= this.xPos) && (mouseX <= (this.xPos + this.width)) && (mouseY >= this.yPos) && (mouseY <= (this.yPos + this.height))) {
                return true;
        }
        else {
            return false;
        }
    }
}

/***/ }),

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

    // debugger;

    // Keeping track of state

    this.valid = false; // When set to false, the canvas will redraw everything
    this.shapes = []; // The collection of shapes to be drawn
    this.dragging = false; // Keeps track of whether or not there is dragging
    this.selection = null;
    this.dragoffXArray = []; // 0;
    this.dragoffYArray = []; // 0;
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

        let mouse = that.getMouse(e);
        let mouseX = mouse.x;
        let mouseY = mouse.y;
        // let shapes = that.shapes;
        let len = that.shapes.length;

        for (let i = len - 1; i >= 0; i--) {
            if (that.shapes[i].contains(mouseX, mouseY)) {
                let pickedShape = that.shapes.splice(i, 1);
                that.shapes = that.shapes.concat(pickedShape);
                that.mouseActive = true;
                let selectedShape = that.shapes[that.shapes.length - 1];
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
        }
    }, true);

    document.addEventListener("mouseup", (e) => {
        that.dragging = false;
        that.dragoffXArray = [];
        that.dragoffYArray = [];
        that.mouseActive = false;
        // that.selection = null;

        if (that.selection !== null) {
            if ((that.selection.cellArray[0].xPos < 0 || that.selection.cellArray[0].xPos > that.width) ||
                (that.selection.cellArray[0].yPos < 0 || that.selection.cellArray[0].yPos > that.height)) {
                let length = that.selection.cellArray.length;
                for (let i = 0; i < length; i++) {
                    that.selection.cellArray[i].xPos = that.selection.cellArray[i].originX;
                    that.selection.cellArray[i].yPos = that.selection.cellArray[i].originY;
                    that.selection.cellArray[i].clicked = false;
                }
            }
        }
        that.valid = false;
        // debugger;
    }, true);

    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 81) {

            let shapesLength = that.shapes.length;
            // let gridLength = that.grid.length;

            for (let i = 0; i < shapesLength; i++) {
                for (let j = 0; j < that.shapes[i].cellArray.length; j++) {
                    // debugger;
                    that.shapes[i].cellArray[j].xPos = that.shapes[i].cellArray[j].originX;
                    that.shapes[i].cellArray[j].yPos = that.shapes[i].cellArray[j].originY;
                }
            }

            // for (let i = 0; i < gridLength; i++) {
            //     for (let j = 0; j < gridLength; j++) {
            //         that.grid[i][j] = false;
            //     }
            // }

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
            // let totalShapesLength = this.shapes.length;
            // for (let i = 0; i < totalShapesLength; i++) {
            //     if (that.selection.locus !== this.shapes[i].locus) {
            //         that.colliding = that.selection.overlappingOtherShapes(this.shapes[i], 108);
            //     }
            // }

            let mouse = that.getMouse(e);
            let mouseX = mouse.x;
            let mouseY = mouse.y;
            let length = that.selection.cellArray.length;
            let temp = Math.trunc(this.width * 0.05625);

            for (let i = 0; i < length; i++) {

                if (that.selection.cellArray.every((element) => {
                    // return element.xPos > ((this.width / 2) - this.width / 10) && 
                    //     element.xPos < (((this.width / 2) - this.width / 10) + (temp * 4)) && 
                    //     element.yPos > (this.height / 11) &&
                    //     element.yPos < (this.height / 11) + (temp * 4);
                    return element.xPos > ((this.width / 2) - this.width / 10) - Math.trunc(temp) &&
                        element.xPos < (((this.width / 2) - this.width / 10) + (temp * 4)) + Math.trunc(temp) &&
                        element.yPos > (this.height / 11) - Math.trunc(temp) &&
                        element.yPos < ((this.height / 11) + (temp * 4)) + Math.trunc(temp);
                })) {
                    that.inside = true;
                    // console.log("inside");
                }

                // else {
                //     for (let j = 0; j < length; j++) {

                //         that.selection.cellArray[j].xPos = that.selection.cellArray[j].originX;
                //         that.selection.cellArray[j].yPos = that.selection.cellArray[j].originY;

                //         // if (that.selection.cellArray[j].cover[0] !== null && that.selection.cellArray[j].cover[1] !== null) {
                //         //     that.grid[that.selection.cellArray[j].cover[1]][that.selection.cellArray[j].cover[0]] = false;
                //         // }
                //     }

                //     that.inside = false; 
                //     break;
                // }
            }
            // // debugger;
            // if (that.inside && !that.colliding) {
            //     // debugger;
            //     for (let i = 0; i < length; i++) {
            //         // add in logic to make sure all of the shapes are within the square for it to snap
            //         // console.log(`mouse x is ${mouseX} and mouse y is ${mouseY}`);
            //         that.selection.overlapping(mouseX, mouseY, 740, 0, 540, 540, 108, that.grid);
            //         that.selection.cellArray[i].clicked = false;
            //     }
            //     // console.log(that.grid);
            //     // console.log(that.selection);

            //     that.selection.locus = null;
            //     that.valid = false; // Something is dragging so we must redraw
            //     that.inside = false;
            // }

            if (that.inside) {
                let totalShapesLength = this.shapes.length;
                for (let i = 0; i < totalShapesLength; i++) {
                    if (that.selection.locus !== this.shapes[i].locus) {
                        // THE PROBLEM IS HERE, IT CHECKS IT FOR EVERY SHAPE
                        that.colliding = that.selection.overlappingOtherShapes(this.shapes[i], temp);
                        // debugger;
                    }
                }

                if (!that.colliding) {
                    // debugger;
                    for (let i = 0; i < length; i++) {
                        
                        that.selection.overlapping(mouseX, mouseY, ((this.width / 2) - this.width / 10), (this.height / 11), Math.trunc(this.width * 0.28125), Math.trunc(this.width * 0.28125), temp, that.grid);
                        that.selection.cellArray[i].clicked = false;
                    }
                }

                that.selection.locus = null;
                that.valid = false; // Something is dragging so we must redraw
                that.inside = false;
            }

            for (let i = 0; i < length; i++) {
                that.selection.cellArray[i].clicked = false;
            }
        }
    }, true);

    this.selectionColor = "black";
    // this.selectionWidth = 2;
    this.interval = 15;
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
    // debugger;
    // If our state is invalid, redraw and validate!
    if (!this.valid) {
        let context = this.context;
        let shapes = this.shapes;
        this.clear();
        
        // Draw all shapes
        let len = shapes.length;
        let temp = Math.trunc(this.width * 0.05625);

        for (let i = 0; i < len; i++) {

            let shape = shapes[i];
            // let length = shape.colorArray.length;
            let length = shape.length;

            for (let j = 0; j < length; j++) {
                if (shape[j].xPos > this.width || shape[j].yPos > this.height ||
                    shape[j].xPos + shape[j].cellSize < 0 || shape[j].yPos + shape[j].cellSize < 0) continue;
            }

            shapes[i].draw(context);
        }

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                context.rect(((this.width / 2) - this.width / 10) + (temp * i), this.height / 11 + (temp * j), temp, temp);
                // context.rect(Math.trunc(this.width / 1.8) + (temp * i), this.height / 4 + (temp * j), temp, temp);
            }
        }

        context.stroke();

        if ((this.selection != null) && this.mouseActive) {
            context.strokeStyle = this.selectionColor;
            let selectedShape = this.selection;
            let length = selectedShape.cellArray.length;
            for (let i = 0; i < length; i++) {
                context.strokeRect(selectedShape.cellArray[i].xPos, selectedShape.cellArray[i].yPos, 
                    selectedShape.cellArray[i].cellSize, selectedShape.cellArray[i].cellSize);
            }
        }

        this.valid = true;
    }
};

CanvasState.prototype.getMouse = function (e) {

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
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu */ "./game/menu.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./button */ "./game/button.js");



function init() {

    const canvasField = document.getElementById("canvas-field");
    const documentField = document.getElementsByClassName("body")[0];
    // const documentFieldWidth = documentField.clientWidth;
    // const documentFieldHeight = documentField.clientHeight;

    const documentFieldWidth = documentField.offsetWidth;
    const documentFieldHeight = documentField.offsetHeight;

    canvasField.setAttribute("width", documentFieldWidth);
    canvasField.setAttribute("height", documentFieldHeight);

    let menu = new _menu__WEBPACK_IMPORTED_MODULE_0__["default"](canvasField);

    // width, height, xPos, yPos, baseColor, clickedColor, text
    // const playButton = new Button(324, 108, (documentFieldWidth / 2) - 324 / 2, 
    //                             (documentFieldHeight / 2) - 108 * 2, 
    //                             "#4285F4", "#0F9D58", "Play Game");
    // const rulesButton = new Button(324, 108, (documentFieldWidth / 2) - 324 / 2, 
    //                             (documentFieldHeight / 2), 
    //                             "#4285F4", "#0F9D58", "How To Play");
    // const controlsButton = new Button(324, 108, (documentFieldWidth / 2) - 324 / 2, 
    //                             (documentFieldHeight / 2) + 108 * 2, 
    //                             "#4285F4", "#0F9D58", "Controls");
    // const returnButton = new Button(432, 108, (documentFieldWidth / 2) - 432 / 2, 
    //                             (documentFieldHeight / 2) + 108 * 2, 
    //                             "#4285F4", "#0F9D58", "Back To Main Menu");

    const playButton = new _button__WEBPACK_IMPORTED_MODULE_1__["default"](documentFieldWidth * 0.16875, documentFieldHeight * 0.11, (documentFieldWidth / 2) - documentFieldWidth / 12,
        (documentFieldHeight / 2) - documentFieldHeight * 0.22,
        "#4285F4", "#0F9D58", "Play Game");
    const rulesButton = new _button__WEBPACK_IMPORTED_MODULE_1__["default"](documentFieldWidth * 0.16875, documentFieldHeight * 0.11, (documentFieldWidth / 2) - documentFieldWidth / 12,
        (documentFieldHeight / 2),
        "#4285F4", "#0F9D58", "How To Play");
    const controlsButton = new _button__WEBPACK_IMPORTED_MODULE_1__["default"](documentFieldWidth * 0.16875, documentFieldHeight * 0.11, (documentFieldWidth / 2) - documentFieldWidth / 12,
        (documentFieldHeight / 2) + documentFieldHeight * 0.22,
        "#4285F4", "#0F9D58", "Controls");
    const returnButton = new _button__WEBPACK_IMPORTED_MODULE_1__["default"](documentFieldWidth * 0.225, documentFieldHeight * 0.11, (documentFieldWidth / 2) - documentFieldWidth / 9,
        (documentFieldHeight / 2) + documentFieldHeight * 0.22,
        "#4285F4", "#0F9D58", "Back To Main Menu");

    menu.addButton(playButton);
    menu.addButton(rulesButton);
    menu.addButton(returnButton);
    menu.addButton(controlsButton);
}

init();

/***/ }),

/***/ "./game/menu.js":
/*!**********************!*\
  !*** ./game/menu.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CanvasMenu; });
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ "./game/canvas.js");
/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shapes */ "./game/shapes.js");
/* harmony import */ var _shapes_logic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shapes_logic */ "./game/shapes_logic.js");




let menuLoop = true;

function CanvasMenu(canvas) {

    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.getContext("2d");
    this.buttons = {};
    this.clickedButton = null;

    this.playGame = false;

    let that = this;

    canvas.addEventListener("selectstart", function (event) {
        event.preventDefault();
        return false;
    }, false);

    canvas.addEventListener("mousedown", function (event) {
        let mouse = that.getMouse(event);
        const buttonKeys = Object.keys(that.buttons);

        for (let i = 0; i < buttonKeys.length; i++) {
            if (that.buttons[buttonKeys[i]].contains(mouse.x, mouse.y) && that.buttons[buttonKeys[i]].active) {
                that.buttons[buttonKeys[i]].color = that.buttons[buttonKeys[i]].clickedColor;
                that.clickedButton = that.buttons[buttonKeys[i]];
            }
        }
    }, true);

    canvas.addEventListener("mouseup", function (event) {
        let mouse = that.getMouse(event);
        const buttonKeys = Object.keys(that.buttons);
        for (let i = 0; i < buttonKeys.length; i++) {
            if (that.buttons[buttonKeys[i]].contains(mouse.x, mouse.y) && that.buttons[buttonKeys[i]].active) {
                that.clickedButton.clicked = true;
            }
        }
    }, true);

    this.interval = 30;
    setInterval(function () {
        that.drawMenu();
    }, that.interval);
}

CanvasMenu.prototype.drawMenu = function () {
    if (menuLoop) {
        const buttonKeys = Object.keys(this.buttons);
        let howToPlay = false;
        let controls = false;
        let backToMainMenu = false;
        let temp = Math.trunc(this.width * 0.05625);
        this.clear();

        for (let i = 0; i < buttonKeys.length; i++) {
            if (this.buttons[buttonKeys[i]].clicked) {
                if (this.buttons[buttonKeys[i]].text === "Play Game") {
                    this.playGame = true;
                }

                else if (this.buttons[buttonKeys[i]].text === "How To Play") {
                    howToPlay = true;
                }

                else if (this.buttons[buttonKeys[i]].text === "Controls") {
                    controls = true;
                }

                else if (this.buttons[buttonKeys[i]].text === "Back To Main Menu") {
                    for (let i = 0; i < buttonKeys.length; i++) {
                        this.buttons[buttonKeys[i]].clicked = false;
                        this.buttons[buttonKeys[i]].color = this.buttons[buttonKeys[i]].baseColor;
                    }
                    this.clickedButton = null;
                    this.playGame = false;
                    howToPlay = false;
                    controls = false;
                    backToMainMenu = false;
                }
            }
        }
        if (!this.playGame && !howToPlay && !controls) {
            this.context.font = "bold " + Math.trunc(this.width * 0.03125) + "px Arial";
            this.context.fillStyle = "black";
            // this.context.fillText("Schimata", this.width/2, this.height/7, 300);
            this.context.fillText("Schimata", (this.width / 2), this.buttons["Play Game"].yPos - 100, 300);
            
            for (let i = 0; i < buttonKeys.length; i++) {
                if ((this.buttons[buttonKeys[i]].text === "Play Game") || 
                (this.buttons[buttonKeys[i]].text === "How To Play") || 
                (this.buttons[buttonKeys[i]].text === "Controls")) {
                    this.buttons[buttonKeys[i]].drawButton(this.context, this.width);
                    this.buttons[buttonKeys[i]].active = true;
                }
                else {
                    this.buttons[buttonKeys[i]].active = false;
                }
            }
        }

        else if (this.playGame && !howToPlay && !backToMainMenu && !controls) {
            for (let i = 0; i < buttonKeys.length; i++) {
                this.buttons[buttonKeys[i]].active = false;
            }
            this.playGame = false;
            menuLoop = false;

            // Start game
            const newCanvasField = document.getElementById("canvas-field");
            let state = new _canvas__WEBPACK_IMPORTED_MODULE_0__["default"](newCanvasField);

            // cell is 108 by 108

            state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_2__["default"]([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 0, 0, 0, temp, "#3cba54", "pink", false, "(0, 0) is being clicked")
            ]));

            state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_2__["default"]([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 0, 0, temp + Math.trunc(this.width * 0.015625), temp, "#db3236", "pink", false, "(0,0) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](1, 0, temp, temp + Math.trunc(this.width * 0.015625), temp, "#db3236", "pink", false, "(1,0) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 1, 0, (temp * 2) + Math.trunc(this.width * 0.015625), temp, "#db3236", "pink", false, "(0,1) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](1, 1, temp, (temp * 2) + Math.trunc(this.width * 0.015625), temp, "#db3236", "pink", false, "(1,1) is being clicked")
            ]));

            state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_2__["default"]([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 0, 0, (temp * 3) + Math.trunc(this.width * 0.03125), temp, "#4885ed", "pink", false, "(0,0) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 1, 0, (temp * 4) + Math.trunc(this.width * 0.03125), temp, "#4885ed", "pink", false, "(0,1) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](1, 1, temp, (temp * 4) + Math.trunc(this.width * 0.03125), temp, "#4885ed", "pink", false, "(1,1) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 2, 0, (temp * 5) + Math.trunc(this.width * 0.03125), temp, "#4885ed", "pink", false, "(0,2) is being clicked")
            ]));

            state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_2__["default"]([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 0, (temp * 2) + Math.trunc(this.width * 0.015625), 0, temp, "#f4c20d", "pink", false, "(0,0) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 1, (temp * 2) + Math.trunc(this.width * 0.015625), temp, temp, "#f4c20d", "pink", false, "(0,1) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](1, 1, (temp * 3) + Math.trunc(this.width * 0.015625), temp, temp, "#f4c20d", "pink", false, "(1,1) is being clicked"),
            ]));

            state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_2__["default"]([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 0, (temp * 2) + Math.trunc(this.width * 0.015625), (temp * 2) + Math.trunc(this.width * 0.015625), temp, "#551A8B", "pink", false, "(0,0) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 1, (temp * 2) + Math.trunc(this.width * 0.015625), (temp * 3) + Math.trunc(this.width * 0.015625), temp, "#551A8B", "pink", false, "(0,1) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 2, (temp * 2) + Math.trunc(this.width * 0.015625), (temp * 4) + Math.trunc(this.width * 0.015625), temp, "#551A8B", "pink", false, "(0,2) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](1, 2, (temp * 3) + Math.trunc(this.width * 0.015625), (temp * 4) + Math.trunc(this.width * 0.015625), temp, "#551A8B", "pink", false, "(1,2) is being clicked")
            ]));

            state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_2__["default"]([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 0, (temp * 2) + Math.trunc(this.width * 0.015625), (temp * 5) + Math.trunc(this.width * 0.03125), temp, "#009999", "pink", false, "(0,0) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](1, 0, (temp * 3) + Math.trunc(this.width * 0.015625), (temp * 5) + Math.trunc(this.width * 0.03125), temp, "#009999", "pink", false, "(1,0) is being clicked"),
            ]));

            state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_2__["default"]([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 0, (temp * 4) + Math.trunc(this.width * 0.03125), 0, temp, "#3cba54", "pink", false, "(0, 0) is being clicked")
            ]));

            state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_2__["default"]([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 0, (temp * 4) + Math.trunc(this.width * 0.03125), temp + Math.trunc(this.width * 0.015625), temp, "#3cba54", "pink", false, "(0, 0) is being clicked")
            ]));

            state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_2__["default"]([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 0, (temp * 4) + Math.trunc(this.width * 0.03125), (temp * 2) + Math.trunc(this.width * 0.03125), temp, "#3cba54", "pink", false, "(0, 0) is being clicked")
            ]));

            state.addShape(new _shapes_logic__WEBPACK_IMPORTED_MODULE_2__["default"]([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 0, (temp * 4) + Math.trunc(this.width * 0.03125), (temp * 4) + Math.trunc(this.width * 0.03125), temp, "#db3236", "pink", false, "(0,0) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](1, 0, (temp * 5) + Math.trunc(this.width * 0.03125), (temp * 4) + Math.trunc(this.width * 0.03125), temp, "#db3236", "pink", false, "(0,1) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](0, 1, (temp * 4) + Math.trunc(this.width * 0.03125), (temp * 5) + Math.trunc(this.width * 0.03125), temp, "#db3236", "pink", false, "(1,0) is being clicked"),
                new _shapes__WEBPACK_IMPORTED_MODULE_1__["Square"](1, 1, (temp * 5) + Math.trunc(this.width * 0.03125), (temp * 5) + Math.trunc(this.width * 0.03125), temp, "#db3236", "pink", false, "(1,1) is being clicked")
            ]));
            // state.addShape(new ShapeContainer(singleCellShape)); //checked
            // state.addShape(new ShapeContainer(squareCellShape)); //checked
            // state.addShape(new ShapeContainer(smallTCellShape)); // checked
            // state.addShape(new ShapeContainer(smallLCellShape)); // checked
            // state.addShape(new ShapeContainer(bigLCellShape)); // checked
            // state.addShape(new ShapeContainer(doubleCellShape)); // checked
            // state.addShape(new ShapeContainer(singleCellShapeTwo));
            // state.addShape(new ShapeContainer(singleCellShapeThree));
            // state.addShape(new ShapeContainer(singleCellShapeFour));
            // state.addShape(new ShapeContainer(squareCellShapeTwo));
        }

        else if (!this.playGame && howToPlay && !backToMainMenu && !controls) {
            this.context.font = "bold " + Math.trunc(this.width * 0.03125) + "px Arial";
            this.context.fillStyle = "black";
            this.context.fillText("Rules", this.width / 2, this.height / 5, 300);
            this.context.fillText("Grab the pieces and place them into the grid.", this.width / 2, this.height / 3.3, 1500);
            this.context.fillText("Populate the grid to win!", this.width / 2, this.height / 2.5, 900);

            for (let i = 0; i < buttonKeys.length; i++) {
                if (this.buttons[buttonKeys[i]].text === "Back To Main Menu") {
                    this.buttons[buttonKeys[i]].drawButton(this.context, this.width);
                    this.buttons[buttonKeys[i]].active = true;
                }
                else {
                    this.buttons[buttonKeys[i]].active = false;
                }
            }
        }

        else if (!this.playGame && !howToPlay && !backToMainMenu && controls) {
            this.context.font = "bold " + Math.trunc(this.width * 0.03125) + "px Arial";
            this.context.fillStyle = "black";
            this.context.fillText("Controls", this.width / 2, this.height / 5, 300);
            this.context.fillText("Press Q to reset the board", this.width / 2, this.height / 3.3, 1500);
            // this.context.fillText("To rotate a piece, hold it with the mouse and press R.", this.width / 2, this.height / 2.5, 1500);

            for (let i = 0; i < buttonKeys.length; i++) {
                if (this.buttons[buttonKeys[i]].text === "Back To Main Menu") {
                    this.buttons[buttonKeys[i]].drawButton(this.context, this.width);
                    this.buttons[buttonKeys[i]].active = true;
                }
                else {
                    this.buttons[buttonKeys[i]].active = false;
                }
            }
        }

        // Can try drawing floating pieces here
        // for (let i = 0; i < 100; i++) {
        //     this.context.fillRect(0 + this.i, (this.height - 100) - this.i, 100, 100);
        //     this.i += 3;
        // }
    }
};

CanvasMenu.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
};

CanvasMenu.prototype.addButton = function (button) {
    this.buttons[button.text] = button;
};

CanvasMenu.prototype.getMouse = function (e) {

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

    mouseX = e.pageX - offsetX;
    mouseY = e.pageY - offsetY;

    return { x: mouseX, y: mouseY };
};

/***/ }),

/***/ "./game/shapes.js":
/*!************************!*\
  !*** ./game/shapes.js ***!
  \************************/
/*! exports provided: Square */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Square", function() { return Square; });
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

// export const singleCellShape = [
//     // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
//     new Square(0, 0, 0, 0, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
// ];

// export const squareCellShape = [
//     // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
//     new Square(0, 0, 0, 138, 108, "#db3236", "pink", false, "(0,0) is being clicked"),
//     new Square(1, 0, 108, 138, 108, "#db3236", "pink", false, "(1,0) is being clicked"),
//     new Square(0, 1, 0, 246, 108, "#db3236", "pink", false, "(0,1) is being clicked"),
//     new Square(1, 1, 108, 246, 108, "#db3236", "pink", false, "(1,1) is being clicked")
// ];

// export const smallTCellShape = [
//     // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
//     new Square(0, 0, 0, 384, 108, "#4885ed", "pink", false, "(0,0) is being clicked"),
//     new Square(0, 1, 0, 492, 108, "#4885ed", "pink", false, "(0,1) is being clicked"),
//     new Square(1, 1, 108, 492, 108, "#4885ed", "pink", false, "(1,1) is being clicked"),
//     new Square(0, 2, 0, 600, 108, "#4885ed", "pink", false, "(0,2) is being clicked")
// ];

// export const smallLCellShape = [
//     // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
//     new Square(0, 0, 246, 0, 108, "#f4c20d", "pink", false, "(0,0) is being clicked"),
//     new Square(0, 1, 246, 108, 108, "#f4c20d", "pink", false, "(0,1) is being clicked"),
//     new Square(1, 1, 354, 108, 108, "#f4c20d", "pink", false, "(1,1) is being clicked"),
// ];

// export const bigLCellShape = [
//     // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
//     new Square(0, 0, 246, 246, 108, "#551A8B", "pink", false, "(0,0) is being clicked"),
//     new Square(0, 1, 246, 354, 108, "#551A8B", "pink", false, "(0,1) is being clicked"),
//     new Square(0, 2, 246, 462, 108, "#551A8B", "pink", false, "(0,2) is being clicked"),
//     new Square(1, 2, 354, 462, 108, "#551A8B", "pink", false, "(1,2) is being clicked")
// ];

// export const doubleCellShape = [
//     // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
//     new Square(0, 0, 246, 590, 108, "#009999", "pink", false, "(0,0) is being clicked"),
//     new Square(1, 0, 354, 590, 108, "#009999", "pink", false, "(1,0) is being clicked"),
// ];

// export const singleCellShapeTwo = [
//     // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
//     new Square(0, 0, 482, 0, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
// ];

// export const singleCellShapeThree = [
//     // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
//     new Square(0, 0, 482, 128, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
// ];

// export const singleCellShapeFour = [
//     // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
//     new Square(0, 0, 482, 256, 108, "#3cba54", "pink", false, "(0, 0) is being clicked")
// ];

// export const squareCellShapeTwo = [
//     // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
//     new Square(0, 0, 482, 384, 108, "#db3236", "pink", false, "(0,0) is being clicked"),
//     new Square(1, 0, 590, 384, 108, "#db3236", "pink", false, "(0,1) is being clicked"),
//     new Square(0, 1, 482, 492, 108, "#db3236", "pink", false, "(1,0) is being clicked"),
//     new Square(1, 1, 590, 492, 108, "#db3236", "pink", false, "(1,1) is being clicked")
// ];

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
            // check if every corner of each cell is inside the grid to then snap
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
    let colliding = false;

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

                // this.cellArray[i].xPos = this.cellArray[i].originX;
                // this.cellArray[i].yPos = this.cellArray[i].originY;
                colliding = true;
            }
        }
    }

    if (colliding) {
        for (let i = 0; i < cellArrayLength; i++) {
            this.cellArray[i].xPos = this.cellArray[i].originX;
            this.cellArray[i].yPos = this.cellArray[i].originY;
        }
    }

    return colliding;
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map