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
    const csvUrl = 'YOUR_CSV_LINK_HERE'; // Replace with your published CSV link
    try {
        const res = await fetch(csvUrl);
        const data = await res.text();
        const rows = data.split('\n').slice(1);
        const grid = document.getElementById('product-grid');
        
        rows.forEach(row => {
            const [img, price, colors, brand] = row.split(',');
            if (!img) return;
            grid.innerHTML += `
                <div class="product-card">
                    <img src="${img}" alt="${brand}">
                    <h3>${brand}</h3>
                    <p>Price: ${price}</p>
                    <p>Colors: ${colors}</p>
                </div>
            `;
        });
    } catch (e) { console.error("Error:", e); }
}

loadCatalogue();