/// <reference path="Vec2.ts"/>
/// <reference path="main.ts"/>
var SpaceNode = (function () {
    function SpaceNode(numConnections, powerRange, position) {
        this.numConnections = numConnections;
        this.powerRange = powerRange;
        this.position = position;
        this.isSelected = false;
        this.connectedNode = null;
        this.velocity = new Vec2(0, 0);
    }
    SpaceNode.prototype.draw = function (r) {
        var trueX = this.position.x + r.camera.x;
        var trueY = this.position.y + r.camera.y;
        ctx.fillStyle = "#ffffff";
        if (this.isSelected) {
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.ellipse(trueX, trueY, this.powerRange, this.powerRange, 0, 0, 2 * Math.PI);
            ctx.stroke();
            //ctx.ellipse
        }
        if (this.connectedNode != null) {
            ctx.beginPath();
            ctx.moveTo(trueX, trueY);
            ctx.lineTo(this.connectedNode.position.x + r.camera.x, this.connectedNode.position.y + r.camera.y);
            ctx.stroke();
        }
        ctx.fillRect(trueX - 10, trueY - 10, 20, 20);
        //ctx.fillRect(100,100,100,100);
    };
    SpaceNode.prototype.update = function (r) {
        var _this = this;
        if (this.isSelected) {
            this.connectedNode = null;
            var currentDistance_1 = 1000000;
            this.moveTo(r.mousePosition);
            r.nodes.forEach(function (node, idx, nodes) {
                var dist = _this.position.distanceTo(node.position);
                if (dist < currentDistance_1 && dist > 0.001) {
                    currentDistance_1 = dist;
                    if (dist < _this.powerRange) {
                        _this.connectedNode = node;
                    }
                }
            });
        }
    };
    SpaceNode.prototype.moveTo = function (pos) {
        this.position.x = pos.x;
        this.position.y = pos.y;
    };
    return SpaceNode;
}());
