// ================= GET CART =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= SELECT ELEMENTS =================

const checkoutItems = document.getElementById("checkout-items");
const subtotalElement = document.getElementById("checkout-subtotal");
const deliveryElement = document.getElementById("checkout-delivery");
const taxElement = document.getElementById("checkout-tax");
const totalElement = document.getElementById("checkout-total");
const cartCount = document.getElementById("cart-count");
const placeOrderBtn = document.getElementById("place-order-btn");

// ================= UPDATE CART BADGE =================

if (cartCount) {

    cartCount.innerText = cart.length;

}

// ================= DISPLAY ORDER =================

let subtotal = 0;

cart.forEach((product) => {

    subtotal += product.price * product.quantity;

    checkoutItems.innerHTML += `

        <div class="summary-item">

            <span>${product.name} × ${product.quantity}</span>

            <span>₹${product.price * product.quantity}</span>

        </div>

    `;

});

// ================= CALCULATIONS =================

const delivery = cart.length > 0 ? 30 : 0;

const tax = subtotal * 0.05;

const total = subtotal + delivery + tax;

subtotalElement.innerText = `₹${subtotal}`;

deliveryElement.innerText = `₹${delivery}`;

taxElement.innerText = `₹${tax.toFixed(2)}`;

totalElement.innerText = `₹${total.toFixed(2)}`;

// ================= PLACE ORDER =================

placeOrderBtn.addEventListener("click", () => {

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const pincode = document.getElementById("pincode").value.trim();

    if (
        firstName === "" ||
        lastName === "" ||
        phone === "" ||
        email === "" ||
        address === "" ||
        city === "" ||
        pincode === ""
    ) {

        alert("Please fill all the required fields.");

        return;

    }

    if (phone.length !== 10 || isNaN(phone)) {

        alert("Please enter a valid 10-digit phone number.");

        return;

    }

    if (pincode.length !== 6 || isNaN(pincode)) {

        alert("Please enter a valid 6-digit PIN Code.");

        return;

    }

    localStorage.removeItem("cart");

    window.location.href = "success.html";

});