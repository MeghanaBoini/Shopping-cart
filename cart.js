const cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product, price, image) {
    const existingProduct = cart.find(item => item.product === product);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ product, price, image, quantity: 1 });
    }
    saveCart();
    alert(`${product} has been added to the cart`);
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.product}" class="cart-item-image">
            <div>
                <h3>${item.product}</h3>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button onclick="removeFromCart('${item.product}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotalElement.textContent = total.toFixed(2);
}

function removeFromCart(product) {
    const productIndex = cart.findIndex(item => item.product === product);
    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        saveCart();
        renderCart();
        alert(`${product} has been removed from the cart`);
    }
}

document.addEventListener('DOMContentLoaded', renderCart);
