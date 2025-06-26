document.addEventListener("DOMContentLoaded", function () {
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || [];
  const billTable = document.querySelector("#bill-table tbody");
  let totalAmount = 0;

  // Populate table rows
  orderDetails.forEach((entry) => {
    totalAmount += entry.price * entry.quantity;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.item}</td>
      <td>${entry.quantity}</td>
      <td>₹${entry.price * entry.quantity}</td>
    `;
    billTable.appendChild(row);
  });

  // Set total and date
  document.getElementById("bill-total").innerText = totalAmount;
  document.getElementById("bill-date").innerText = new Date().toLocaleString();

  // Generate random name
  const names = ["Jershon","Kavin","Allan","Yogesh","Ranesh","Dharenesh","Berson","Mohan","Arun","Jacob"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  document.getElementById("bill-name").innerText = randomName;

  // Generate fake transaction ID
  const txnId = "TXN" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 90 + 10);
  document.getElementById("bill-txn").innerText = txnId;

  // Generate unique ticket ID
  const ticketId = "TKT-" + Math.floor(100000 + Math.random() * 900000);
  localStorage.setItem("ticketId", ticketId);
  localStorage.setItem(`ticket_${ticketId}_used`, "false");

  // Generate QR code
  const qrText = `http://192.168.26.182:5500/verify.html?id=${ticketId}`;

  new QRious({
    element: document.getElementById("ticket-qr"),
    value: qrText,
    size: 200
  });

  document.getElementById("ticket-id").textContent = ticketId;
});
