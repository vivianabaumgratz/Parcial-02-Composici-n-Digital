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

        //==========================
        // GRADIENTE
        //==========================

        const gradient = ctx.createLinearGradient(
            points[0].x,
            points[0].y,
            points[points.length - 1].x,
            points[points.length - 1].y
        );

        gradient.addColorStop(0, "#FFFF00");   // Amarillo
        gradient.addColorStop(0.5, "#00F5FF"); // Cian
        gradient.addColorStop(1, "#FF2E8B");   // Rosa

        //==========================
        // GLOW
        //==========================

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 12;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.shadowColor = "#FFFFFF";
        ctx.shadowBlur = 35;

        ctx.stroke();

        //==========================
        // LINEA CENTRAL
        //==========================

        ctx.shadowBlur = 0;

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 5;

        ctx.stroke();

    }

    for (let i = 0; i < points.length; i++) {
        points[i].life--;
    }

    points = points.filter(p => p.life > 0);

    requestAnimationFrame(draw);

}

draw();
