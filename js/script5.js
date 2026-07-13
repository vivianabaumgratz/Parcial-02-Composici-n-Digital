const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

let points = [];

window.addEventListener("mousemove", (e) => {

    points.push({
        x: e.clientX,
        y: e.clientY + window.scrollY,
        life: 180
    });

});

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (points.length > 1) {

        ctx.beginPath();

        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {

            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;

            ctx.quadraticCurveTo(
                points[i].x,
                points[i].y,
                xc,
                yc
            );

        }

        // Primera pasada: glow
        ctx.strokeStyle = "#ff3bbd";
        ctx.lineWidth = 12;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = "#ff3bbd";
        ctx.shadowBlur = 40;
        ctx.stroke();

        // Segunda pasada: línea brillante
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "#ff8fe2";
        ctx.lineWidth = 4;
        ctx.stroke();

    }

    for (let i = 0; i < points.length; i++) {
        points[i].life--;
    }

    points = points.filter(p => p.life > 0);

    requestAnimationFrame(draw);

}

draw();
