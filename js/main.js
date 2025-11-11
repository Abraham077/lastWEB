function initializeCommonElements() {
    console.log("Initializing common elements...");
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
        });
    }
}

function setupResponsiveNav() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            navbarCollapse.classList.toggle('show');
        });
    }
}

function saveUserPreference(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getUserPreference(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

function isFutureDate(dateString) {
    const eventDate = new Date(dateString);
    const today = new Date();
    return eventDate > today;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

document.addEventListener('DOMContentLoaded', function() {
    initializeCommonElements();
    setupResponsiveNav();
    
    const savedTheme = getUserPreference('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
    
    setupFormValidation();
});

function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    
                    let errorElement = input.parentNode.querySelector('.invalid-feedback');
                    if (!errorElement) {
                        errorElement = document.createElement('div');
                        errorElement.className = 'invalid-feedback';
                        errorElement.textContent = 'This field is required';
                        input.parentNode.appendChild(errorElement);
                    }
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        form.addEventListener('input', function(e) {
            if (e.target.matches('input, textarea, select')) {
                e.target.classList.remove('is-invalid');
                const errorElement = e.target.parentNode.querySelector('.invalid-feedback');
                if (errorElement) {
                    errorElement.remove();
                }
            }
        });
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isFutureDate,
        formatDate,
        saveUserPreference,
        getUserPreference,
        showNotification
    };
}