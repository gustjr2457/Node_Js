//Canvas Element 불러오기
var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

draw();

var SunRotAngle = 0;
var EarthRotAngle = 0;
var EarthSelfRotAngle = 0;
var MoonRotAngle = 0;
var MoonSelfAngle = 0;


function draw()
{

    SunRotAngle += Math.PI / 100;
    ctx.save();
    ctx.fillStyle = "red";
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.clearRect(-canvas.width/2 - 200, -canvas.height/2 - 200, canvas.width + 500, canvas.height + 500);
    ctx.rotate(SunRotAngle);
    ctx.fillRect(-50,-50,100,100);
    ctx.restore();

    EarthRotAngle += Math.PI / 200;
    EarthSelfRotAngle += Math.PI / 150;
    ctx.save();
    ctx.fillStyle = "blue";
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.rotate(EarthRotAngle);
    ctx.translate(150,150);
    ctx.rotate(EarthSelfRotAngle);
    ctx.fillRect(-25,-25,50,50);
    ctx.restore();

    MoonRotAngle += Math.PI / 100;
    MoonSelfAngle += Math.PI / 80;
    ctx.save();
    ctx.fillStyle = "gray";
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.rotate(EarthRotAngle);
    ctx.translate(150, 150);
    ctx.rotate(MoonRotAngle);
    ctx.translate(50, 50);
    ctx.rotate(MoonSelfAngle);
    ctx.fillRect(-10, -10, 20, 20);
    ctx.restore();

    requestAnimationFrame(draw);
}

// // 다음 프레임 요청(requestAnimationFrame 안쓸때)
// setInterval(draw, 1000.0/60.0);

// 다음 프레임 요청(setInterval 안쓸때)
//requestAnimationFrame(draw);