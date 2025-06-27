const complaintEndpoint = "https://script.google.com/macros/s/AKfycbwPhep4RlG-ZjLXgsiBVjZNzaycBtqsc1ngTS6RXpQ7zYKIYwHUGGURc1wdjBr5C2OZYg/exec"; // Replace with your actual Web App URL

document.getElementById('complaintForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const dept = document.getElementById('dept').value.trim();
  const year = document.getElementById('year').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const msg = document.getElementById('msg').value.trim();

  if (!name || !dept || !year || !phone || !msg) {
    document.getElementById('status').textContent = "❌ Please fill all fields.";
    return;
  }

  fetch(complaintEndpoint, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      dept,
      year,
      phone,
      msg,
      date: new Date().toLocaleString("en-GB")
    })
  });

  document.getElementById('status').textContent = "✅ Your complaint has been registered!";
  document.getElementById('complaintForm').reset();

  setTimeout(() => {
    document.getElementById('status').textContent = "";
  }, 3000);
});
