var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;



ctx.translate(centerX, centerY);

function drawStar()
{
    ctx.beginPath();
    ctx.moveTo(0, -30);  
    ctx.lineTo(-20, 30);
    ctx.lineTo(30, -10); 
    ctx.lineTo(-30, -10);
    ctx.lineTo(20, 30);
    ctx.lineTo(0, -30);  
    ctx.fillStyle = 'rgb(255, 201, 14)';
    ctx.stroke();
    ctx.fill();
}




class HeartObject
{
    constructor(x, y, color, scale)
    {
        this.x = x;
        this.y = y;
        this.color = color;
        this.scale = scale;
        this.seta = 0;
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

            ctx.lineTo(rx, ry);
        }

        var rx = 0;
        var ry = radius * 2 * this.scale;

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

            ctx.lineTo(rx, ry);
        }
        ctx.fill();
    }

}


mainScreen();
buttondraw();
function mainScreen()
{
    ctx.beginPath();
    ctx.moveTo(-240, 400);
    ctx.lineTo(240, 400);
    ctx.lineTo(240, -400);
    ctx.lineTo(-240, -400);
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.fillText('중간고사라고 했지만 ', -180, -200);
    ctx.fillText('실제로는 게임을 만들', -180, -170);
    ctx.fillText('라고 하는 교수를 엿먹', -180, -140);
    ctx.fillText('이기 위해 겁나 잘 만들', -180, -110);
    ctx.fillText('고 있는 게임', -180, -80);
    
    ctx.closePath();
}


class Enemy
{
    constructor(x, y, scale)
    {
        this.x = x;
        this.y = y;
        this.scale = scale;
    }

    draw()
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
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

function enemy(x, y)
{
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';

}

class MouseEffector
{
    constructor(x, y, speed, direction)
    {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.particle = new Enemy(this.x ,this.y, this.scale);
        this.direction = direction;
    }

    draw()
    {
        this.particle.seta = Math.atan2(this.direction.x, this.direction.y);
        if(this.particle.x > 0)
        {
            this.particle.x -= (this.direction.x * this.speed);
        }
        if(this.particle.y > 0)
        {
            this.particle.y -= (this.direction.y * this.speed);
        }
        if(this.particle.x < 0)
        {
            this.particle.x -= (this.direction.x * this.speed);
        }
        if(this.particle.y < 0)
        {
            this.particle.y += (this.direction.y * this.speed);
        }
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

var a = 0; 
function buttondraw()
{
    const buttonX = canvas.width/2 + 80;
    const buttonY = canvas.height/2 + 250;
    const buttonWidth = 160;
    const buttonHeight = 50;

    ctx.beginPath();
    ctx.moveTo(80, 200);
    ctx.lineTo(80, 250);
    ctx.lineTo(-80, 250);
    ctx.lineTo(-80, 200);
    ctx.lineTo(80, 200);
    ctx.fillStyle = "rgb(208, 206, 206)";
    ctx.fill();
    ctx.stroke();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('시작', 0, 230);
    canvas.onmousemove = (e) =>
    {
        posX = e.offsetX;
        posY = e.offsetY;
        if (a != 1 && posX >= (buttonX - buttonWidth) && posX <= buttonX && posY >= (buttonY - buttonHeight) && posY <= buttonY)
        {
            ctx.beginPath();
            ctx.moveTo(80, 200);
            ctx.lineTo(80, 250);
            ctx.lineTo(-80, 250);
            ctx.lineTo(-80, 200);
            ctx.lineTo(80, 200);
            ctx.fillStyle = "rgb(248, 203, 178)";
            ctx.fill();
            ctx.stroke();
            ctx.font = '20px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('시작', 0, 230);
        }
    }
    canvas.onmousedown = (e) =>
    {
        posX = e.offsetX;
        posY = e.offsetY;
        if (a != 1 && posX >= (buttonX - buttonWidth) && posX <= buttonX && posY >= (buttonY - buttonHeight) && posY <= buttonY)
        {
            a = 1;
            ctx.beginPath();
            ctx.moveTo(80, 200);
            ctx.lineTo(80, 250);
            ctx.lineTo(-80, 250);
            ctx.lineTo(-80, 200);
            ctx.lineTo(80, 200);
            ctx.fillStyle = "rgb(0, 32, 96)";
            ctx.fill();
            ctx.stroke();
            ctx.font = '20px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('시작', 0, 230);
            setTimeout(function () {
            ctx.beginPath();
            ctx.moveTo(-240, 400);
            ctx.lineTo(240, 400);
            ctx.lineTo(240, -400);
            ctx.lineTo(-240, -400);
            ctx.fillStyle = 'whitegray';
            ctx.fill();
            drawStar();
            const Xmax = 480;
            const Ymax = 800;
            var element = new HeartObject(Math.floor(Math.random() * Xmax - 240) ,Math.floor(Math.random() * Ymax - 400), "red", 2);
            element.draw();
            var effectpool = new EffectPool();
            var x = Math.floor(Math.random() * 480) - 240;
            var y = Math.floor(Math.random() * 800) - 400;
            effectpool.push(new MouseEffector(x, y, 'black', 2, 1));

            a = 1;
        },1000);
        }
    }
    canvas.onmouseup = (e) =>
    {
        posX = e.offsetX;
        posY = e.offsetY;
        if (a != 1 && posX >= (buttonX - buttonWidth) && posX <= buttonX && posY >= (buttonY - buttonHeight) && posY <= buttonY)
        {
            ctx.beginPath();
            ctx.moveTo(80, 200);
            ctx.lineTo(80, 250);
            ctx.lineTo(-80, 250);
            ctx.lineTo(-80, 200);
            ctx.lineTo(80, 200);
            ctx.fillStyle = "rgb(248, 203, 178)";
            ctx.fill();
            ctx.stroke();
            ctx.font = '20px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('시작', 0, 230);
        }
    }
    canvas.onmouseout = (e) =>
    {
        posX = e.offsetX;
        posY = e.offsetY;
        if (a != 1 && posX >= (buttonX - buttonWidth) && posX <= buttonX && posY >= (buttonY - buttonHeight) && posY <= buttonY)
        {
            ctx.beginPath();
            ctx.moveTo(80, 200);
            ctx.lineTo(80, 250);
            ctx.lineTo(-80, 250);
            ctx.lineTo(-80, 200);
            ctx.lineTo(80, 200);
            ctx.fillStyle = "rgb(208, 206, 206)";
            ctx.fill();
            ctx.stroke();
            ctx.font = '20px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('시작', 0, 230);
        }
    }
}