window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        document.body.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        document.body.classList.remove('scrolled');
    }
});

document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-overlay').classList.toggle('active');
});

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    document.getElementById('nav-overlay').classList.remove('active');
}

async function loadCatalogue() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2se5HZNZyhxQnuxilcaHMjG_ddSMT5pjeO6K5JXEKilqE9YO7s8f8txgXFQ1TDv5e05faDUA79vXw/pub?output=csv'; // Double-check this link!
    try {
        const res = await fetch(csvUrl);
        const data = await res.text();
        const rows = data.split('\n');
        const grid = document.getElementById('product-grid');
        grid.innerHTML = ''; // Clear existing
        
        // Start from index 1 to skip the header row
        for (let i = 1; i < rows.length; i++) {
            const cols = rows[i].split(',');
            if (cols.length < 4) continue; // Skip empty rows
            
            const [img, price, colors, brand] = cols;
            grid.innerHTML += `
                <div class="product-card">
                    <img src="${img.trim()}" alt="Product">
                    <h3>${brand ? brand.trim() : 'N/A'}</h3>
                    <p>Price: ${price ? price.trim() : 'N/A'}</p>
                    <p>Colors: ${colors ? colors.trim() : 'N/A'}</p>
                </div>
            `;
        }
    } catch (e) { console.error("Error loading CSV:", e); }
}

loadCatalogue();