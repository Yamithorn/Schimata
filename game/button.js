export default class Button {
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

    drawButton(context) {
        context.lineWidth = 15;
        context.strokeRect(this.xPos, this.yPos, this.width, this.height);
        context.fillStyle = this.color;
        context.fillRect(this.xPos, this.yPos, this.width, this.height);
        context.font = "40px Arial";
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