// ================= THEME TOGGLE =================

const themeToggle = document.getElementById("theme-toggle");

// Apply saved theme when page loads

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

    if (themeToggle) {

        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';

    }

}

// Toggle theme

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

            themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';

        } else {

            localStorage.setItem("theme", "light");

            themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';

        }

    });

}