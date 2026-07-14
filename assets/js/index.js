// ================= GET ELEMENTS =================

const addCartButtons = document.querySelectorAll(".add-cart");

const heartButtons = document.querySelectorAll(".heart-icon");

const cartCount = document.getElementById("cart-count");

const wishlistCount = document.getElementById("wishlist-count");

// ================= GET LOCAL STORAGE =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ================= UPDATE BADGES =================

function updateCartBadge() {

    if (cartCount) {

        cartCount.innerText = cart.length;

    }

}

function updateWishlistBadge() {

    if (wishlistCount) {

        wishlistCount.innerText = wishlist.length;

    }

}

updateCartBadge();

updateWishlistBadge();

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

// ================= ADD TO CART =================

addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard = button.closest(".product-card");

        const productName = productCard.querySelector("h5").innerText;

        const productPrice = Number(

            productCard.querySelector(".price")
                .childNodes[0]
                .textContent
                .replace("₹", "")
                .trim()

        );

        const productImage = productCard.querySelector("img").src;

        const product = {

            name: productName,

            price: productPrice,

            image: productImage,

            quantity: 1

        };

        const existingProduct = cart.find(

            item => item.name === product.name

        );

        if (existingProduct) {

            existingProduct.quantity++;

        }

        else {

            cart.push(product);

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartBadge();

        showToast(`${product.name} added to cart 🛒`);

    });

});

// ================= WISHLIST =================

heartButtons.forEach((heart) => {

    const productCard = heart.closest(".product-card");

    const productName = productCard.querySelector("h5").innerText;

    // Fill heart if already in wishlist

    if (wishlist.some(item => item.name === productName)) {

        heart.classList.remove("bi-heart");

        heart.classList.add("bi-heart-fill");

        heart.classList.add("active");

    }

    // Heart Click

    heart.addEventListener("click", () => {

        // Always get latest wishlist

        wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        const productPrice = Number(

            productCard.querySelector(".price")
                .childNodes[0]
                .textContent
                .replace("₹", "")
                .trim()

        );

        const productImage = productCard.querySelector("img").src;

        const product = {

            name: productName,

            price: productPrice,

            image: productImage

        };

        const existingIndex = wishlist.findIndex(

            item => item.name === product.name

        );

        if (existingIndex === -1) {

            wishlist.push(product);

            showToast(`${product.name} added to wishlist ❤️`);

            heart.classList.remove("bi-heart");

            heart.classList.add("bi-heart-fill");

            heart.classList.add("active");

        }

        else {

            wishlist.splice(existingIndex, 1);

            showToast(`${product.name} removed from wishlist 💔`);

            heart.classList.remove("bi-heart-fill");

            heart.classList.add("bi-heart");

            heart.classList.remove("active");

        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        updateWishlistBadge();

    });

});

// ================= HOME SEARCH =================

const searchInput = document.getElementById("search-input");

const searchForm = document.querySelector(".search-box");

if (searchForm && searchInput) {

    searchForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const keyword = searchInput.value.trim();

        if (keyword !== "") {

            window.location.href =
                `products.html?search=${encodeURIComponent(keyword)}`;

        }

    });

}

// ================= VIEW DETAILS =================

const viewButtons = document.querySelectorAll(".view-details");

viewButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard = button.closest(".product-card");

        const productName = productCard.querySelector("h5").innerText;

        window.location.href =
            `product-details.html?product=${encodeURIComponent(productName)}`;

    });

});