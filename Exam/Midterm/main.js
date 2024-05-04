var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const WIDTH = canvas.width / 2;
const HEIGHT = canvas.height / 2;

//ctx.translate(WIDTH, HEIGHT);

function drawStar()
{
    ctx.beginPath();
    ctx.translate(WIDTH, HEIGHT);
    ctx.moveTo(0, -30);  
    ctx.lineTo(-20, 30);
    ctx.lineTo(30, -10); 
    ctx.lineTo(-30, -10);
    ctx.lineTo(20, 30);
    ctx.lineTo(0, -30);  
    ctx.fillStyle = 'rgb(255, 201, 14)';
    ctx.stroke();
    ctx.fill();
    ctx.translate(-WIDTH, -HEIGHT);
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
        ctx.translate(WIDTH, HEIGHT);
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
        ctx.translate(-WIDTH, -HEIGHT);
    }

}

class EnemyObject
{
    constructor(x, y, scale, color)
    {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.color = color;
    }

    start()
    {
        
    }

    update()
    {
        var directionx = playerPosX - this.x;
        var directiony = playerPosY - this.y;

        var magnitude = Math.sqrt(directionx * directionx + directiony * directiony);

        directionx /= magnitude;
        directiony /= magnitude;

        this.x += directionx;
        this.y += directiony;
    }

    render()
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        var radius = 1;
        var fx = 0;
        var fy = 0;

        
        fx *= this.scale;
        fy *= this.scale;
        
        fx += WIDTH;
        fy += HEIGHT;
        
        fx += this.x;
        fy += this.y;

        for(var i = 0; i < Math.PI * 2; i += 0.01)
        {
            var rx = radius;
            var ry = 0;
            var tempX = rx;
            var tempY = ry;

            rx = (tempX * Math.cos(i) + tempY * Math.sin(i));
            ry = (tempX * -Math.sin(i) + tempY * Math.cos(i));
            
            rx *= this.scale;
            ry *= this.scale;
            
            rx += WIDTH;
            ry += HEIGHT;

            rx += this.x;
            ry += this.y;


            ctx.lineTo(rx,  ry);
        }
        ctx.closePath();
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

var playerPosX = 0;
var playerPosY = 0;

var prevTime = new Date();

var enemyPool = [];


var posX = 0;
var posY = 0;

canvas.onmousemove = (e) =>
{
    posX = e.offsetX;
    posY = e.offsetY;
}

var prevDate = new Date();




ctx.translate(WIDTH, HEIGHT);
mainScreen();
buttondraw();
ctx.translate(-WIDTH, -HEIGHT);
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
            ctx.translate(WIDTH, HEIGHT);
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
            ctx.translate(-WIDTH, -HEIGHT);
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
            ctx.translate(WIDTH, HEIGHT);
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
            ctx.translate(-WIDTH, -HEIGHT);
            ctx.closePath(); 
            setInterval(() => {
                ctx.fillStyle = canvas.style.backgroundColor;
                ctx.fillRect(0, 0, 480, 800);
                drawStar();
                var element = new HeartObject(Math.floor(Math.random() * Xmax - 240) ,Math.floor(Math.random() * Ymax - 400), "red", 2);
                element.draw();
                var currentTime = new Date();
                if(currentTime.getTime() - prevTime.getTime() > 1000)
                {
                    for(var i = 0; i < Math.random() * 14 + 1; i++)
                    {
                        enemyPool.push(new EnemyObject(-(Math.random() * WIDTH + 200) - 20, Math.random() * HEIGHT * 2 - HEIGHT, 10, 'black')); 
                    }

                    for(var i = 0; i < Math.random() * 14 + 1; i++)
                    {
                        enemyPool.push(new EnemyObject((Math.random() * WIDTH + 200) + 20, Math.random() * HEIGHT * 2 - HEIGHT, 10, 'black')); 
                    }

                    for(var i = 0; i < Math.random() * 14 + 1; i++)
                    {
                        enemyPool.push(new EnemyObject((Math.random() * WIDTH * 2) - WIDTH, -(Math.random() * 200)-HEIGHT - 20, 10, 'black')); 
                    }

                    for(var i = 0; i < Math.random() * 14 + 1; i++)
                    {
                        enemyPool.push(new EnemyObject((Math.random() * WIDTH * 2) - WIDTH, (Math.random() * 200) +HEIGHT + 20, 10, 'black')); 
                    }
                    prevTime = new Date();
                }
                enemyPool.forEach((element) =>{
                    element.update();
                    element.render();
                });
            }, 10);
            
            const Xmax = 480;
            const Ymax = 800;
            
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
            ctx.translate(WIDTH, HEIGHT);
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
            ctx.translate(-WIDTH, -HEIGHT);
        }
    }
    canvas.onmouseout = (e) =>
    {
        posX = e.offsetX;
        posY = e.offsetY;
        if (a != 1 && posX >= (buttonX - buttonWidth) && posX <= buttonX && posY >= (buttonY - buttonHeight) && posY <= buttonY)
        {
            ctx.beginPath();
            ctx.translate(WIDTH, HEIGHT);
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
            ctx.translate(-WIDTH, -HEIGHT);
        }
    }
}