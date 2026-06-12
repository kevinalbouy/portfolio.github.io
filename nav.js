// =================== MOBILE NAVIGATION ===================
document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.querySelector('.hamburger');
    var navContainer = document.querySelector('.nav-container');

    if (!hamburger || !navContainer) return;

    // Toggle menu open/close
    hamburger.addEventListener('click', function() {
        navContainer.classList.toggle('open');
        this.textContent = navContainer.classList.contains('open') ? '✕' : '☰';
    });

    // Mobile dropdown toggle (click instead of hover)
    document.querySelectorAll('.dropdown > a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                var parent = this.parentElement;
                // Close other open dropdowns
                document.querySelectorAll('.dropdown').forEach(function(d) {
                    if (d !== parent) d.classList.remove('active');
                });
                parent.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking a sub-link
    document.querySelectorAll('.dropdown-content a').forEach(function(a) {
        a.addEventListener('click', function() {
            navContainer.classList.remove('open');
            hamburger.textContent = '☰';
            document.querySelectorAll('.dropdown').forEach(function(d) {
                d.classList.remove('active');
            });
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && !e.target.closest('header')) {
            navContainer.classList.remove('open');
            hamburger.textContent = '☰';
            document.querySelectorAll('.dropdown').forEach(function(d) {
                d.classList.remove('active');
            });
        }
    });

    // =================== ACTIVE PAGE INDICATOR ===================
    var currentPath = window.location.pathname.split("/").pop();
    if (currentPath === "") currentPath = "index.html"; // Default to index
    
    document.querySelectorAll('.headerButton').forEach(function(link) {
        // Strip # anchors to compare just the filename
        var linkPath = link.getAttribute('href').split("#")[0]; 
        if (linkPath === currentPath) {
            link.classList.add('active-nav');
        }
    });

    // =================== BACK TO TOP BUTTON ===================
    var backToTopBtn = document.createElement("button");
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.id = "backToTop";
    backToTopBtn.title = "Retour en haut";
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
