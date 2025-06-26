
// Get Payment Details from localStorage
let paymentData = JSON.parse(localStorage.getItem("paymentData"));

if (paymentData) {
    document.getElementById("qr-code-img").src = paymentData.qrCodeURL;
    document.getElementById("total-amount").innerText = paymentData.totalAmount;
}

function printBill() {
    // Store cart items for bill generation
    localStorage.setItem("orderDetails", JSON.stringify(paymentData.cartItems));
    window.location.href = "bill.html";
}
