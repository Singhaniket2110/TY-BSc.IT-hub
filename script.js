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

// === Advanced Search Functionality ===
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById("searchInput");
    const semesterFilter = document.getElementById("semesterFilter");
    const subjectFilter = document.getElementById("subjectFilter");
    const resourceFilter = document.getElementById("resourceFilter");
    const clearFilters = document.getElementById("clearFilters");
    
    const searchResults = document.createElement("div");
    searchResults.id = "searchResults";
    searchResults.className = "mt-3";
    
    if (searchInput) {
        searchInput.parentNode.appendChild(searchResults);
        
        // Subject mapping for filtering
        const subjectMapping = {
            'ai': { semester: 'sem5', page: 'subject-ai.html', name: 'AI' },
            'spd': { semester: 'sem5', page: 'subject-spd.html', name: 'SPD' },
            'awd': { semester: 'sem5', page: 'subject-awd.html', name: 'AWD' },
            'iot': { semester: 'sem5', page: 'subject-iot.html', name: 'IoT' },
            'ajt': { semester: 'sem5', page: 'subject-ajt.html', name: 'AJT' },
            'stqa': { semester: 'sem6', page: 'subject-stqa.html', name: 'STQA' },
            'is': { semester: 'sem6', page: 'subject-is.html', name: 'IS' },
            'bida': { semester: 'sem6', page: 'subject-bida.html', name: 'BIDA' },
            'gis': { semester: 'sem6', page: 'subject-gis.html', name: 'GIS' },
            'itim': { semester: 'sem6', page: 'subject-itim.html', name: 'ITIM' }
        };
        
        // Function to perform search with filters
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const semester = semesterFilter.value;
            const subject = subjectFilter.value;
            const resource = resourceFilter.value;
            
            // Clear previous results
            searchResults.innerHTML = "";
            
            // Hide all subject cards initially
            const subjectCards = document.querySelectorAll(".subject-card");
            subjectCards.forEach(card => card.style.display = "none");
            
            // Hide semester cards initially
            const semesterCards = document.querySelectorAll(".sem-card");
            semesterCards.forEach(card => card.style.display = "none");
            
            // If no search term and no filters, show all cards
            if (!searchTerm && !semester && !subject && !resource) {
                subjectCards.forEach(card => card.style.display = "");
                semesterCards.forEach(card => card.style.display = "");
                return;
            }
            
            // Filter subjects based on criteria
            let filteredSubjects = Object.keys(subjectMapping);
            
            // Apply semester filter
            if (semester) {
                filteredSubjects = filteredSubjects.filter(sub => subjectMapping[sub].semester === semester);
            }
            
            // Apply subject filter
            if (subject) {
                filteredSubjects = filteredSubjects.filter(sub => sub === subject);
            }
            
            // Apply search term filter
            if (searchTerm) {
                filteredSubjects = filteredSubjects.filter(sub => {
                    const subjectInfo = subjectMapping[sub];
                    return subjectInfo.name.toLowerCase().includes(searchTerm) || 
                           sub.toLowerCase().includes(searchTerm);
                });
            }
            
            // Show filtered subject cards
            filteredSubjects.forEach(subjectKey => {
                const subjectInfo = subjectMapping[subjectKey];
                const subjectCard = document.querySelector(`a[href="${subjectInfo.page}"]`);
                if (subjectCard) {
                    subjectCard.closest('.subject-card').style.display = "";
                }
            });
            
            // Show semester cards if any subjects match
            if (filteredSubjects.length > 0) {
                const semestersToShow = new Set(filteredSubjects.map(sub => subjectMapping[sub].semester));
                semestersToShow.forEach(sem => {
                    // Find the correct semester card using data attribute
                    const semesterCard = document.querySelector(`.sem-card[data-semester="${sem}"]`);
                    if (semesterCard) {
                        semesterCard.style.display = "";
                    }
                });
            }
            
            // Display search results summary
            if (searchTerm || semester || subject || resource) {
                let resultText = `Found ${filteredSubjects.length} subject(s)`;
                if (semester) resultText += ` in ${semester === 'sem5' ? 'Semester 5' : 'Semester 6'}`;
                if (subject) resultText += ` for ${subjectMapping[subject]?.name || subject}`;
                if (resource) resultText += ` with ${resource}`;
                
                searchResults.innerHTML = `<div class="alert alert-info"><strong>Search Results:</strong> ${resultText}</div>`;
            }
        }
        
        // Event listeners
        searchInput.addEventListener("keyup", performSearch);
        semesterFilter.addEventListener("change", performSearch);
        subjectFilter.addEventListener("change", performSearch);
        resourceFilter.addEventListener("change", performSearch);
        
        // Clear filters functionality
        clearFilters.addEventListener("click", function() {
            searchInput.value = "";
            semesterFilter.value = "";
            subjectFilter.value = "";
            resourceFilter.value = "";
            performSearch();
        });
        
        // Initial search to show all content
        performSearch();
    }
});

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

// === Simple Contact Form Handling (No External Services) ===
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form submission
            
            const submitBtn = document.getElementById('submitBtn');
            const submitText = document.getElementById('submitText');
            const submitSpinner = document.getElementById('submitSpinner');
            const messageContainer = document.getElementById('messageContainer');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            const errorText = document.getElementById('errorText');
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Hide previous messages
            messageContainer.style.display = 'none';
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Validate form
            if (!name || !email || !subject || !message) {
                messageContainer.style.display = 'block';
                errorMessage.style.display = 'block';
                errorText.textContent = 'Please fill in all required fields.';
                
                setTimeout(() => {
                    messageContainer.style.display = 'none';
                    errorMessage.style.display = 'none';
                }, 5000);
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                messageContainer.style.display = 'block';
                errorMessage.style.display = 'block';
                errorText.textContent = 'Please enter a valid email address.';
                
                setTimeout(() => {
                    messageContainer.style.display = 'none';
                    errorMessage.style.display = 'none';
                }, 5000);
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            submitText.textContent = 'Processing...';
            submitSpinner.style.display = 'inline-block';
            
            // Simulate processing time
            setTimeout(() => {
                // Show success message
                messageContainer.style.display = 'block';
                successMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Reset button state
                submitBtn.disabled = false;
                submitText.textContent = 'Send Message';
                submitSpinner.style.display = 'none';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    messageContainer.style.display = 'none';
                    successMessage.style.display = 'none';
                }, 5000);
                
                // Log form data to console (you can check this in browser developer tools)
                console.log('=== CONTACT FORM SUBMISSION ===');
                console.log('Name:', name);
                console.log('Email:', email);
                console.log('Subject:', subject);
                console.log('Message:', message);
                console.log('Timestamp:', new Date().toLocaleString());
                console.log('===============================');
                
                // Also show an alert for immediate feedback
                alert(`Thank you ${name}! Your message has been received.\n\nWe'll get back to you at ${email} soon!`);
                
            }, 1500); // 1.5 second delay to simulate processing
        });
    }
});