// Only keep the sidebar toggle functionality
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Close sidebar when clicking outside
document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (!sidebar.contains(e.target) && !menuIcon.contains(e.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
}); 

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    
    let currentIndex = 0;
    let autoSlideInterval;
    const slideDelay = 3000;
    
    // Set initial position
    updateSlidePosition(true);
    startAutoSlide();
    
    // Next button click
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    // Previous button click
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    // Mouse enter - pause auto slide
    track.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    // Mouse leave - resume auto slide
    track.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    function nextSlide() {
        const oldIndex = currentIndex;
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition(true, oldIndex);
    }
    
    function prevSlide() {
        const oldIndex = currentIndex;
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlidePosition(false, oldIndex);
    }
    
    function updateSlidePosition(goingRight = true, oldIndex = null) {
        if (oldIndex === slides.length - 1 && currentIndex === 0 && goingRight) {
            // Clone first slide and append it temporarily
            const firstSlideClone = slides[0].cloneNode(true);
            track.appendChild(firstSlideClone);
            
            // Move to cloned slide
            track.style.transition = 'transform 0.3s ease';
            track.style.transform = `translateX(-${slides.length * 100}%)`;
            
            // After transition, instantly jump back to first slide
            setTimeout(() => {
                track.style.transition = 'none';
                track.style.transform = `translateX(0)`;
                track.removeChild(firstSlideClone);
            }, 300);
        } else if (oldIndex === 0 && currentIndex === slides.length - 1 && !goingRight) {
            // Clone all slides and prepend them temporarily
            const trackClone = track.cloneNode(true);
            track.insertBefore(trackClone, track.firstChild);
            
            // Start from last slide of the clone
            track.style.transition = 'none';
            track.style.transform = `translateX(${slides.length * 100}%)`;
            
            // Force browser reflow
            track.offsetHeight;
            
            // Move to actual last slide
            track.style.transition = 'transform 0.3s ease';
            track.style.transform = `translateX(-${(slides.length - 1) * 100}%)`;
            
            // After transition, clean up
            setTimeout(() => {
                track.removeChild(trackClone);
            }, 300);
        } else {
            track.style.transition = 'transform 0.3s ease';
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideDelay);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
}); 
