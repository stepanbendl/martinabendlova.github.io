document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ebook-form');
    const submitBtn = document.getElementById('submit-btn');
    const formContainer = document.getElementById('form-container');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyHU-x9GdX0nbRvoDFVB9o871uHmJFWrgsex9PcI3iArH5uQADXfnduhGAMraZl0XS_/exec'; 

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Odesílám...';
        errorMessage.textContent = '';
        const userName = document.getElementById('name').value;
        const userEmail = document.getElementById('email').value;

        fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ name: userName, email: userEmail }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                formContainer.style.display = 'none';
                successMessage.style.display = 'block';
            } else { throw new Error(data.message); }
        })
        .catch(error => {
            errorMessage.textContent = 'Došlo k chybě. Zkuste to prosím znovu.';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Stáhnout ebook';
        });
    });
});