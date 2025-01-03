document.addEventListener('DOMContentLoaded', () => {
  const feedbackForm = document.getElementById('feedbackForm');
  const messageBox = document.getElementById('messageBox');

  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the page reload

    const name = document.getElementById('name').value;
    const email = document.getElementById('emai').value; // Fix "emai" typo
    const message = document.getElementById('message').value;

    try {
      const response = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      if (response.ok) {
        messageBox.style.display = 'block';
        messageBox.style.color = 'green';
        messageBox.textContent = 'Feedback submitted successfully!';
      } else {
        messageBox.style.display = 'block';
        messageBox.style.color = 'red';
        messageBox.textContent = `Error: ${result.error || 'Failed to submit feedback'}`;
      }
    } catch (error) {
      messageBox.style.display = 'block';
      messageBox.style.color = 'red';
      messageBox.textContent = 'Error: Unable to connect to the server.';
    }

    feedbackForm.reset();
  });
});
