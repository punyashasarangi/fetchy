const badgeWishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];

const badgeDesktopWishlist = document.getElementById("wishlist-count");
const badgeMobileWishlist = document.getElementById("wishlist-count-mobile");

if (badgeDesktopWishlist) {
    badgeDesktopWishlist.innerText = badgeWishlistItems.length;
}

if (badgeMobileWishlist) {
    badgeMobileWishlist.innerText = badgeWishlistItems.length;
}