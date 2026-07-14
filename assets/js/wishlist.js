// ================= GET DATA =================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= SELECT ELEMENTS =================

const wishlistContainer = document.getElementById("wishlist-container");
const wishlistCount = document.getElementById("wishlist-count");
const cartCount = document.getElementById("cart-count");

// ================= TOAST =================

function showToast(message) {

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    if (!toast || !toastMessage) return;

    toastMessage.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

// ================= UPDATE BADGES =================

function updateWishlistBadge() {

    if (wishlistCount) {

        wishlistCount.innerText = wishlist.length;

    }

}

function updateCartBadge() {

    if (cartCount) {

        cartCount.innerText = cart.length;

    }

}

// ================= DISPLAY WISHLIST =================

function displayWishlist() {

    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `

            <div class="text-center p-5">

                <h3>Your Wishlist is Empty ❤️</h3>

                <a href="products.html" class="btn btn-success mt-3">

                    Browse Products

                </a>

            </div>

        `;

        return;

    }

    wishlist.forEach((product, index) => {

        wishlistContainer.innerHTML += `

            <div class="wishlist-item">

                <img src="${product.image}"
                     class="wishlist-image"
                     alt="${product.name}">

                <div class="wishlist-details">

                    <h4>${product.name}</h4>

                    <p>Fresh Grocery Product</p>

                    <h5>₹${product.price}</h5>

                </div>

                <div class="wishlist-buttons">

                    <button class="btn btn-success add-cart-btn"
                            data-index="${index}">

                        <i class="bi bi-cart-plus"></i>

                        Add to Cart

                    </button>

                    <button class="btn btn-outline-danger remove-btn"
                            data-index="${index}">

                        <i class="bi bi-trash"></i>

                        Remove

                    </button>

                </div>

            </div>

        `;

    });

    removeWishlistItem();

    addWishlistToCart();

}

// ================= REMOVE FROM WISHLIST =================

function removeWishlistItem() {

    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index = button.dataset.index;

            const productName = wishlist[index].name;

            wishlist.splice(index, 1);

            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            updateWishlistBadge();

            showToast(`${productName} removed from wishlist ❤️`);

            displayWishlist();

        });

    });

}

// ================= ADD TO CART =================

function addWishlistToCart() {

    const addCartButtons = document.querySelectorAll(".add-cart-btn");

    addCartButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index = button.dataset.index;

            const product = wishlist[index];

            const existingProduct = cart.find(

                item => item.name === product.name

            );

            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({

                    ...product,

                    quantity: 1

                });

            }

            localStorage.setItem("cart", JSON.stringify(cart));

            wishlist.splice(index, 1);

            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            updateCartBadge();

            updateWishlistBadge();

            showToast(`${product.name} moved to cart 🛒`);

            displayWishlist();

        });

    });

}

// ================= INITIALIZE =================

updateWishlistBadge();

updateCartBadge();

displayWishlist();