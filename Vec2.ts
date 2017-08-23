class Vec2 {
  x:number;
  y:number;
  constructor(x: number,y:number)
  {
    this.x = x;
    this.y = y;
  }
  add(a:Vec2)
  {
    this.x += a.x;
    this.y += a.y;
  }

  sub(a:Vec2)
  {
    this.x -= a.x;
    this.y -= a.y;
  }

  distanceTo(b: Vec2) :number
  {
    let distSq = Math.pow(this.x-b.x,2) + Math.pow(this.y-b.y,2)
    return Math.sqrt(distSq);
  }
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
