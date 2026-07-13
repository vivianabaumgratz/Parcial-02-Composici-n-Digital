const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

// Configuración
const MAX_POINTS = 80;
const SMOOTHING = 0.25;

// Puntos
let trail = [];

// Cursor "elástico"
let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

let follower = {
    x: mouse.x,
    y: mouse.y
};

window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function update() {

    // Movimiento elástico
    follower.x += (mouse.x - follower.x) * SMOOTHING;
    follower.y += (mouse.y - follower.y) * SMOOTHING;

    trail.push({
        x: follower.x,
        y: follower.y,
        life: 1
    });

    if (trail.length > MAX_POINTS)
        trail.shift();

    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(trail.length > 2){

        ctx.beginPath();

        ctx.moveTo(trail[0].x, trail[0].y);

        for(let i=1;i<trail.length-1;i++){

            const xc = (trail[i].x + trail[i+1].x)/2;
            const yc = (trail[i].y + trail[i+1].y)/2;

            ctx.quadraticCurveTo(
                trail[i].x,
                trail[i].y,
                xc,
                yc
            );

        }

        // Gradiente
        const gradient = ctx.createLinearGradient(
            trail[0].x,
            trail[0].y,
            trail[trail.length-1].x,
            trail[trail.length-1].y
        );

        gradient.addColorStop(0,"#ffff00");
        gradient.addColorStop(.5,"#00ffe5");
        gradient.addColorStop(1,"#ff2ea6");

        // Glow
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 12;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 40;
        ctx.stroke();

        // Línea principal
        ctx.shadowBlur = 0;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    // Fade de la estela
    for(let i=0;i<trail.length;i++){
        trail[i].life -= 0.02;
    }

    trail = trail.filter(p=>p.life>0);

    requestAnimationFrame(update);

}

update();
