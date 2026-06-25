function mostrarDia(dia, elemento){

    const contenidos = document.querySelectorAll(".contenido-dia");

    contenidos.forEach((contenido)=>{
        contenido.style.display = "none";
    });

    document.getElementById(dia).style.display = "block";

    const botones = document.querySelectorAll(".lineamovible");

    botones.forEach((boton)=>{
        boton.classList.remove("activo");
    });

    elemento.classList.add("activo");
}

