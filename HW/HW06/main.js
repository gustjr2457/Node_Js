//Canvas Element 불러오기
var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

var colors = ["whitepurple", "yellow", "red", "magenta", "pink", "cyan", "orange"];

class HeartObject
{
    constructor(col, radius, positionX, positionY)
    {
        this.color = col;
        this.radius = radius;
        this.positionX = positionX; 
        this.positionY = positionY;
    }
    draw()
    {
        ctx.beginPath();
        for (var angle = 0; angle < Math.PI * 2; angle += 0.01) {
        var x = this.positionX + this.radius * Math.cos(angle);
        var y = this.positionY + this.radius * Math.sin(angle);
        ctx.lineTo(x, y);
        }
        var colorIndex = Math.floor(Math.random()*7);
        ctx.fillStyle = colors[colorIndex];
        ctx.fill();
        ctx.closePath();        
    }
}




function draw()
{
    var Circle = new HeartObject(Math.random()*6%6,Math.random()*100,Math.random()*500,Math.random()*500);
    Circle.draw();
    requestAnimationFrame(draw);
}

draw();
