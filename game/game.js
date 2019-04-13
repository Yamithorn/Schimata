import ShapeContainer from "./shapes_logic";
import CanvasState from "./canvas";
import { singleCellShape, doubleCellShape, squareShape, smallTShape, littleLShape, bigLShape } from "./shapes";

function init() {
    const canvasField = document.getElementById("canvas-field");

    canvasField.setAttribute("width", "1280");
    canvasField.setAttribute("height", "720");

    // const ctx = canvasField.getContext("2d");

    // Corner square is 270 by 270
    let state = new CanvasState(canvasField);
    // cell is 108 by 108
    state.addShape(new ShapeContainer(singleCellShape));
    state.addShape(new ShapeContainer(squareShape));
    // state.addShape(new ShapeContainer(smallTShape));
    // state.addShape(new ShapeContainer(littleLShape));
    // state.addShape(new ShapeContainer(bigLShape));
    // state.addShape(new ShapeContainer(doubleCellShape));
}

init();