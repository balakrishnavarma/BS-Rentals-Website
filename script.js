// Configuration
const WHATSAPP_NUMBER = "+911234567890"; // Easy to change inside script.js

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const searchForm = document.getElementById('searchForm');
const pickupDate = document.getElementById('pickupDate');
const returnDate = document.getElementById('returnDate');
const whatsappBtn = document.getElementById('whatsappBtn');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const mobileLoginBtn = document.getElementById('mobileLoginBtn');
const mobileSignupBtn = document.getElementById('mobileSignupBtn');
const viewAllBtn = document.getElementById('viewAllBtn');
const bookBtns = document.querySelectorAll('.book-btn');

// 1. Mobile hamburger menu
hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile menu when a link is clicked
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// 2. Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 4. Date validation & 5. Pickup date cannot be after return date
// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
pickupDate.min = today;
returnDate.min = today;

pickupDate.addEventListener('change', () => {
    // When pickup date changes, update the minimum return date
    returnDate.min = pickupDate.value;
    
    // If return date is earlier than new pickup date, reset it
    if (returnDate.value && returnDate.value < pickupDate.value) {
        returnDate.value = pickupDate.value;
    }
});

// 3. Search Cars button functionality
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const city = searchForm.city.value;
    const pDate = pickupDate.value;
    const pTime = searchForm.pickupTime.value;
    const rDate = returnDate.value;
    const rTime = searchForm.returnTime.value;
    
    // Basic validation
    if (!city || !pDate || !pTime || !rDate || !rTime) {
        alert("Please fill in all search details.");
        return;
    }
    
    // Simulate search action
    console.log("Searching for cars in", city, "from", pDate, "to", rDate);
    
    const searchBtn = document.querySelector('.btn-search');
    const originalText = searchBtn.innerText;
    searchBtn.innerText = 'Searching...';
    
    setTimeout(() => {
        searchBtn.innerText = originalText;
        // Scroll to fleet section
        document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
});

// 6. Book Now button interaction
bookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const carCard = e.target.closest('.car-card');
        const carName = carCard.querySelector('.car-name').innerText;
        const carPrice = carCard.querySelector('.price-amount').innerText;
        
        // Save to localStorage (as requested for frontend functionality)
        const bookingDetails = {
            car: carName,
            price: carPrice,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('currentBooking', JSON.stringify(bookingDetails));
        
        // Form data integration for WhatsApp message
        const city = searchForm.city.value;
        const pDate = pickupDate.value;
        const pTime = searchForm.pickupTime.value;
        const rDate = returnDate.value;
        const rTime = searchForm.returnTime.value;
        
        let message = `Hi BS Self Drive Car Rentals,\n\nI want to book the *${carName}* (${carPrice}/day).`;
        if(city && pDate && rDate) {
            message += `\n\n*Booking Details:*\nCity: ${city}\nPickup: ${pDate} at ${pTime}\nReturn: ${rDate} at ${rTime}`;
        } else {
            message += `\n\nPlease let me know if it is available.`;
        }
        
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
});

// 7. Login & 8. Sign Up button Modal Logic
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeLogin = document.getElementById('closeLogin');
const closeSignup = document.getElementById('closeSignup');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

const openLoginModal = () => {
    loginModal.classList.add('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'hidden';
};

const openSignupModal = () => {
    signupModal.classList.add('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'hidden';
};

const closeModals = () => {
    loginModal.classList.remove('active');
    signupModal.classList.remove('active');
    document.body.style.overflow = '';
};

loginBtn.addEventListener('click', openLoginModal);
mobileLoginBtn.addEventListener('click', openLoginModal);
signupBtn.addEventListener('click', openSignupModal);
mobileSignupBtn.addEventListener('click', openSignupModal);

closeLogin.addEventListener('click', closeModals);
closeSignup.addEventListener('click', closeModals);

// Switch between modals
switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('active');
    signupModal.classList.add('active');
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.classList.remove('active');
    loginModal.classList.add('active');
});

// Close when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal || e.target === signupModal) {
        closeModals();
    }
});

// Handle form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Login functionality will be integrated with backend.");
    closeModals();
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Sign Up functionality will be integrated with backend.");
    closeModals();
});

// 9. View All Cars
viewAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Loading complete fleet inventory...");
});

// 10. WhatsApp floating button setup
whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=Hi%20BS%20Self%20Drive%20Car%20Rentals,%20I%20would%20like%20to%20know%20more%20about%20your%20services.`;

// 11. Highlight active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
