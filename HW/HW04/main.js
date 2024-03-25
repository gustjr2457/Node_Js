//Canvas Element 불러오기
var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");
var studentID = 202202034;

function drawNum(num)
{
    var strID = studentID.toString();
    for (var i = 1; i <= strID.length; i++)
    {
        var digit = parseInt(strID[i-1], 10);
        switch (digit) {
            case 0:
                ctx.beginPath();
                ctx.moveTo(i * 30, 20);
                ctx.lineTo(i * 30, 60); 
                ctx.lineTo(i * 30 - 20, 60); 
                ctx.lineTo(i * 30 - 20, 20);
                ctx.lineTo(i * 30, 20);
                ctx.stroke();
                break;
            case 1:
                ctx.beginPath();
                ctx.moveTo(i * 30, 20); 
                ctx.lineTo(i * 30, 60); 
                ctx.stroke();
                break;
            case 2:
                ctx.beginPath();
                ctx.moveTo(i * 30 - 20, 20);
                ctx.lineTo(i * 30, 20);
                ctx.lineTo(i * 30, 40);
                ctx.lineTo(i * 30 - 20, 40);
                ctx.lineTo(i * 30 - 20, 60);
                ctx.lineTo(i * 30, 60);
                ctx.stroke();
                break;
            case 3:
                ctx.beginPath();
                ctx.moveTo(i * 30 - 20, 20);
                ctx.lineTo(i * 30, 20);
                ctx.lineTo(i * 30, 40);
                ctx.lineTo(i * 30 - 20, 40);
                ctx.moveTo(i * 30, 40);
                ctx.lineTo(i * 30, 60);
                ctx.lineTo(i * 30 - 20, 60);
                ctx.stroke();
                break;
            case 4:
                ctx.beginPath();
                ctx.moveTo(i * 30 - 20, 20);
                ctx.lineTo(i * 30 - 20, 40);
                ctx.lineTo(i * 30, 40);
                ctx.moveTo(i * 30, 20);
                ctx.lineTo(i * 30, 60);
                ctx.stroke();
                break;
            case 5:
                ctx.beginPath();
                ctx.moveTo(i * 30, 20);
                ctx.lineTo(i * 30 - 20, 20);
                ctx.lineTo(i * 30 - 20, 40);
                ctx.lineTo(i * 30, 40);
                ctx.lineTo(i * 30, 60);
                ctx.lineTo(i * 30 - 20, 60);
                ctx.stroke();
                break;
            case 6:
                ctx.beginPath();
                ctx.moveTo(i * 30, 20);
                ctx.lineTo(i * 30 - 20, 20);
                ctx.lineTo(i * 30 - 20, 60);
                ctx.lineTo(i * 30, 60);
                ctx.lineTo(i * 30, 40);
                ctx.lineTo(i * 30 - 20, 40);
                ctx.stroke();
                break;
            case 7:
                ctx.beginPath();
                ctx.moveTo(i * 30 - 20, 20);
                ctx.lineTo(i * 30, 20);
                ctx.lineTo(i * 30, 60);
                ctx.stroke();
                break;
            case 8:
                ctx.beginPath();
                ctx.moveTo(i * 30, 40);
                ctx.lineTo(i * 30, 20);
                ctx.lineTo(i * 30 - 20, 20);
                ctx.lineTo(i * 30 - 20, 40);
                ctx.lineTo(i * 30, 40);
                ctx.lineTo(i * 30, 60);
                ctx.lineTo(i * 30 - 20, 60);
                ctx.lineTo(i * 30 - 20, 40);
                ctx.stroke();
                break;
            case 9:
                ctx.beginPath();
                ctx.moveTo(i * 30, 40);
                ctx.lineTo(i * 30 - 20, 40);
                ctx.lineTo(i * 30 - 20, 20);
                ctx.lineTo(i * 30, 20);
                ctx.lineTo(i * 30, 60);
                ctx.stroke();
                break;
        }
    }
    
}


// (50,300) (974,300) magenta 3

ctx.beginPath();
ctx.moveTo(50,canvas.height/2);
ctx.lineTo(canvas.width - 50, canvas.height/2);
ctx.strokeStyle = "magenta";
ctx.lineWidth = 3;
ctx.stroke();
ctx.closePath();



drawNum(studentID);     //화면 우측 상단에 숫자 쓰기