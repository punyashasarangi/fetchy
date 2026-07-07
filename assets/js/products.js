// Select all Add to Cart buttons

const addCartButtons = document.querySelectorAll(".add-cart");

// Cart badge

const cartCount = document.getElementById("cart-count");

// Cart count

let count = 0;

// Loop through every Add to Cart button

addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Product Card

        const productCard = button.closest(".product-card");

        // Product Name

        const productName = productCard.querySelector("h5").innerText;

        // Product Price

        const productPrice = productCard.querySelector(".price").innerText;

        // Product Image

        const productImage = productCard.querySelector("img").src;

        // Create Product Object

        const product = {

            name: productName,

            price: productPrice,

            image: productImage

        };

        console.log(product);

        // Get existing cart from Local Storage

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Add new product

        cart.push(product);

        // Save updated cart

        localStorage.setItem("cart", JSON.stringify(cart));

        console.log(cart);

        // Increase Badge

        count++;

        cartCount.innerText = count;

    });

});