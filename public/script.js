let cart = [];

function addToCart(item, price) {
    let existingItem = cart.find(entry => entry.item === item);
    if (existingItem) {
        existingItem.quantity += 1;  // Increase quantity
    } else {
        cart.push({ item, price, quantity: 1 });  // Add new item
    }
    updateCart();
}

function updateCart() {
    let orderList = document.getElementById('cart'); // Fixed ID name for cart display
    let total = 0;
    orderList.innerHTML = "";

    if (cart.length === 0) {
        orderList.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById('qr-code').style.display = 'none';
    } else {
        cart.forEach((entry, index) => {
            total += entry.price * entry.quantity;
            orderList.innerHTML += `
                <div class="cart-item">
                    <span>${entry.item} - ${entry.quantity} nos (₹${entry.price * entry.quantity})</span>
                    <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                </div>`;
        });
    }

    document.getElementById('total').innerText = total;
}

function removeItem(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;  // Reduce quantity
    } else {
        cart.splice(index, 1);  // Remove item if quantity is 1
    }
    updateCart();
}

function payNow() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to proceed.");
        return;
    }

    let totalAmount = document.getElementById('total').innerText;
    let upiID = "upiid@okhdfcbank";  // 🔹 Replace with your actual UPI ID
    let gpayUPILink = `upi://pay?pa=${upiID}&pn=KEC Canteen&mc=0000&tid=123456&tr=ORDER123&tn=Canteen Order&am=${totalAmount}&cu=INR`;

    let qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(gpayUPILink)}`;

    document.getElementById('qr-image').src = qrCodeURL;
    document.getElementById('qr-code').style.display = 'block';

    // ✅ Open GPay directly if on mobile
    window.location.href = gpayUPILink;

    localStorage.setItem("orderDetails", JSON.stringify(cart));
}

function showBill() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add items first.");
        return;
    }
    localStorage.setItem("orderDetails", JSON.stringify(cart));
    window.location.href = "bill.html";
}

// ✅ Function to clear the cart after payment
function clearCart() {
    cart = [];
    updateCart();
}
