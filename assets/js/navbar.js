const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if(menuToggle && mobileMenu){

    menuToggle.addEventListener("click",()=>{

        mobileMenu.classList.toggle("active");

    });

}