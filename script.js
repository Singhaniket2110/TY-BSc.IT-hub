// === Theme Toggle with localStorage ===
const toggleBtn = document.getElementById("themeToggle");
if (toggleBtn) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.classList.remove("light-theme", "dark-theme");
        document.body.classList.add(savedTheme);
        toggleBtn.textContent = savedTheme === "dark-theme" ? "☀️" : "🌙";
    }

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        document.body.classList.toggle("light-theme");
        const currentTheme = document.body.classList.contains("dark-theme") ? "dark-theme" : "light-theme";
        localStorage.setItem("theme", currentTheme);
        toggleBtn.textContent = currentTheme === "dark-theme" ? "☀️" : "🌙";
    });
}

// === Search Functionality ===
const searchInput = document.getElementById("searchInput");
const searchResults = document.createElement("div");
searchResults.id = "searchResults";
searchResults.className = "mt-3";
if (searchInput) {
    searchInput.parentNode.appendChild(searchResults);
    searchInput.addEventListener("keyup", async () => {
        let filter = searchInput.value.toLowerCase().trim();
        if (filter.length < 2) {
            searchResults.innerHTML = "";
            // Fallback to local search
            let subjects = document.querySelectorAll(".subject-card");
            subjects.forEach((card) => {
                let text = card.textContent.toLowerCase();
                card.style.display = text.includes(filter) ? "" : "none";
            });
            return;
        }
        // Global search
        const subjectPages = [
            // Semester 5 subjects
            "subject-ai.html", "subject-spd.html", "subject-awd.html", "subject-iot.html", "subject-ajt.html",
            // Semester 6 subjects
            "subject-stqa.html", "subject-is.html", "subject-bida.html", "subject-gis.html", "subject-itim.html"
        ];
        let results = [];
        for (let page of subjectPages) {
            try {
                const response = await fetch(page);
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const text = doc.body.textContent.toLowerCase();
                if (text.includes(filter)) {
                    const title = doc.querySelector("h2") ? doc.querySelector("h2").textContent : page.replace(".html", "").replace("-", " ").toUpperCase();
                    results.push({ page, title });
                }
            } catch (e) {
                console.error("Error fetching " + page, e);
            }
        }
        // Display results
        if (results.length > 0) {
            searchResults.innerHTML = "<h5>Search Results:</h5><ul class='list-group'>" +
                results.map(r => `<li class='list-group-item'><a href='${r.page}'>${r.title}</a></li>`).join("") + "</ul>";
        } else {
            searchResults.innerHTML = "<p>No results found.</p>";
        }
        // Hide local cards if global search
        let subjects = document.querySelectorAll(".subject-card");
        subjects.forEach((card) => card.style.display = "none");
    });
}

// === Back to Top Button ===
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
});
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Trigger fade-in for all sections on page load
window.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => el.classList.add('show'));
});


// === Set Current Year in Footer ===
document.getElementById("year").textContent = new Date().getFullYear();
