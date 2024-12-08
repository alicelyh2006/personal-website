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
            // When going from last to first slide, continue moving right
            track.style.transform = `translateX(-${slides.length * 100}%)`;
            setTimeout(() => {
                track.style.transition = 'none';
                track.style.transform = `translateX(0%)`;
                setTimeout(() => {
                    track.style.transition = 'transform 0.3s ease';
                }, 10);
            }, 300);
        } else {
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

// Add image modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('modal-close')[0];
    
    // Add click event to all carousel images
    document.querySelectorAll('.carousel-slide img').forEach(img => {
        img.onclick = function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            // Preserve the specific object-position for the modal image
            modalImg.style.objectPosition = window.getComputedStyle(this).objectPosition;
        }
    });
    
    // Close modal when clicking X
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    
    // Close modal when clicking outside the image
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}); 