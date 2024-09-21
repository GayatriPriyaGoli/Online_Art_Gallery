// Function to filter products based on search input
function searchProducts() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const products = Array.from(document.querySelectorAll('.product'));
    const productList = document.getElementById('product-list');
    const notFoundMessage = document.getElementById('notFoundMessage');

    // Clear previous product list
    productList.innerHTML = '';

    // Track if any products are found
    let foundProducts = false;

    products.forEach(product => {
        const productName = product.querySelector('h4').textContent.toLowerCase(); // Get product name from <h4>

        // Check if product name includes the search input
        if (productName.includes(searchInput)) {
            productList.appendChild(product); // Append matching product to the list
            foundProducts = true; // Mark that at least one product was found
        }
    });

    // Show or hide the not found message
    if (foundProducts) {
        notFoundMessage.style.display = 'none'; // Hide the message if products are found
    } else {
        notFoundMessage.style.display = 'block'; // Show the message if no products are found
        notFoundMessage.textContent = "Can't find product";
    }
}

// Add event listener to the search input
document.getElementById("searchInput").addEventListener("input", searchProducts);
// Function to open the side navigation
function openNav() {
    document.getElementById("sideNav").style.width = "250px";
    document.getElementById("openNavBtn").style.display = "none"; // Hide the open button
}

// Function to close the side navigation
function closeNav() {
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("openNavBtn").style.display = "block"; // Show the open button
}

// Event listener for the side navigation close button
document.getElementById("closeNav").addEventListener("click", closeNav);

// Event listener for the side navigation open button
document.getElementById("openNavBtn").addEventListener("click", openNav);

// Function to sort products by the selected criteria
function sortProducts() {
    const sortBy = document.querySelector('input[name="sort"]:checked');
    const productList = document.getElementById('product-list');
    const products = Array.from(document.querySelectorAll('.product'));

    // Sort products array based on the selected option
    if (sortBy) {
        const sortValue = sortBy.value;
        if (sortValue === 'low_to_high') {
            products.sort((a, b) => parseInt(a.getAttribute('data-price'), 10) - parseInt(b.getAttribute('data-price'), 10));
        } else if (sortValue === 'high_to_low') {
            products.sort((a, b) => parseInt(b.getAttribute('data-price'), 10) - parseInt(a.getAttribute('data-price'), 10));
        } else if (sortValue === 'bestselling') {
            // Implement your bestselling logic here
        }
    }

    // Clear the product list and append sorted products
    productList.innerHTML = '';
    products.forEach(product => productList.appendChild(product));
}

// Add event listener to the Sort By radio buttons
document.querySelectorAll('input[name="sort"]').forEach(input => {
    input.addEventListener('change', sortProducts);
});

// Function to filter products by price range
function filterProductsByPrice() {
    const priceFilter = document.querySelector('input[name="price"]:checked');
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const price = parseInt(product.getAttribute('data-price'), 10);

        let display = false;

        if (priceFilter) {
            switch (priceFilter.value) {
                case 'below_10000':
                    if (price < 10000) display = true;
                    break;
                case '10000_25000':
                    if (price >= 10000 && price <= 25000) display = true;
                    break;
                case '25000_50000':
                    if (price >= 25000 && price <= 50000) display = true;
                    break;
                case '50000_100000':
                    if (price >= 50000 && price <= 100000) display = true;
                    break;
                case 'above_100000':
                    if (price > 100000) display = true;
                    break;
            }
        } else {
            // If no filter is selected, display all products
            display = true;
        }

        // Toggle product visibility
        product.style.display = display ? 'block' : 'none';
    });
}

// Add event listener to the price filter radio buttons
document.querySelectorAll('input[name="price"]').forEach(input => {
    input.addEventListener('change', filterProductsByPrice);
});

// Add event listener to the Reset button
document.getElementById('resetBtn').addEventListener('click', () => {
    document.querySelectorAll('input[name="price"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name="sort"]').forEach(input => input.checked = false);
    filterProductsByPrice(); // Reset the product list to show all products
});
function addToCart(productId, productPrice) {
let cart = JSON.parse(localStorage.getItem('cart')) || [];
if (!cart.includes(productId)) {
cart.push(productId);
localStorage.setItem('cart', JSON.stringify(cart));
console.log(`Added product ${productId} to cart`, cart);
} else {
console.log(`Product ${productId} is already in the cart.`);
}
}

// Event listener for adding products to the cart
document.querySelectorAll('.add-to-cart').forEach(button => {
button.addEventListener('click', function() {
const productCard = this.closest('.product-card');
const productId = productCard.getAttribute('data-product-id');
const productPrice = productCard.querySelector('.product-price').textContent;

addToCart(productId, productPrice); // Call the function to add to cart
});
});
// Function to add product to cart
function addToCart(productId) {
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Check if the product is already in the cart
if (!cart.includes(productId)) {
cart.push(productId); // Add the product to cart
localStorage.setItem('cart', JSON.stringify(cart));

// Alert the user that the product has been added
alert("Product added to cart!");
} else {
// Alert the user that the product is already in the cart
alert("Product is already in cart!");
}
}


// Function to toggle wishlist
function toggleWishlist(productId) {
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
if (!wishlist.includes(productId)) {
wishlist.push(productId); // Add to wishlist
localStorage.setItem('wishlist', JSON.stringify(wishlist));
alert("Product added to wishlist!");
} else {
alert("Product is already in wishlist!");
}
}

// Event listener to open the wishlist page
document.getElementById("wishlist-icon").addEventListener("click", function() {
window.location.href = "wishlist1.html"; // Redirect to the wishlist page
});

// Toggle the heart icon color
document.querySelectorAll('.heart-icon').forEach(icon => {
icon.addEventListener('click', function() {
this.classList.toggle('red'); // Toggle the 'red' class
});
});

// Load the cart on page load
document.addEventListener('DOMContentLoaded', function() {
updateCartUI();
});
window.onload = function() {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartList = document.getElementById('cart-list');

cart.forEach(item => {
const listItem = document.createElement('li');
listItem.textContent = `${item.name} - ₹${item.price}`;
cartList.appendChild(listItem);
});
};

