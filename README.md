# BS Self Drive Car Rentals

A premium frontend for a car rental business built with HTML5, CSS3, and Vanilla JavaScript.

## 1. What files were created

- `index.html`: The main structural layout of the landing page, semantic HTML elements, and complete layout.
- `style.css`: The styling rules utilizing modern CSS variables, Grid, Flexbox, media queries for responsiveness, and smooth transitions/animations.
- `script.js`: Contains vanilla JS logic for the mobile hamburger menu, form validation, smooth scrolling, active navbar tracking, button interaction and floating WhatsApp functionality.
- `assets/`: 
  - `assets/hero/hero-car.png`: Hero section vehicle image
  - `assets/cars/`: Fleet of images including Maruti Swift, Honda City, Hyundai Creta, Kia Seltos, and Toyota Fortuner.

## 2. How to run the website

Since this project consists entirely of static files (HTML, CSS, JS), you do not need a complex server environment to run it.

**Method 1:** Double-click the `index.html` file to open it directly in your web browser (Chrome, Edge, Firefox, etc.).

**Method 2:** Use a local development server like VS Code's "Live Server" extension for the best development experience and hot reloading.

## 3. How to replace car images

1. Add your new car image to the `assets/cars/` folder.
2. Open `index.html`.
3. Locate the `<!-- Car Card X -->` block in the `<section id="fleet">` section.
4. Modify the `src` attribute of the `<img>` tag to point to your new image.
   ```html
   <img src="assets/cars/your-new-image.png" alt="Car Name" class="car-img" loading="lazy">
   ```

## 4. How to change prices

1. Open `index.html`.
2. Locate the specific car card.
3. Find the `<span class="price-amount">` element.
4. Update the text content (e.g., change `₹1,299` to `₹1,499`).
   ```html
   <div class="car-price">
       <span class="price-amount">₹1,499</span> / day
   </div>
   ```

## 5. How to change phone/WhatsApp number

1. Open `script.js`.
2. Find the constant at the very top of the file: `const WHATSAPP_NUMBER = "+911234567890";`.
3. Change it to your desired number including country code.

To change the visible phone numbers in the Navbar and Footer:
1. Open `index.html`.
2. Search for `+91 12345 67890` or the `<a href="tel:...">` tags.
3. Update both the visible text and the `tel:` URL.

## 6. How to add more cars

1. Open `index.html`.
2. Navigate to the `<div class="car-grid">` inside the `#fleet` section.
3. Copy an entire `<div class="car-card">...</div>` block.
4. Paste it at the end of the other car cards inside the grid.
5. Update the new card's image `src`, `alt`, car name, specifications, and price.

The CSS Grid will automatically handle the layout of the new cards responsively across desktop, tablet, and mobile!
