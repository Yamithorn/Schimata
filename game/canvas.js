export default function CanvasState(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.getContext("2d");
    this.context.lineWidth = 2;
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

                // let selectedShape = shapes[i];
                // // Keep track of where we clicked in the object so we can move it smoothly
                // that.dragoffX = mouseX - selectedShape.xCoord;
                // that.dragoffY = mouseY - selectedShape.yCoord;
                // that.dragging = true;
                // that.selection = selectedShape;
                // that.valid = false;
                // return;

                that.mouseActive = true;

                let selectedShape = shapes[i];
                // let length = shapes[i].colorArray.length;
                let length = selectedShape.shapeArray.length;
                // debugger;

                for (let j = length - 1; j >= 0; j--) {
                    // Keep track of where we clicked in the object so we can move it smoothly
                    that.dragoffXArray.push(mouseX - selectedShape.shapeArray[j].xCoord);
                    that.dragoffYArray.push(mouseY - selectedShape.shapeArray[j].yCoord);
                    // debugger;
                    // that.dragoffXArray.push(mouseX - selectedShape.xCoordArray[j]);
                    // that.dragoffYArray.push(mouseY - selectedShape.yCoordArray[j]);
                    that.dragging = true;
                    that.selection = selectedShape.shapeArray;
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
    // PROBLEM IS HERE
    canvas.addEventListener("mousemove", function (e) {

        if (that.dragging) {
            // debugger;
            let mouse = that.getMouse(e);
            // We want to drag the shape from where we clicked it, which is why we saved the offset
            // that.selection.xCoord = mouse.x - that.dragoffX;
            // that.selection.yCoord = mouse.y - that.dragoffY;
            // that.valid = false; // Something is dragging so we must redraw

            // let length = that.selection.colorArray.length;
            let length = that.selection.length;

            for (let i = 0; i < length; i++) {
                // that.selection.xCoordArray[i] = mouse.x - that.dragoffXArray[i];
                // that.selection.yCoordArray[i] = mouse.y - that.dragoffYArray[i];
                // console.log(that.selection);
                that.selection[i].xCoord = mouse.x - that.dragoffXArray[i];
                that.selection[i].yCoord = mouse.y - that.dragoffYArray[i];
                that.valid = false; // Something is dragging so we must redraw
            }
        }
    }, true);

    document.addEventListener("mouseup", (e) => {
        that.dragging = false;
        that.dragoffXArray = [];
        that.dragoffYArray = [];
        that.mouseActive = false;
        that.selection = null;
        that.valid = false;
        // debugger;
    }, true);

    canvas.addEventListener("mouseup", (e) => {
        
        that.dragging = false;
        // Empty out arrays for future use
        that.dragoffXArray = [];
        that.dragoffYArray = [];
        that.mouseActive = false;
        // debugger;

        // Add logic for shapes to snap onto grid
        // use the mouseX and mouseY and see if it is overlapping within the grid
        
        if (that.selection) {
            let mouse = that.getMouse(e);

            // let length = that.selection.colorArray.length;
            let length = that.selection.length;
            // that.selection
            // debugger;
            for (let i = 0; i < length; i++) {
                // that.selection.overlapping(mouse.x, mouse.y, 740, 0, 540, 540, 108); // Add this back in
                that.valid = false; // Something is dragging so we must redraw
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
                if (shape[i].xCoord > this.width || shape[i].yCoord > this.height ||
                    shape[i].xCoord + shape[i].shapeWidth < 0 || shape[i].yCoord + shape[i].shapeHeight < 0) continue;
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
            context.strokeStyle = this.selectionColor;
            // context.lineWidth = this.selectionWidth;
            let selectedShape = this.selection;
            let length = selectedShape.length;
            for (let i = 0; i < length; i++) {
                // debugger;
                // context.strokeRect(selectedShape.xCoordArray[i], selectedShape.yCoordArray[i], 
                //     selectedShape.shapeWidthArray[i], selectedShape.shapeHeightArray[i]);
                context.strokeRect(selectedShape[i].xCoord, selectedShape[i].yCoord, 
                    selectedShape[i].shapeWidth, selectedShape[i].shapeHeight);
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