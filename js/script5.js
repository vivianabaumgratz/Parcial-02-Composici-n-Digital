const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let points = [];

window.addEventListener("mousemove", (e) => {

    points.push({
        x: e.clientX,
        y: e.clientY,
        life: 120
    });

});

function draw() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();

    for(let i=0;i<points.length;i++){

        let p = points[i];

        if(i==0){
            ctx.moveTo(p.x,p.y);
        }else{
            ctx.lineTo(p.x,p.y);
        }

        p.life--;
    }

    ctx.strokeStyle="#eaff00";
    ctx.lineWidth=2;
    ctx.lineCap="round";
    ctx.lineJoin="round";
    ctx.stroke();

    points = points.filter(p=>p.life>0);

    requestAnimationFrame(draw);
}

draw();
