// ================= THEME TOGGLE =================

const themeToggle = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");

// Apply saved theme when page loads

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

    if (themeToggle) {

        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';

    }

    if (themeToggleMobile) {

        themeToggleMobile.innerHTML = '<i class="bi bi-sun-fill"></i>';

    }

}


// Function to toggle theme

function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

        if (themeToggle) {

            themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';

        }

        if (themeToggleMobile) {

            themeToggleMobile.innerHTML = '<i class="bi bi-sun-fill"></i>';

        }

    } else {

        localStorage.setItem("theme", "light");

        if (themeToggle) {

            themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';

        }

        if (themeToggleMobile) {

            themeToggleMobile.innerHTML = '<i class="bi bi-moon-fill"></i>';

        }

    }

}


// Desktop button

if (themeToggle) {

    themeToggle.addEventListener("click", toggleTheme);

}


// Mobile button

if (themeToggleMobile) {

    themeToggleMobile.addEventListener("click", toggleTheme);

}