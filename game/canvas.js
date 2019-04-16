export default function CanvasState(canvas) {
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
                // debugger;

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

            let totalShapesLength = this.shapes.length;
            for (let i = 0; i < totalShapesLength; i++) {
                if (that.selection.locus !== this.shapes[i].locus) {
                    that.colliding = that.selection.overlappingOtherShapes(this.shapes[i], 108);
                }
            }

            let mouse = that.getMouse(e);
            let length = that.selection.cellArray.length;

            for (let i = 0; i < length; i++) {
                if (that.selection.cellArray[i].xPos > (740 - 54) && that.selection.cellArray[i].yPos > (0 - 54) && 
                    that.selection.cellArray[i].xPos + 54 < 1280 && that.selection.cellArray[i].yPos + 54 < 540) {
                        that.inside = true;
                }
                else {
                    that.inside = false; 
                    for (let j = 0; j < length; j++) {
                        // SLIGHTLY BUGGY BUT STILL WORKS
                        that.selection.cellArray[j].xPos = that.selection.cellArray[j].originX;
                        that.selection.cellArray[j].yPos = that.selection.cellArray[j].originY;
                    }
                    break;
                }
            }
            // debugger;
            if (that.inside && !that.colliding) {
                for (let i = 0; i < length; i++) {
                    // add in logic to make sure all of the shapes are within the square for it to snap
                    that.selection.overlapping(mouse.x, mouse.y, 740, 0, 540, 540, 108);
                    that.selection.cellArray[i].clicked = false;
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

            for (let i = 0; i < length; i++) {
                // if (shape.xCoordArray[i] > this.width || shape.yCoordArray[i] > this.height || 
                //     shape.xCoordArray[i] + shape.shapeWidthArray[i] < 0 || shape.yCoordArray[i] + shape.shapeHeightArray[i] < 0) continue;
                if (shape[i].xPos > this.width || shape[i].yPos > this.height ||
                    shape[i].xPos + shape[i].cellSize < 0 || shape[i].yPos + shape[i].cellSize < 0) continue;
            }

            shapes[i].draw(context);
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