// ================= GET ELEMENTS =================

const addCartButtons = document.querySelectorAll(".add-cart");

const cartCount = document.getElementById("cart-count");

const searchInput = document.getElementById("search-input");

const productCards = document.querySelectorAll(".searchable-product");

// ================= GET CART =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

// ================= UPDATE CART BADGE =================

function updateCartBadge() {

    if (cartCount) {

        cartCount.innerText = cart.length;

    }

}

updateCartBadge();

// ================= ADD TO CART =================

addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard = button.closest(".product-card");

        const productName = productCard.querySelector("h5").innerText;

        const productPrice = Number(

            productCard
                .querySelector(".price")
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

        // Check if already exists

        const existingProduct = cart.find(

            (item) => item.name === product.name

        );

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push(product);

        }

        // Save cart

        localStorage.setItem("cart", JSON.stringify(cart));

        // Update Badge

        updateCartBadge();

        showToast(`${product.name} added to cart 🛒`);

        console.log(cart);

    });

});

// ================= LIVE SEARCH =================

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const searchValue = searchInput.value.toLowerCase();

        let found = false;

        productCards.forEach((product) => {

            const productName = product
                .querySelector("h5")
                .innerText
                .toLowerCase();

            if (productName.includes(searchValue)) {

                product.parentElement.style.display = "";

                found = true;

            } else {

                product.parentElement.style.display = "none";

            }

        });

        const noResults = document.getElementById("no-results");

        if (noResults) {

            if (found) {

                noResults.style.display = "none";

            } else {

                noResults.style.display = "block";

            }

        }

    });

}
// ================= CATEGORY FILTER =================

const categoryButtons = document.querySelectorAll(".category-filter");

categoryButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        event.preventDefault();

        const selectedCategory = button.dataset.category;

        productCards.forEach((product) => {

            if (

                selectedCategory === "all" ||

                product.dataset.category === selectedCategory

            ) {

                product.parentElement.style.display = "";

            } else {

                product.parentElement.style.display = "none";

            }

        });

    });

});

// ================= SORT PRODUCTS =================

const sortSelect = document.getElementById("sort-products");

if (sortSelect) {

    sortSelect.addEventListener("change", () => {

        const productContainer = document.querySelector(".row.g-4");

        const productColumns = Array.from(

            document.querySelectorAll(".product-column")

        );

        productColumns.sort((a, b) => {

            const priceA = Number(

                a.querySelector(".price")

                    .childNodes[0]

                    .textContent

                    .replace("₹", "")

                    .trim()

            );

            const priceB = Number(

                b.querySelector(".price")

                    .childNodes[0]

                    .textContent

                    .replace("₹", "")

                    .trim()

            );

            if (sortSelect.value === "low-high") {

                return priceA - priceB;

            }

            if (sortSelect.value === "high-low") {

                return priceB - priceA;

            }

            return 0;

        });

        productColumns.forEach((product) => {

            productContainer.appendChild(product);

        });

    });

}

// ================= WISHLIST =================

// Select all heart icons

const heartButtons = document.querySelectorAll(".heart-icon");

// Wishlist badge

const wishlistCount = document.getElementById("wishlist-count");

// Get wishlist

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Update badge

if (wishlistCount) {

    wishlistCount.innerText = wishlist.length;

}

// Heart click

heartButtons.forEach((heart) => {

    // Product Card

    const productCard = heart.closest(".product-card");

    const productName = productCard.querySelector("h5").innerText;

    // Check if already in wishlist

    const exists = wishlist.find(

        item => item.name === productName

    );

    if (exists) {

        heart.classList.remove("bi-heart");

        heart.classList.add("bi-heart-fill");

        heart.classList.add("active");

    }

    // Heart Click

    heart.addEventListener("click", () => {

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

        // Check if product already exists

       const existingIndex = wishlist.findIndex(

    item => item.name === product.name

);

if (existingIndex === -1) {

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    if (wishlistCount) {

        wishlistCount.innerText = wishlist.length;

    }

    heart.classList.remove("bi-heart");

    heart.classList.add("bi-heart-fill");

    heart.classList.add("active");

    showToast(`${product.name} added to wishlist ❤️`);

}

else {

    wishlist.splice(existingIndex, 1);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    if (wishlistCount) {

        wishlistCount.innerText = wishlist.length;

    }

    heart.classList.remove("bi-heart-fill");

    heart.classList.add("bi-heart");

    heart.classList.remove("active");

    showToast(`${product.name} removed from wishlist 💔`);

}
  

    });

});

