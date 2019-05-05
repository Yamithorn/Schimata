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
                // if (that.selection.cellArray[i].xPos > 740 && that.selection.cellArray[i].yPos > 0 &&
                //     that.selection.cellArray[i].xPos < 1280 && that.selection.cellArray[i].yPos < 540) {
                // if (that.selection.cellArray[i].xPos > ((this.width / 2) + this.width / 8) && that.selection.cellArray[i].yPos > (this.height / 5) &&
                //     that.selection.cellArray[i].xPos < (((this.width / 2) + this.width / 8) + (108 * 5)) && that.selection.cellArray[i].yPos < (this.height / 5) + (108 * 5)) {
                //         that.inside = true;
                //         console.log("inside");
                // }

                if (that.selection.cellArray.every((element) => {
                    return element.xPos > ((this.width / 2) - this.width / 10) && 
                        element.xPos < (((this.width / 2) - this.width / 10) + (temp * 5)) && 
                        element.yPos > (this.height / 11) &&
                        element.yPos < (this.height / 11) + (temp * 5);
                })) {
                    that.inside = true;
                    console.log("inside");
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
                        that.colliding = that.selection.overlappingOtherShapes(this.shapes[i], temp);
                    }
                }
                if (!that.colliding) {
                    for (let i = 0; i < length; i++) {
                        // add in logic to make sure all of the shapes are within the square for it to snap
                        // console.log(`mouse x is ${mouseX} and mouse y is ${mouseY}`);
                        // that.selection.overlapping(mouseX, mouseY, 740, 0, 540, 540, 108, that.grid);
                        // that.selection.cellArray[i].clicked = false;
                        
                        // that.selection.overlapping(mouseX, mouseY, ((this.width / 2) - this.width / 10), (this.height / 11), 540, 540, temp, that.grid);
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
                // context.rect(740 + (108 * i), 0 + (108 * j), 108, 108);
                // context.rect(((this.width/2) - this.width/10) + (108 * i), this.height/11 + (108 * j), 108, 108);
                context.rect(((this.width / 2) - this.width / 10) + (temp * i), this.height / 11 + (temp * j), temp, temp);
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