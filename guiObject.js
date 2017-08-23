/// <reference path="Vec2.ts"/>
/// <reference path="main.ts"/>
/// <reference path="spacenode.ts"/>
var GUI;
(function (GUI) {
    function drawGui(r) {
        r.uiCtx.clearRect(0, 0, r.contextSize.x, r.contextSize.y);
        //draw bottom gui
        r.uiCtx.fillStyle = "#3a3e6d";
        r.uiCtx.fillRect(0, r.contextSize.y - 100, r.contextSize.x, 100);
        //draw buttons
        r.uiCtx.fillStyle = "#84aae8";
        GUI.buttons.forEach(function (button) {
            r.uiCtx.fillRect(button.pos.x, button.pos.y, button.size.x, button.size.y);
        });
    }
    GUI.drawGui = drawGui;
    GUI.buttons = [];
    function updateGui(r) {
    }
    GUI.updateGui = updateGui;
    function handleTouches(r, e) {
        var caught = false;
        var x = e.layerX; //pageX+r.canvasOffset.x;
        var y = e.layerY; //pageY+r.canvasOffset.y;
        GUI.buttons.forEach(function (button, idx, collection) {
            if (x - button.pos.x < button.size.x && x - button.pos.x > 0 && y - button.pos.y < button.size.y && y - button.pos.y > 0) {
                console.log("checking idx: " + idx);
                button.onClick(r, e);
                caught = true;
            }
        });
        console.log(caught);
        return caught;
    }
    GUI.handleTouches = handleTouches;
    function createButton(onClick, pos, size) {
        var bt = new GameButton(onClick, pos, size);
        GUI.buttons.push(bt);
        return bt;
    }
    GUI.createButton = createButton;
})(GUI || (GUI = {}));
var GameButton = (function () {
    function GameButton(onClick, pos, size) {
        this.onClick = onClick;
        this.pos = pos;
        this.size = size;
    }
    return GameButton;
}());
