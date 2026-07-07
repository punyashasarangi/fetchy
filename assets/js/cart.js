// Select all Add to Cart buttons
let buttons = document.querySelectorAll(".add-cart");

// Select cart badge
let cartCount = document.getElementById("cart-count");

// Initial cart count
let count = 0;

// Add click event to every button
buttons.forEach(function(button){

    button.addEventListener("click", function(){

        count++;

        cartCount.innerText = count;

    });

});