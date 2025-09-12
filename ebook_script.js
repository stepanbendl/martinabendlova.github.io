document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ebook-form');
    const submitBtn = document.getElementById('submit-btn');
    const formContainer = document.getElementById('form-container');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', (e) => {

        submitBtn.disabled = true;
        errorMessage.textContent = '';

        setTimeout(() => {
            formContainer.style.display = 'none';
            successMessage.style.display = 'block';
        }, 500);
    });
});
