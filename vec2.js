var Vec2 = (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vec2.prototype.add = function (a) {
        this.x += a.x;
        this.y += a.y;
    };
    Vec2.prototype.sub = function (a) {
        this.x -= a.x;
        this.y -= a.y;
    };
    Vec2.prototype.distanceTo = function (b) {
        var distSq = Math.pow(this.x - b.x, 2) + Math.pow(this.y - b.y, 2);
        return Math.sqrt(distSq);
    };
    return Vec2;
}());
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
