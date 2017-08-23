/// <reference path="Vec2.ts"/>
/// <reference path="main.ts"/>
class SpaceNode {
  isSelected: Boolean = false;
  connectedNode: SpaceNode = null;
  velocity: Vec2 = new Vec2(0,0);

  constructor(public numConnections: number, public powerRange: number, public position: Vec2) {


  }

  draw(r: GameState){
    let trueX = this.position.x+r.camera.x;
    let trueY = this.position.y+r.camera.y;
    ctx.fillStyle = "#ffffff";
    if(this.isSelected)
    {
      ctx.strokeStyle = 'white';
      ctx.beginPath();
      ctx.ellipse(trueX,trueY,this.powerRange, this.powerRange, 0, 0, 2*Math.PI,)
      ctx.stroke();

      //ctx.ellipse
    }
    if(this.connectedNode != null)
    {
      ctx.beginPath();
      ctx.moveTo(trueX,trueY);
      ctx.lineTo(this.connectedNode.position.x+r.camera.x,this.connectedNode.position.y+r.camera.y);
      ctx.stroke();

    }
    ctx.fillRect(trueX-10,trueY-10,20,20);

    //ctx.fillRect(100,100,100,100);
  }

  update(r: GameState)
  {
    if(this.isSelected)
    {
      this.connectedNode = null;
      let currentDistance: number = 1000000;
      this.moveTo(r.mousePosition)
      r.nodes.forEach((node,idx,nodes) => {
          let dist = this.position.distanceTo(node.position);
          if(dist < currentDistance && dist > 0.001 ){
            currentDistance = dist;
            if(dist<this.powerRange)
            {
              this.connectedNode = node;
            }

          }
      })
    }
  }

  moveTo(pos: Vec2)
  {
    this.position.x = pos.x;
    this.position.y = pos.y;
  }
}
