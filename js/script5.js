const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

let points = [];

window.addEventListener("mousemove",(e)=>{

    points.push({
        x:e.clientX,
        y:e.clientY,
        life:100
    });

});

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();

    for(let i=0;i<points.length;i++){

        const p=points[i];

        if(i===0){
            ctx.moveTo(p.x,p.y);
        }else{
            ctx.lineTo(p.x,p.y);
        }

        p.life--;
    }

    ctx.strokeStyle="#d8ff00";
    ctx.lineWidth=2;
    ctx.lineJoin="round";
    ctx.lineCap="round";
    ctx.stroke();

    points=points.filter(p=>p.life>0);

    requestAnimationFrame(animate);

}

animate();
