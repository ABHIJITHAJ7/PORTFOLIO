document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Message sent!');
      e.target.reset();
    } else {
      alert('Failed to send message.');
    }
  } catch (err) {
    console.error(err);
    alert('Error sending message.');
  }
});

document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const statusDiv = document.getElementById('form-status');
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  statusDiv.textContent = 'Sending...';
  statusDiv.style.color = 'black';

  try {
    const res = await fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const message = await res.text();
    statusDiv.textContent = message;
    statusDiv.style.color = res.ok ? 'green' : 'red';
    if (res.ok) e.target.reset();
  } catch (err) {
    console.error(err);
    statusDiv.textContent = 'Error sending message.';
    statusDiv.style.color = 'red';
  }
});
