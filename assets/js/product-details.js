// ================= GET PRODUCT FROM URL =================

const params = new URLSearchParams(window.location.search);

const productName = params.get("product");

const product = products[productName];

// ================= LOAD PRODUCT =================

if (product) {

    // Product Name
    document.getElementById("product-name").innerText = productName;

    // Product Image
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-image").alt = productName;

    // Product Price
    document.getElementById("product-price").innerHTML =
        `₹${product.price} <del class="text-muted fs-5">₹${product.oldPrice}</del>`;

    // Rating
    document.getElementById("product-rating").innerHTML = product.rating;

    // Description
    document.getElementById("product-description").innerText =
        product.description;

    // Features
    const featureList = document.getElementById("product-features");

    featureList.innerHTML = "";

    product.features.forEach((feature) => {

        featureList.innerHTML += `<li>✔ ${feature}</li>`;

    });

}

// ================= PRODUCT NOT FOUND =================

else {

    document.querySelector(".product-details-page").innerHTML = `

    <div class="container text-center py-5">

        <i class="bi bi-exclamation-triangle-fill text-warning"
        style="font-size:80px;"></i>

        <h1 class="mt-4">Product Not Found</h1>

        <p class="text-muted fs-5">

            Sorry! The product you are looking for doesn't exist.

        </p>

        <a href="products.html" class="btn btn-success mt-3">

            <i class="bi bi-arrow-left"></i>

            Back to Products

        </a>

    </div>

    `;

}

// ================= ADD TO CART =================

const addCartButton = document.getElementById("add-cart");

if (addCartButton && product) {

    addCartButton.addEventListener("click", () => {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const cartProduct = {

            name: productName,
            price: product.price,
            image: product.image,
            quantity: 1

        };

        // Check if product already exists

        const existingProduct = cart.find(

            item => item.name === cartProduct.name

        );

        if (existingProduct) {

            existingProduct.quantity++;

        }

        else {

            cart.push(cartProduct);

        }

        // Save cart

        localStorage.setItem("cart", JSON.stringify(cart));

        // Update cart badge

        const totalItems = cart.reduce((sum, item) => {

            return sum + item.quantity;

        }, 0);

        const cartBadge = document.getElementById("cart-count");

        if (cartBadge) {

            cartBadge.innerText = totalItems;

        }

        // Toast Notification

        alert(`${productName} added to cart successfully!`);

    });

}

