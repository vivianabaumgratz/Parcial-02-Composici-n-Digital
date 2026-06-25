const walker = document.getElementById("walker");


walker.addEventListener("animationiteration", () => {
  walker.style.transform = "translateX(0)";
});