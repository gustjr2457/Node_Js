var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const WIDTH = canvas.width / 2;
const HEIGHT = canvas.height / 2;


var enemyPool = [];
var enemyDeletePool = [];
var playerHP = 300;
var playerRadius = 20;



	
// 먼저 눌린 키를 수신할 이벤트 리스너 필요
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
 
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

// 키보드가 눌렸을 때 일어나는 함수 (매개변수: e)
// 각 방향키의 keycode와 방향이 맞다면, 해당 변수들 true 
function keyDownHandler(e) {
	if(e.key == 37 || e.key == "ArrowRight") {
		rightPressed = true;
	}
	else if(e.key == 39 || e.key == "ArrowLeft") {
	  leftPressed = true;
  }
  else if(e.key == 38 || e.key == "ArrowUp") {
	  upPressed = true;
  }
  else if(e.key == 40 || e.key == "ArrowDown") {
	  downPressed = true;
  }
}
 
 
// 키보드가 안 눌렸을 때 일어나는 함수 (매개변수: e)
// 각 방향키의 keycode와 방향이 맞다면, 해당 변수들 false > 초기화
function keyUpHandler(e) {
	if(e.key == 37 || e.key == "ArrowRight") {
	  rightPressed = false;
  }
  else if(e.key == 39 || e.key == "ArrowLeft") {
	  leftPressed = false;
  }
  else if(e.key == 38 || e.key == "ArrowUp") {
	  upPressed = false;
  }
  else if(e.key == 40 || e.key == "ArrowDown") {
	  downPressed = false;
  }
}

function drawStar(rotangle)
{
    ctx.save();
    ctx.beginPath();
    ctx.translate(WIDTH + playerPosX, HEIGHT + playerPosY);
    ctx.rotate(rotangle);
    ctx.moveTo(0, -30);  
    ctx.lineTo(-20, 30); 
    ctx.lineTo(30, -10); 
    ctx.lineTo(-30, -10);
    ctx.lineTo(20, 30);  
    ctx.lineTo(0, -30);  
    ctx.fillStyle = 'rgb(255, 201, 14)';
    ctx.stroke();
    ctx.fill();
    ctx.translate(-(WIDTH + playerPosX), -(HEIGHT + playerPosY));
    ctx.restore();
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
        if(rightPressed)
            {
                this.x -= 3;
            }
        if(leftPressed)
            {
                this.x += 3;
            }
        if(upPressed)
            {
                this.y += 3;
            }
        if(downPressed)
            {
                this.y -= 3;
            }

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
        var directionx = playerPosX - this.x;
        var directiony = playerPosY - this.y;
        var enemyNow = false;
        var magnitude = Math.sqrt(directionx * directionx + directiony * directiony);
    }

    start()
    {
        
    }

    update()
    {
        this.directionx = playerPosX - this.x;
        this.directiony = playerPosY - this.y;

        this.magnitude = Math.sqrt(this.directionx * this.directionx + this.directiony * this.directiony);

        this.directionx /= this.magnitude;
        this.directiony /= this.magnitude;

        this.x += this.directionx;
        this.y += this.directiony;
        if(rightPressed)
            {
                this.x -= 3;
            }
        if(leftPressed)
            {
                this.x += 3;
            }
        if(upPressed)
            {
                this.y += 3;
            }
        if(downPressed)
            {
                this.y -= 3;
            }
    }

    render()
    {
        //if(this.magnitude - playerRadius > 10)
        //{
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
           //}
    }

    findtouch()
    {
        if(this.magnitude - playerRadius < 10)
        {
            this.enemyNow = true;
        }
        return this.enemyNow;
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

function overScreen()
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
    ctx.fillText('그는 시험을 보다가 실', -180, -200);
    ctx.fillText('수로 플레이어를 죽였', -180, -170);
    ctx.fillText('다. 잔인한 사람...', -180, -140);
    
    ctx.closePath();
}

