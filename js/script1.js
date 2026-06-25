
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

const botones = document.querySelectorAll(".btn");

botones.forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Redirigir a checkout (acá ponés tu link)");
  });
});