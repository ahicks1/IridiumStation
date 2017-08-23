
/// <reference path="Vec2.ts"/>
/// <reference path="main.ts"/>
/// <reference path="spacenode.ts"/>
namespace GUI {
  export function drawGui(r:GameState)
  {
    r.uiCtx.clearRect(0, 0, r.contextSize.x, r.contextSize.y);
    //draw bottom gui
    r.uiCtx.fillStyle = "#3a3e6d"
    r.uiCtx.fillRect(0,r.contextSize.y-100,r.contextSize.x,100)
    //draw buttons
    r.uiCtx.fillStyle = "#84aae8";
    buttons.forEach(button => {
      r.uiCtx.fillRect(button.pos.x,button.pos.y,button.size.x,button.size.y);
    });
  }
  export var buttons: GameButton[] = [];

  export function updateGui(r:GameState)
  {

  }

  export function handleTouches(r: GameState, e: MouseEvent):Boolean
  { let caught = false;
    let x = e.layerX; //pageX+r.canvasOffset.x;
    let y = e.layerY; //pageY+r.canvasOffset.y;
    buttons.forEach((button,idx,collection) => {
      if(x-button.pos.x<button.size.x && x-button.pos.x>0 && y-button.pos.y<button.size.y && y-button.pos.y>0)
      {
        console.log("checking idx: "+idx);
        button.onClick(r,e);
        caught = true;
      }
    });
    console.log(caught);
    return caught;
  }
  export function createButton(onClick:(r:GameState, e: MouseEvent)=>void, pos:Vec2, size:Vec2):GameButton
  {
    let bt = new GameButton(onClick, pos, size);
    buttons.push(bt);
    return bt;
  }
}

class GameButton {
  constructor(public onClick:(r: GameState, e: MouseEvent)=>void, public pos:Vec2, public size:Vec2){

  }
}
