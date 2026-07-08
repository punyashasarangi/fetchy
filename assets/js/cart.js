// Get cart items from Local Storage

const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Select cart container

const cartItems = document.getElementById("cart-items");

// Select cart badge

const cartCount = document.getElementById("cart-count");

// Update badge

cartCount.innerText = cart.length;

// If cart is empty

if (cart.length === 0) {

    cartItems.innerHTML = `
        <div class="text-center p-5">
            <h3>Your Cart is Empty 🛒</h3>
            <a href="products.html" class="btn btn-success mt-3">
                Continue Shopping
            </a>
        </div>
    `;

} else {

    cart.forEach((product, index) => {

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${product.image}" alt="${product.name}">

                <div class="cart-details">

                    <h5>${product.name}</h5>

                    <p>Fresh Grocery Product</p>

                    <h4>${product.price}</h4>

                </div>

                <div class="quantity">

    <button class="qty-btn decrease-btn" data-index="${index}">-</button>

    <span>${product.quantity}</span>

    <button class="qty-btn increase-btn" data-index="${index}">+</button>

</div>

                <button class="remove-btn" data-index="${index}">

                    <i class="bi bi-trash"></i>

                </button>

            </div>
        `;

    });

}

// ================= REMOVE ITEM =================

const removeButtons = document.querySelectorAll(".remove-btn");

removeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const index = button.dataset.index;

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});

// ================= ORDER SUMMARY =================

const subtotalElement = document.getElementById("subtotal");

const deliveryElement = document.getElementById("delivery");

const taxElement = document.getElementById("tax");

const totalElement = document.getElementById("total");

let subtotal = 0;

// Calculate subtotal

cart.forEach((product) => {

    subtotal += product.price * product.quantity;

});

// Fixed delivery charge

const delivery = cart.length > 0 ? 30 : 0;

// 5% tax

const tax = subtotal * 0.05;

// Grand Total

const total = subtotal + delivery + tax;

// Display values

subtotalElement.innerText = `₹${subtotal}`;

deliveryElement.innerText = `₹${delivery}`;

taxElement.innerText = `₹${tax.toFixed(2)}`;

totalElement.innerText = `₹${total.toFixed(2)}`;

// ================= INCREASE QUANTITY =================

const increaseButtons = document.querySelectorAll(".increase-btn");

increaseButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const index = button.dataset.index;

        cart[index].quantity++;

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});

// ================= DECREASE QUANTITY =================

const decreaseButtons = document.querySelectorAll(".decrease-btn");

decreaseButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const index = button.dataset.index;

        if (cart[index].quantity > 1) {

            cart[index].quantity--;

        } else {

            cart.splice(index, 1);

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});

// ================= CLEAR CART =================

const clearCartButton = document.getElementById("clear-cart");

if (clearCartButton) {

    clearCartButton.addEventListener("click", () => {

        // Remove all products

        localStorage.removeItem("cart");

        // Reload page

        location.reload();

    });

}