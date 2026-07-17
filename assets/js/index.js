// ================= GET ELEMENTS =================

const addCartButtons = document.querySelectorAll(".add-cart");
const heartButtons = document.querySelectorAll(".heart-icon");

// ================= GET LOCAL STORAGE =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ================= UPDATE CART BADGE =================

function updateCartBadge() {

    const totalItems = cart.reduce((sum, item) => {

        return sum + (item.quantity || 1);

    }, 0);

    const desktopCart = document.getElementById("cart-count");
    const mobileCart = document.getElementById("cart-count-mobile");

    if (desktopCart) {

        desktopCart.innerText = totalItems;

    }

    if (mobileCart) {

        mobileCart.innerText = totalItems;

    }

}

// ================= UPDATE WISHLIST BADGE =================

function updateWishlistBadge() {

    const desktopWishlist = document.getElementById("wishlist-count");
    const mobileWishlist = document.getElementById("wishlist-count-mobile");

    if (desktopWishlist) {

        desktopWishlist.innerText = wishlist.length;

    }

    if (mobileWishlist) {

        mobileWishlist.innerText = wishlist.length;

    }

}

// Update badges when page loads

updateCartBadge();
updateWishlistBadge();

// ================= TOAST NOTIFICATION =================

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

        } else {

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

    // Fill heart if already exists in wishlist

    if (wishlist.some(item => item.name === productName)) {

        heart.classList.remove("bi-heart");
        heart.classList.add("bi-heart-fill");
        heart.classList.add("active");

    }

    // Heart Click

    heart.addEventListener("click", () => {

        // Get latest wishlist

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

        // Add to wishlist

        if (existingIndex === -1) {

            wishlist.push(product);

            heart.classList.remove("bi-heart");
            heart.classList.add("bi-heart-fill");
            heart.classList.add("active");

            showToast(`${product.name} added to wishlist ❤️`);

        }

        // Remove from wishlist

        else {

            wishlist.splice(existingIndex, 1);

            heart.classList.remove("bi-heart-fill");
            heart.classList.add("bi-heart");
            heart.classList.remove("active");

            showToast(`${product.name} removed from wishlist 💔`);

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

// ================= MOBILE HOME SEARCH =================

const mobileSearchInput = document.getElementById("mobile-search-input");
const mobileSearchBtn = document.getElementById("mobile-search-btn");

if (mobileSearchInput && mobileSearchBtn) {

    mobileSearchBtn.addEventListener("click", () => {

        const keyword = mobileSearchInput.value.trim();

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