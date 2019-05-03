import CanvasMenu from "./menu";

import Button from "./button";

function init() {

    const canvasField = document.getElementById("canvas-field");
    const documentField = document.getElementsByClassName("body")[0];
    const documentFieldWidth = documentField.clientWidth;
    const documentFieldHeight = documentField.clientHeight;

    canvasField.setAttribute("width", documentFieldWidth);
    canvasField.setAttribute("height", documentFieldHeight);

    let menu = new CanvasMenu(canvasField);

    // width, height, xPos, yPos, baseColor, clickedColor, text
    const playButton = new Button(324, 108, (documentFieldWidth / 2) - 324 / 2, 
                                (documentFieldHeight / 2) - 108 * 2, 
                                "#4285F4", "#0F9D58", "Play Game");
    const rulesButton = new Button(324, 108, (documentFieldWidth / 2) - 324 / 2, 
                                (documentFieldHeight / 2), 
                                "#4285F4", "#0F9D58", "How To Play");
    const controlsButton = new Button(324, 108, (documentFieldWidth / 2) - 324 / 2, 
                                (documentFieldHeight / 2) + 108 * 2, 
                                "#4285F4", "#0F9D58", "Controls");
    const returnButton = new Button(432, 108, (documentFieldWidth / 2) - 432 / 2, 
                                (documentFieldHeight / 2) + 108 * 2, 
                                "#4285F4", "#0F9D58", "Back To Main Menu");

    menu.addButton(playButton);
    menu.addButton(rulesButton);
    menu.addButton(returnButton);
    menu.addButton(controlsButton);
}

init();