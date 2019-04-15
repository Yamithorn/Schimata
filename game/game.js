import ShapeContainer from "./shapes_logic";
import CanvasState from "./canvas";
import { singleCellShape, singleCellShapeTwo, singleCellShapeThree, singleCellShapeFour, 
    doubleCellShape, squareCellShape, squareCellShapeTwo, smallTCellShape, smallLCellShape, bigLCellShape } from "./shapes";

function init() {
    const canvasField = document.getElementById("canvas-field");

    canvasField.setAttribute("width", "1280");
    canvasField.setAttribute("height", "720");

    // const ctx = canvasField.getContext("2d");

    // Corner square is 270 by 270
    let state = new CanvasState(canvasField);
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

init();