// cart.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Cart Modal Toggle
    const cartModal = document.getElementById('cart-modal');
    const viewBucketBtn = document.getElementById('view-bucket');
    const closeBtn = document.querySelector('.close-btn');

    // Show the cart modal
    viewBucketBtn.addEventListener('click', () => {
        displayCartItems(); // Update modal with cart items
        cartModal.style.display = 'block';
    });

    // Close the cart modal
    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Display cart items on the cart page if it's the cart page
    if (document.getElementById('cart-items')) {
        displayCartItems();
    }

    // Checkout form submission on checkout page
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
});

// Add item to cart
function addToCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));

    // Check if item already exists in cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1; // Increase quantity
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally show an alert or update cart preview dynamically
    alert(`${productName} added to cart`);
}

// Display cart items in modal or on cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;
    cartItemsContainer.innerHTML = ''; // Clear previous items

    // Display each item in the cart
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });

    // Update total price in modal
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
}

// Handle checkout form submission
function handleCheckout(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment').value;

    // Show confirmation alert
    alert(`Thank you for your purchase, ${name}! Your order will be shipped to ${address}. Payment via ${paymentMethod}.`);

    // Clear the cart after checkout
    localStorage.removeItem('cart');
    window.location.href = 'index.html'; // Redirect to homepage after checkout
}
