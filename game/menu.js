import CanvasState from "./canvas";
import {
    singleCellShape, singleCellShapeTwo, singleCellShapeThree, singleCellShapeFour,
    doubleCellShape, squareCellShape, squareCellShapeTwo, smallTCellShape, smallLCellShape, bigLCellShape
} from "./shapes";
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
            this.context.font = "bold 60px Arial";
            this.context.fillStyle = "black";
            // this.context.fillText("Schimata", this.width/2, this.height/7, 300);
            this.context.fillText("Schimata", (this.width / 2), this.buttons["Play Game"].yPos - 100, 300);

            for (let i = 0; i < buttonKeys.length; i++) {
                if ((this.buttons[buttonKeys[i]].text === "Play Game") || 
                (this.buttons[buttonKeys[i]].text === "How To Play") || 
                (this.buttons[buttonKeys[i]].text === "Controls")) {
                    this.buttons[buttonKeys[i]].drawButton(this.context);
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

            state.addShape(new ShapeContainer(singleCellShape));
            state.addShape(new ShapeContainer(squareCellShape));
            state.addShape(new ShapeContainer(smallTCellShape));
            state.addShape(new ShapeContainer(smallLCellShape));
            state.addShape(new ShapeContainer(bigLCellShape));
            state.addShape(new ShapeContainer(doubleCellShape));
            state.addShape(new ShapeContainer(singleCellShapeTwo));
            state.addShape(new ShapeContainer(singleCellShapeThree));
            state.addShape(new ShapeContainer(singleCellShapeFour));
            state.addShape(new ShapeContainer(squareCellShapeTwo));
        }

        else if (!this.playGame && howToPlay && !backToMainMenu && !controls) {
            this.context.font = "bold 60px Arial";
            this.context.fillStyle = "black";
            this.context.fillText("Rules", this.width / 2, this.height / 5, 300);
            this.context.fillText("Grab the pieces and place them into the grid.", this.width / 2, this.height / 3.3, 1500);
            this.context.fillText("Populate the grid to win!", this.width / 2, this.height / 2.5, 900);

            for (let i = 0; i < buttonKeys.length; i++) {
                if (this.buttons[buttonKeys[i]].text === "Back To Main Menu") {
                    this.buttons[buttonKeys[i]].drawButton(this.context);
                    this.buttons[buttonKeys[i]].active = true;
                }
                else {
                    this.buttons[buttonKeys[i]].active = false;
                }
            }
        }

        else if (!this.playGame && !howToPlay && !backToMainMenu && controls) {
            this.context.font = "bold 60px Arial";
            this.context.fillStyle = "black";
            this.context.fillText("Controls", this.width / 2, this.height / 5, 300);
            this.context.fillText("Press Q to reset the board", this.width / 2, this.height / 3.3, 1500);
            // this.context.fillText("To rotate a piece, hold it with the mouse and press R.", this.width / 2, this.height / 2.5, 1500);

            for (let i = 0; i < buttonKeys.length; i++) {
                if (this.buttons[buttonKeys[i]].text === "Back To Main Menu") {
                    this.buttons[buttonKeys[i]].drawButton(this.context);
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