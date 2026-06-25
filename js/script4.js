let cart = [];
let total = 0;
function addToCart(nombre, precio){

    cart.push({
        nombre,
        precio
    });

    total += precio;

    document.getElementById("cartCount").innerText = cart.length;

    renderCart();

    document.getElementById("cart").classList.add("active");
}
function renderCart(){

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    cart.forEach((item,index)=>{

        cartItems.innerHTML += `
            <div class="cart-item">
                <strong>${item.nombre}</strong><br>
                $${item.precio.toFixed(2)}
                <span onclick="removeItem(${index})"
                style="float:right;cursor:pointer;color:#ff005d;">
                ✕
                </span>
            </div>
        `;
    });

    document.getElementById("total").innerText =
    total.toFixed(2);
}
function removeItem(index){

    total -= cart[index].precio;

    cart.splice(index,1);

    document.getElementById("cartCount").innerText =
    cart.length;

    renderCart();
}
function openCart(){

    document
    .getElementById("cart")
    .classList
    .toggle("active");
}
function checkout(){

    if(cart.length === 0){

        alert("Tu carrito está vacío");
        return;
    }

    window.location.href = "compra-finalizada.html";
}