const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const triangleSize = 150;
let angle = 0;
let isRed = false;

function drawTriangle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, -triangleSize);
    ctx.lineTo(triangleSize * Math.sin(Math.PI / 3), triangleSize * Math.cos(Math.PI / 3));
    ctx.lineTo(-triangleSize * Math.sin(Math.PI / 3), triangleSize * Math.cos(Math.PI / 3));
    ctx.closePath();

    ctx.fillStyle = isRed ? 'red' : 'yellow';
    ctx.fill();

    ctx.restore();
}

function animate() {
    angle += 0.01;
    drawTriangle();
    requestAnimationFrame(animate);
}

function isInsideTriangle(x, y) {
    const p0 = { x: 0, y: -triangleSize };
    const p1 = { x: triangleSize * Math.sin(Math.PI / 3), y: triangleSize * Math.cos(Math.PI / 3) };
    const p2 = { x: -triangleSize * Math.sin(Math.PI / 3), y: triangleSize * Math.cos(Math.PI / 3) };

    // 회전 각도에 따른 좌표 변환
    const transformedX = (x - centerX) * Math.cos(-angle) - (y - centerY) * Math.sin(-angle);
    const transformedY = (x - centerX) * Math.sin(-angle) + (y - centerY) * Math.cos(-angle);

    // 벡터 크로스 프로덕트를 사용하여 점이 삼각형 내부에 있는지 확인
    const dX = transformedX;
    const dY = transformedY;

    const areaOrig = Math.abs((p0.x * (p1.y - p2.y) + p1.x * (p2.y - p0.y) + p2.x * (p0.y - p1.y)) / 2);
    const area1 = Math.abs((dX * (p1.y - p2.y) + p1.x * (p2.y - dY) + p2.x * (dY - p1.y)) / 2);
    const area2 = Math.abs((p0.x * (dY - p2.y) + dX * (p2.y - p0.y) + p2.x * (p0.y - dY)) / 2);
    const area3 = Math.abs((p0.x * (p1.y - dY) + p1.x * (dY - p0.y) + dX * (p0.y - p1.y)) / 2);

    return areaOrig === area1 + area2 + area3;
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (isInsideTriangle(x, y)) {
        isRed = !isRed;
    }
});

animate();
