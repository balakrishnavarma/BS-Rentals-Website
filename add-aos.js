const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// Add AOS CSS
if (!html.includes('aos.css')) {
    html = html.replace('</head>', '    <!-- AOS CSS -->\n    <link href=\"https://unpkg.com/aos@2.3.1/dist/aos.css\" rel=\"stylesheet\">\n</head>');
}

// Add AOS JS and Init
if (!html.includes('aos.js')) {
    html = html.replace('</body>', '    <!-- AOS JS -->\n    <script src=\"https://unpkg.com/aos@2.3.1/dist/aos.js\"></script>\n    <script>\n        AOS.init({\n            duration: 800,\n            once: true,\n            offset: 100\n        });\n    </script>\n    <script src=\"script.js\"></script>\n</body>');
    // Remove the old script tag if it exists just before </body> so we don't duplicate it.
    html = html.replace(/<script src=\"script\.js\"><\/script>\s*<!-- AOS JS/, '<!-- AOS JS');
}

// Add data-aos to major sections
html = html.replace(/<section([^>]*?)class=\"([^\"]*?)\"([^>]*?)>/g, (match, p1, p2, p3) => {
    if (!p2.includes('hero') && !match.includes('data-aos')) {
        return `<section${p1}class=\"${p2}\"${p3} data-aos=\"fade-up\">`;
    }
    return match;
});

// Add data-aos to car cards
let delay = 0;
html = html.replace(/<div class=\"car-card\">/g, (match) => {
    let res = `<div class=\"car-card\" data-aos=\"zoom-in\" data-aos-delay=\"${delay}\">`;
    delay = (delay + 100) % 400; // stagger up to 300ms
    return res;
});

// Add it to why choose us features
html = html.replace(/<div class=\"feature-card\">/g, (match) => {
    let res = `<div class=\"feature-card\" data-aos=\"fade-up\" data-aos-delay=\"${delay}\">`;
    delay = (delay + 100) % 400;
    return res;
});

fs.writeFileSync('index.html', html);
console.log('index.html updated with AOS animations!');
