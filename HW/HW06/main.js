var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class HeartObject
{
    constructor(x, y, color, scale)
    {
        this.x = x;
        this.y = y;
        this.color = color;
        this.scale = scale;
        this.seta = 0.3;
    }

    draw()
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        var radius = 5;
        ctx.moveTo(this.x, this.y);
        for(var i = 0; i < Math.PI; i += 0.01)
        {
            var rx = radius;
            var ry = 0;
            var tempX = rx;
            var tempY = ry;

            
            rx = (tempX * Math.cos(i) + tempY * Math.sin(i));
            ry = (tempX * -Math.sin(i) + tempY * Math.cos(i));
            
            rx -= radius;

            rx *= this.scale;
            ry *= this.scale;

            tempX = rx;
            tempY = ry;
            rx = (tempX * Math.cos(this.seta) + tempY * Math.sin(this.seta));
            ry = (tempX * -Math.sin(this.seta) + tempY * Math.cos(this.seta));

            rx += this.x;
            ry += this.y;

            // TODO 전체를 한번 더 돌리는 코드

            ctx.lineTo(rx, ry);
        }

        var rx = 0;
        var ry = radius * 3 * this.scale;

        tempX = rx;
        tempY = ry;
        rx = (tempX * Math.cos(this.seta) + tempY * Math.sin(this.seta));
        ry = (tempX * -Math.sin(this.seta) + tempY * Math.cos(this.seta));


        ctx.lineTo(rx + this.x,ry + this.y);
        
        rx = radius * 2 * this.scale;
        ry = 0;

        tempX = rx;
        tempY = ry;
        rx = (tempX * Math.cos(this.seta) + tempY * Math.sin(this.seta));
        ry = (tempX * -Math.sin(this.seta) + tempY * Math.cos(this.seta));

        ctx.lineTo(rx + this.x, ry + this.y);
        
        for(var i = 0; i < Math.PI; i += 0.01)
        {
            var rx = radius;
            var ry = 0;
            var tempX = rx;
            var tempY = ry;

            
            rx = (tempX * Math.cos(i) + tempY * Math.sin(i));
            ry = (tempX * -Math.sin(i) + tempY * Math.cos(i));
            
            rx += radius;

            rx *= this.scale;
            ry *= this.scale;

            tempX = rx;
            tempY = ry;
            rx = (tempX * Math.cos(this.seta) + tempY * Math.sin(this.seta));
            ry = (tempX * -Math.sin(this.seta) + tempY * Math.cos(this.seta));
            
            rx += this.x;
            ry += this.y;

            // TODO 전체를 한번 더 돌리는 코드

            ctx.lineTo(rx, ry);
        }
        ctx.stroke();
        ctx.fill();
    }

}

class Vector
{
    constructor(x, y)
    {
        this.x = x; 
        this.y = y;
    }
}

class MouseEffector
{
    constructor(x, y, color, particleScale, speed, direction)
    {
        this.x = x;
        this.y = y;
        this.color = color;
        this.scale = particleScale;
        this.speed = speed;
        this.particle = new HeartObject(this.x ,this.y, this.color, this.scale);
        this.direction = direction;
    }

    draw()
    {
        this.particle.seta = Math.atan2(this.direction.x, this.direction.y);
        this.particle.x += (this.direction.x * this.speed);
        this.particle.y += (this.direction.y * this.speed);
        this.particle.draw();
    }
}

class EffectPool
{
    constructor()
    {
        this.pool = [];
    }

    push(item)
    {
        this.pool.push(item);
    }

    update()
    {
        if(this.pool.length > 100)
        {
            this.pool.shift();
        }
        this.pool.forEach(element => {
            element.draw();
        });
    }
}

var effectpool = new EffectPool();
effectpool.push(new MouseEffector(50, 50, 'red', 5, 1, new Vector(0.75, 0.75)));

var posX = 0;
var posY = 0;

canvas.onmousemove = (e) =>
{
    posX = e.offsetX;
    posY = e.offsetY;
}

var prevDate = new Date();

setInterval(() => {
    ctx.fillStyle = canvas.style.backgroundColor;
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    var currentDate = new Date();
    if (currentDate.getTime() - prevDate.getTime() > 200)
    {
        var minusFactorX = (Math.random() > 0.5) ? -1 : 1;
        var minusFactorY = (Math.random() > 0.5) ? -1 : 1;
        effectpool.push(
            new MouseEffector(
                posX, posY,
                '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16), 
                Math.random() * 5 + 1, 
                Math.random() * 5 + 1, 
                new Vector(Math.random() * minusFactorX + 0.1, Math.random() * minusFactorY + 0.1)));
        prevDate = currentDate;
    }

    effectpool.update();
}, 10);