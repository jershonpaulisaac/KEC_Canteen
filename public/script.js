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
    let orderList = document.getElementById('cart'); 
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
    let upiID = "jershonpaul2006@okaxis"; // Replace with actual UPI ID

    if (upiID === "yourname@upi") {
        alert("Please replace 'yourname@upi' with your actual UPI ID.");
        return;
    }

    // ✅ Generate QR Code for UPI Payment (Without Backend)
    let upiLink = `upi://pay?pa=${upiID}&pn=KEC Canteen&mc=&tid=&tr=&tn=Order Payment&am=${totalAmount}&cu=INR`;
    let qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

    // ✅ Store Payment Data in localStorage
    localStorage.setItem("paymentData", JSON.stringify({
        qrCodeURL: qrCodeURL,
        upiLink: upiLink,
        totalAmount: totalAmount,
        cartItems: cart
    }));

    // 🔹 Redirect to Payment Page
    window.location.href = "payment.html";
}