function gameOverBtn()
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
                const Xmax = 480;
                const Ymax = 800;
                var count = 0;
                var element = new HeartObject(Math.floor(Math.random() * Xmax - 240) ,Math.floor(Math.random() * Ymax - 400), "red", 2);
                var rang = 0.03;
                setInterval(() => {
                    ctx.fillStyle = canvas.style.backgroundColor;
                    ctx.fillRect(0 - Math.abs(playerPosX), 0 - Math.abs(playerPosY), 960 + Math.abs(playerPosX), 1600 + Math.abs(playerPosY));
                    rang += 0.03;
                    drawStar(rang);
                    ctx.textAlign = 'center';
                    ctx.fillStyle = 'black';
                    ctx.fillText('HP:'+playerHP, 240, 470);
                    element.draw();
                    
                    var currentTime = new Date();
                    if(currentTime.getTime() - prevTime.getTime() > 1000)
                        {
                        for(var i = 0; i < Math.random() * 14 + 1; i++)
                        {
                            enemyPool.push(new EnemyObject(-(Math.random() * WIDTH + 200) - 20 + playerPosX, Math.random() * HEIGHT * 2 - HEIGHT + playerPosY, 10, 'black')); // 
                        }
    
                        for(var i = 0; i < Math.random() * 14 + 1; i++)
                        {
                            enemyPool.push(new EnemyObject((Math.random() * WIDTH + 200) + 20 + playerPosX, Math.random() * HEIGHT * 2 - HEIGHT + playerPosY, 10, 'black')); 
                        }
    
                        for(var i = 0; i < Math.random() * 14 + 1; i++)
                        {
                            enemyPool.push(new EnemyObject((Math.random() * WIDTH * 2) - WIDTH + playerPosX, -(Math.random() * 200)-HEIGHT - 20 + playerPosY, 10, 'black')); 
                        }
    
                        for(var i = 0; i < Math.random() * 14 + 1; i++)
                        {
                            enemyPool.push(new EnemyObject((Math.random() * WIDTH * 2) - WIDTH + playerPosX, (Math.random() * 200) +HEIGHT + 20 + playerPosY, 10, 'black')); 
                        }
                        prevTime = new Date();
                        }
    
                    count = 0;
                    enemyDeletePool = [];
    
                    enemyPool.forEach((element) =>{
                        element.update();
                        element.render();
                        });
    
                    enemyPool.forEach((element) =>{
                        count++;
                        if(element.findtouch() == true)
                            {
                                enemyDeletePool.push(count);
                                playerHP--;
                            }
                    });
    
                    enemyDeletePool.forEach((element) =>{
                        enemyPool.splice(element-1, 1);
                        
                    })
    
                    if(playerHP <= 0)
                    {
                        clearInterval();
                        ctx.translate(WIDTH, HEIGHT);
                        overScreen();
                        ctx.translate(-WIDTH, -HEIGHT);
                    }
    
                }, 10);
    
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
            const Xmax = 480;
            const Ymax = 800;
            var count = 0;
            var element = new HeartObject(Math.floor(Math.random() * Xmax - 240) ,Math.floor(Math.random() * Ymax - 400), "red", 2);
            var rang = 0.03;
            setInterval(() => {
                ctx.fillStyle = canvas.style.backgroundColor;
                ctx.fillRect(0 - Math.abs(playerPosX), 0 - Math.abs(playerPosY), 960 + Math.abs(playerPosX), 1600 + Math.abs(playerPosY));
                rang += 0.03;
                drawStar(rang);
                ctx.textAlign = 'center';
                ctx.fillStyle = 'black';
                ctx.fillText('HP:'+playerHP, 240, 470);
                element.draw();
                var currentTime = new Date();
                if(currentTime.getTime() - prevTime.getTime() > 1000)
                    {
                    for(var i = 0; i < Math.random() * 14 + 1; i++)
                    {
                        enemyPool.push(new EnemyObject(-(Math.random() * WIDTH + 200) - 20 + playerPosX, Math.random() * HEIGHT * 2 - HEIGHT + playerPosY, 10, 'black')); // 
                    }

                    for(var i = 0; i < Math.random() * 14 + 1; i++)
                    {
                        enemyPool.push(new EnemyObject((Math.random() * WIDTH + 200) + 20 + playerPosX, Math.random() * HEIGHT * 2 - HEIGHT + playerPosY, 10, 'black')); 
                    }

                    for(var i = 0; i < Math.random() * 14 + 1; i++)
                    {
                        enemyPool.push(new EnemyObject((Math.random() * WIDTH * 2) - WIDTH + playerPosX, -(Math.random() * 200)-HEIGHT - 20 + playerPosY, 10, 'black')); 
                    }

                    for(var i = 0; i < Math.random() * 14 + 1; i++)
                    {
                        enemyPool.push(new EnemyObject((Math.random() * WIDTH * 2) - WIDTH + playerPosX, (Math.random() * 200) +HEIGHT + 20 + playerPosY, 10, 'black')); 
                    }
                    prevTime = new Date();
                    }

                count = 0;
                enemyDeletePool = [];

                enemyPool.forEach((element) =>{
                    element.update();
                    element.render();
                    });

                enemyPool.forEach((element) =>{
                    count++;
                    if(element.findtouch() == true)
                        {
                            enemyDeletePool.push(count);
                            playerHP--;
                        }
                });

                enemyDeletePool.forEach((element) =>{
                    enemyPool.splice(element-1, 1);
                    
                })

                if(playerHP <= 0)
                {
                    ctx.translate(WIDTH, HEIGHT);
                    overScreen();
                    gameOverBtn();
                    ctx.translate(-WIDTH, -HEIGHT);
                }

            }, 10);

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
