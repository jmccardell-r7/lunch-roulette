document.addEventListener('DOMContentLoaded', () => {
    // 1. The lunch data is now hardcoded directly into this file.
    // You can edit this list anytime.
    const lunchOptions = [
        { "name": "Boojum", "price": 10.00 },
        { "name": "Greggs", "price": 5.00 },
        { "name": "Orto", "price": 10.00 },
        { "name": "Taste", "price": 7.50 },
        { "name": "Centra", "price": 7.50 },
        { "name": "Five Guys", "price": 15.00 },
        { "name": "Burger King", "price": 12.50 },
        { "name": "McDonalds", "price": 10.00 },
        { "name": "Wagamama", "price": 15.00 },
        { "name": "M&S", "price": 5.00 },
        { "name": "Snax in the City", "price": 7.50 },
        { "name": "Subway", "price": 7.50 },
        { "name": "Urban Fresh", "price": 5.00 },
    ];

    // Get references to all the interactive HTML elements
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const pickButton = document.getElementById('pickButton');
    const resultDiv = document.getElementById('result');

    // 2. Enable the button immediately since the data is ready.
    pickButton.disabled = false;
    resultDiv.innerHTML = '<p>Ready when you are!</p>';

    // 3. Attach the event listener to the button.
    pickButton.addEventListener('click', findLunch);

    function findLunch() {
        // This function works exactly the same as before.
        resultDiv.innerHTML = '';
        resultDiv.classList.remove('reveal', 'error-message');

        const minPrice = parseFloat(minPriceInput.value);
        const maxPrice = parseFloat(maxPriceInput.value);

        const filteredOptions = lunchOptions.filter(option => {
            return typeof option.price === 'number' && option.price >= minPrice && option.price <= maxPrice;
        });

        if (filteredOptions.length === 0) {
            resultDiv.innerHTML = `<p class="error-message">No lunch spots found in your price range. Try expanding your budget!</p>`;
            return;
        }

        const randomIndex = Math.floor(Math.random() * filteredOptions.length);
        const winner = filteredOptions[randomIndex];

        const possibilitiesHtml = `
            <div class="possibilities-list">
                <h4>Your possibilities were:</h4>
                <ul>
                    ${filteredOptions.map(option => `<li>${option.name} <span>(£${option.price.toFixed(2)})</span></li>`).join('')}
                </ul>
            </div>
        `;

        const winnerHtml = `
            <div class="winner-display">
                <p>Today you're going to...</p>
                <h2>${winner.name}</h2>
                <p>Average Price: £${winner.price.toFixed(2)}</p>
            </div>
        `;

        resultDiv.innerHTML = winnerHtml + '<hr>' + possibilitiesHtml;
        resultDiv.classList.add('reveal');
    }
});