
/// <reference path="spacenode.ts"/>
/// <reference path="Vec2.ts"/>
/// <reference path="guiObject.ts"/>

var bgCanvas = <HTMLCanvasElement>document.getElementById('background-layer');
var mainCanvas = <HTMLCanvasElement> document.getElementById('game-layer');
var uiCanvas = <HTMLCanvasElement> document.getElementById('ui-layer');

var bgCtx = bgCanvas.getContext('2d');
var ctx = mainCanvas.getContext('2d');
var uiCtx = uiCanvas.getContext('2d');
document.addEventListener("mousedown",mouseDownHandler,true);
document.addEventListener("mousemove",mouseMoveHandler,true);
document.addEventListener("keydown",keydownEventHandler,true);
document.addEventListener("keyup",keyupEventHandler,true);
//canvas.addEventListener("")

var nodes: SpaceNode[] = [];
var pressedKeys: any = {};


type GameState = {
  energy: number,
  minerals: number,
  ctx:CanvasRenderingContext2D,
  uiCtx:CanvasRenderingContext2D,
  camera:Vec2,
  mousePosition:Vec2,
  contextSize:Vec2,
  canvasOffset:Vec2,
  keys: any,
  currentlySelected:SpaceNode
  nodes:SpaceNode[];
}
var currentState:GameState = {
  energy:0,
  minerals: 0,
  uiCtx:uiCtx,
  ctx:ctx,
  camera:new Vec2(0,0),
  mousePosition: new Vec2(0,0),
  contextSize: new Vec2(1200,800),
  canvasOffset: new Vec2(mainCanvas.offsetLeft,mainCanvas.offsetTop),
  keys:pressedKeys,
  currentlySelected:null,
  nodes:nodes
}

function mainLoop(time: number)
{

  updateState(currentState);
  drawFrame(currentState);

  GUI.updateGui(currentState);
  window.requestAnimationFrame(mainLoop);
}

function mouseDownHandler(event: MouseEvent) {

  let trueX = event.pageX-mainCanvas.offsetLeft-currentState.camera.x;
  let trueY = event.pageY-mainCanvas.offsetTop-currentState.camera.y;
  if(GUI.handleTouches(currentState,event)) return;

  if(currentState.currentlySelected != null)
  {
    currentState.currentlySelected.isSelected = false;
    currentState.currentlySelected = null;
  } else {

  }

}

function mouseMoveHandler(event: MouseEvent) {
  let trueX = event.pageX-mainCanvas.offsetLeft-currentState.camera.x;
  let trueY = event.pageY-mainCanvas.offsetTop-currentState.camera.y;
  currentState.mousePosition.x = trueX;
  currentState.mousePosition.y = trueY;
}

function keydownEventHandler(event: KeyboardEvent)
{
  console.log(event.code+" Pressed");
  pressedKeys[event.keyCode] = true;
}
function keyupEventHandler(event: KeyboardEvent)
{
  console.log(event.code+" Released");
  delete pressedKeys[event.keyCode];
}

var cameraSpeed = 5;
function updateState(r: GameState)
{
  let cameraDelta: Vec2 = new Vec2(0,0);
  //Update camera position
  if(pressedKeys[65] == true)//left
    {cameraDelta.x -= cameraSpeed;}
  if(pressedKeys[68] == true)//right
    {cameraDelta.x += cameraSpeed;}
  if(pressedKeys[87] == true)//up
    {cameraDelta.y -= cameraSpeed;}
  if(pressedKeys[83] == true)//down
    {cameraDelta.y += cameraSpeed;}
  currentState.camera.add(cameraDelta);
  currentState.mousePosition.sub(cameraDelta);

  nodes.forEach((node,idx,nds) => {
    node.update(r);
  });
}

function drawFrame(r: GameState)
{
  //Fill background
  //ctx.fillStyle = "#515151";
  ctx.clearRect(0,0,mainCanvas.width,mainCanvas.height);
  //fill true background
  //ctx.fillStyle = "#000000";
  //ctx.fillRect(r.camera.x,r.camera.y,mainCanvas.width,mainCanvas.height);
  nodes.forEach((node,idx,nds) => {
    node.draw(r);
  });

}
function addNode(x: number,y: number){
  let newNode = new SpaceNode(6,getRandomInt(50,200),new Vec2(x,x));
  newNode.isSelected = true;
  currentState.currentlySelected = newNode;
  nodes.push(newNode);
}



ctx.fillStyle = "#000000";
bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
GUI.createButton((r,e)=>{addNode(e.x,e.y)},new Vec2(100,currentState.contextSize.y-90), new Vec2(80,80))
GUI.drawGui(currentState);
window.requestAnimationFrame(mainLoop);