// ================= PRODUCT DETAILS MODAL =================

const modalImages = document.querySelectorAll(".product-modal-image");

const modalTitle = document.getElementById("modal-title");

const modalImage = document.getElementById("modal-image");

const modalPrice = document.getElementById("modal-price");

const modalDescription = document.getElementById("modal-description");
const modalAddCart = document.getElementById("modal-add-cart");

let selectedProduct = null;

modalImages.forEach((image) => {

    image.addEventListener("click", () => {

        const productCard = image.closest(".product-card");

        const title = productCard.querySelector("h5").innerText;

        const price = productCard.querySelector(".price").childNodes[0].textContent.trim();

        const imageSrc = image.src;
        selectedProduct = {

    name: title,

    price: Number(price.replace("₹", "")),

    image: imageSrc,

    quantity: 1

};

        modalTitle.innerText = title;

        modalPrice.innerText = price;

        modalImage.src = imageSrc;

       let description = "";

switch (title) {

    case "Fresh Apples":
        description = "Fresh, juicy and organic apples rich in vitamins and fiber.";
        break;

    case "Bananas":
        description = "Sweet farm-fresh bananas packed with natural energy and potassium.";
        break;

    case "Fresh Milk":
        description = "Pure and hygienic full cream milk, rich in calcium and protein.";
        break;

    case "Whole Wheat Bread":
        description = "Soft whole wheat bread made with healthy grains for everyday breakfast.";
        break;

    case "Fresh Potatoes":
        description = "Farm fresh potatoes ideal for curries, fries and snacks.";
        break;

    case "Fresh Tomatoes":
        description = "Juicy red tomatoes perfect for salads, curries and sauces.";
        break;

    case "Farm Fresh Eggs":
        description = "Healthy protein-rich farm eggs collected fresh every day.";
        break;

    case "Orange Juice":
        description = "Refreshing orange juice loaded with Vitamin C.";
        break;

    case "Basmati Rice":
        description = "Premium long grain basmati rice with rich aroma and taste.";
        break;

    case "Potato Chips":
        description = "Crunchy salted potato chips, perfect for tea-time snacks.";
        break;

    case "Mango":
        description = "A sweet fruit perfect for summer.";
        break;

    case "Strawberry":
        description = "juicy delicious fruit.";
        break;

    case "Watermelon":
        description = "Sweet and refreshing fruit.";
        break;

    default:
        description = "Fresh grocery product.";
}

modalDescription.innerText = description;

        const modal = new bootstrap.Modal(document.getElementById("productModal"));

        modal.show();

    });

});

// ================= MODAL ADD TO CART =================

if (modalAddCart) {

    modalAddCart.addEventListener("click", () => {

        if (!selectedProduct) return;

        const existingProduct = cart.find(

            item => item.name === selectedProduct.name

        );

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push(selectedProduct);

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartBadge();

        showToast(`${selectedProduct.name} added to cart 🛒`);

    });

}

// ================= SEARCH FROM HOME PAGE =================

const params = new URLSearchParams(window.location.search);

const searchKeyword = params.get("search");

const noResults = document.getElementById("no-results");

const clearSearch = document.getElementById("clear-search");

if (searchKeyword && searchInput) {

    searchInput.value = searchKeyword;

    const keyword = searchKeyword.toLowerCase();

    let found = false;

    productCards.forEach((product) => {

        const productName = product
            .querySelector("h5")
            .innerText
            .toLowerCase();

        if (productName.includes(keyword)) {

            product.parentElement.style.display = "";

            found = true;

        }

        else {

            product.parentElement.style.display = "none";

        }

    });

    if (!found && noResults) {

        noResults.style.display = "block";

    }

    else if (noResults) {

        noResults.style.display = "none";

    }

}

if (clearSearch) {

    clearSearch.addEventListener("click", () => {

        window.location.href = "products.html";

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