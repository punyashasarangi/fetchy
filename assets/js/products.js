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

        console.log(productName);

        console.log(productPrice);

        // Increase Badge

        count++;

        cartCount.innerText = count;

    });

});