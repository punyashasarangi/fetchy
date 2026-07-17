const badgeCartItems = JSON.parse(localStorage.getItem("cart")) || [];

const badgeTotalItems = badgeCartItems.reduce((sum, item) => {
    return sum + (item.quantity || 1);
}, 0);

const badgeDesktopCart = document.getElementById("cart-count");
const badgeMobileCart = document.getElementById("cart-count-mobile");

if (badgeDesktopCart) {
    badgeDesktopCart.innerText = badgeTotalItems;
}

if (badgeMobileCart) {
    badgeMobileCart.innerText = badgeTotalItems;
}