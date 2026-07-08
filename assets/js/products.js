// Select all Add to Cart buttons

const addCartButtons = document.querySelectorAll(".add-cart");

// Cart badge

const cartCount = document.getElementById("cart-count");

// Get cart from Local Storage

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update badge on page load

cartCount.innerText = cart.length;

// Loop through every Add to Cart button

addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Product Card

        const productCard = button.closest(".product-card");

        // Product Name

        const productName = productCard.querySelector("h5").innerText;

        // Product Price

        const productPrice = Number(
    productCard.querySelector(".price").childNodes[0].textContent.replace("₹", "").trim()
);

        // Product Image

        const productImage = productCard.querySelector("img").src;

        // Create Product Object

       const product = {

    name: productName,

    price: productPrice,

    image: productImage,

    quantity: 1

};

        console.log(product);

        // Add product to cart

       // Check if product already exists

const existingProduct = cart.find((item) => item.name === product.name);

if (existingProduct) {

    existingProduct.quantity++;

} else {

    cart.push(product);

}

// Save cart

localStorage.setItem("cart", JSON.stringify(cart));

// Update badge

cartCount.innerText = cart.length;

        console.log(cart);

    });

});