document.addEventListener('DOMContentLoaded', () => {
    const feedbackContainer = document.getElementById('feedbackContainer'); // Placeholder for feedbacks

    // Fetch feedbacks from the API
    fetch('http://localhost:5000/api/feedbacks') // Adjust the URL based on your server setup
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                feedbackContainer.innerHTML = '<p>No feedbacks available.</p>';
            } else {
                data.forEach(feedback => {
                    const feedbackItem = document.createElement('div');
                    feedbackItem.classList.add('feedback-item');
                    feedbackItem.innerHTML = `
                        <strong>Name:</strong> <span>${feedback.name}</span>  <br>
                        <strong>Email:</strong><span> ${feedback.email}</span> <br>
                        <strong>Message:</strong><span> ${feedback.message}</span> <br>
                        <strong>Date:</strong> <span>${new Date(feedback.date).toLocaleString()}</span>
                        
                    `;
                    feedbackContainer.appendChild(feedbackItem);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching feedbacks:', error);
            feedbackContainer.innerHTML = '<p>Error loading feedbacks.</p>';
        });
});
