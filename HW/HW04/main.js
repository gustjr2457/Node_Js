function drawNum() {
    var canvas = document.getElementById("GameScreenCanvas");
    var ctx = canvas.getContext("2d");

    // 사용자 입력 받기
    var studentID = document.getElementById("studentID").value;

    // 폰트 및 스타일 설정
    ctx.font = "bold 20px 'digital-7'";
    ctx.fillStyle = "black";

    // 캔버스에 학번 텍스트 그리기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var startX = 10;
    for (var i = 0; i < studentID.length; i++) {
        ctx.fillText(studentID[i], startX, 30);
        startX += 20; // 숫자 간격 조절
    }
}