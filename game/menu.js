import CanvasState from "./canvas";
import { Square } from "./shapes";
import ShapeContainer from "./shapes_logic";

let menuLoop = true;

export default function CanvasMenu(canvas) {

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
            let state = new CanvasState(newCanvasField);

            // cell is 108 by 108

            state.addShape(new ShapeContainer([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new Square(0, 0, 0, 0, temp, "#3cba54", "pink", false, "(0, 0) is being clicked")
            ]));

            state.addShape(new ShapeContainer([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new Square(0, 0, 0, temp + Math.trunc(this.width * 0.015625), temp, "#db3236", "pink", false, "(0,0) is being clicked"),
                new Square(1, 0, temp, temp + Math.trunc(this.width * 0.015625), temp, "#db3236", "pink", false, "(1,0) is being clicked"),
                new Square(0, 1, 0, (temp * 2) + Math.trunc(this.width * 0.015625), temp, "#db3236", "pink", false, "(0,1) is being clicked"),
                new Square(1, 1, temp, (temp * 2) + Math.trunc(this.width * 0.015625), temp, "#db3236", "pink", false, "(1,1) is being clicked")
            ]));

            state.addShape(new ShapeContainer([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new Square(0, 0, 0, (temp * 3) + Math.trunc(this.width * 0.03125), temp, "#4885ed", "pink", false, "(0,0) is being clicked"),
                new Square(0, 1, 0, (temp * 4) + Math.trunc(this.width * 0.03125), temp, "#4885ed", "pink", false, "(0,1) is being clicked"),
                new Square(1, 1, temp, (temp * 4) + Math.trunc(this.width * 0.03125), temp, "#4885ed", "pink", false, "(1,1) is being clicked"),
                new Square(0, 2, 0, (temp * 5) + Math.trunc(this.width * 0.03125), temp, "#4885ed", "pink", false, "(0,2) is being clicked")
            ]));

            state.addShape(new ShapeContainer([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new Square(0, 0, (temp * 2) + Math.trunc(this.width * 0.015625), 0, temp, "#f4c20d", "pink", false, "(0,0) is being clicked"),
                new Square(0, 1, (temp * 2) + Math.trunc(this.width * 0.015625), temp, temp, "#f4c20d", "pink", false, "(0,1) is being clicked"),
                new Square(1, 1, (temp * 3) + Math.trunc(this.width * 0.015625), temp, temp, "#f4c20d", "pink", false, "(1,1) is being clicked"),
            ]));

            state.addShape(new ShapeContainer([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new Square(0, 0, (temp * 2) + Math.trunc(this.width * 0.015625), (temp * 2) + Math.trunc(this.width * 0.015625), temp, "#551A8B", "pink", false, "(0,0) is being clicked"),
                new Square(0, 1, (temp * 2) + Math.trunc(this.width * 0.015625), (temp * 3) + Math.trunc(this.width * 0.015625), temp, "#551A8B", "pink", false, "(0,1) is being clicked"),
                new Square(0, 2, (temp * 2) + Math.trunc(this.width * 0.015625), (temp * 4) + Math.trunc(this.width * 0.015625), temp, "#551A8B", "pink", false, "(0,2) is being clicked"),
                new Square(1, 2, (temp * 3) + Math.trunc(this.width * 0.015625), (temp * 4) + Math.trunc(this.width * 0.015625), temp, "#551A8B", "pink", false, "(1,2) is being clicked")
            ]));

            state.addShape(new ShapeContainer([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new Square(0, 0, (temp * 2) + Math.trunc(this.width * 0.015625), (temp * 5) + Math.trunc(this.width * 0.03125), temp, "#009999", "pink", false, "(0,0) is being clicked"),
                new Square(1, 0, (temp * 3) + Math.trunc(this.width * 0.015625), (temp * 5) + Math.trunc(this.width * 0.03125), temp, "#009999", "pink", false, "(1,0) is being clicked"),
            ]));

            state.addShape(new ShapeContainer([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new Square(0, 0, (temp * 4) + Math.trunc(this.width * 0.03125), 0, temp, "#3cba54", "pink", false, "(0, 0) is being clicked")
            ]));

            state.addShape(new ShapeContainer([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new Square(0, 0, (temp * 4) + Math.trunc(this.width * 0.03125), temp + Math.trunc(this.width * 0.015625), temp, "#3cba54", "pink", false, "(0, 0) is being clicked")
            ]));

            state.addShape(new ShapeContainer([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new Square(0, 0, (temp * 4) + Math.trunc(this.width * 0.03125), (temp * 2) + Math.trunc(this.width * 0.03125), temp, "#3cba54", "pink", false, "(0, 0) is being clicked")
            ]));

            state.addShape(new ShapeContainer([
                // xGrid, yGrid, xPos, yPos, cellSize, baseColor, clickedColor, clicked, state, message
                new Square(0, 0, (temp * 4) + Math.trunc(this.width * 0.03125), (temp * 4) + Math.trunc(this.width * 0.03125), temp, "#db3236", "pink", false, "(0,0) is being clicked"),
                new Square(1, 0, (temp * 5) + Math.trunc(this.width * 0.03125), (temp * 4) + Math.trunc(this.width * 0.03125), temp, "#db3236", "pink", false, "(0,1) is being clicked"),
                new Square(0, 1, (temp * 4) + Math.trunc(this.width * 0.03125), (temp * 5) + Math.trunc(this.width * 0.03125), temp, "#db3236", "pink", false, "(1,0) is being clicked"),
                new Square(1, 1, (temp * 5) + Math.trunc(this.width * 0.03125), (temp * 5) + Math.trunc(this.width * 0.03125), temp, "#db3236", "pink", false, "(1,1) is being clicked")
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