function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex >= 0) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(li);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}

function checkout() {
    localStorage.removeItem('cart');
    displayCart();

    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';

    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

async function displayOpeningHours() {
    try {
        const response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Jakarta");
        const data = await response.json();

        const currentTime = new Date(data.datetime);
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();

        const openingHour = 9;
        const closingHour = 21;

        let statusMessage;
        if (hours >= openingHour && hours < closingHour) {
            statusMessage = `Toko Buka - Jam Operasional: ${openingHour}:00 - ${closingHour}:00`;
        } else {
            statusMessage = `Toko Tutup - Jam Operasional: ${openingHour}:00 - ${closingHour}:00`;
        }

        const openingHoursElement = document.getElementById("opening-hours");
        openingHoursElement.textContent = `${statusMessage} (Waktu Sekarang: ${hours}:${minutes.toString().padStart(2, '0')})`;
    } catch (error) {
        console.error("Error fetching time:", error);
    }
}

window.onload = function () {
    displayCart();
    displayOpeningHours();
};

function updateCurrentTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const currentTime = now.toLocaleTimeString('en-US', options);
    document.getElementById('current-time').textContent = currentTime;
}

setInterval(updateCurrentTime, 1000);

updateCurrentTime();










