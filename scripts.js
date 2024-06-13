document.addEventListener('DOMContentLoaded', function () {
    const formSelectors = [
        { selector: '.contact-form', fields: ['#name', '#email', '#phoneNumber', '#message'], successMessage: 'Your message has been received successfully!' },
        { selector: '.feedback-form', fields: ['#name', '#email', '#message'], successMessage: 'Thank you for your feedback!' },
        { selector: '.registration-form', fields: ['#name', '#email', '#phone', '#event'], successMessage: 'You have been registered successfully!' }
    ];

    formSelectors.forEach(function (formSelector) {
        const form = document.querySelector(formSelector.selector);
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                clearErrors(form);
                let isValid = true;

                formSelector.fields.forEach(function (fieldSelector) {
                    const field = form.querySelector(fieldSelector);
                    if (field) {
                        if (fieldSelector === '#email') {
                            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                            if (!emailPattern.test(field.value.trim())) {
                                showError(field, 'Invalid email address');
                                isValid = false;
                            }
                        } else if (fieldSelector === '#phoneNumber' || fieldSelector === '#phone') {
                            const phonePattern = /^[0-9]{10}$/;
                            if (!phonePattern.test(field.value.trim())) {
                                showError(field, 'Invalid phone number, should contain 10 digits');
                                isValid = false;
                            }
                        } else if (fieldSelector === '#event' && field.value === '') {
                            showError(field, 'Event selection is required');
                            isValid = false;
                        } else if (field.value.trim() === '') {
                            showError(field, field.name.charAt(0).toUpperCase() + field.name.slice(1) + ' is required');
                            isValid = false;
                        }
                    }
                });

                if (isValid) {
                    displaySuccessMessage(form, formSelector.successMessage);
                    form.reset();
                }
            });
        }
    });

    const subscriptionForms = document.querySelectorAll('footer form');
    subscriptionForms.forEach(function (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function (event) {
            event.preventDefault();
            clearErrors(subscriptionForm);
            let isValid = true;

            const emailField = subscriptionForm.querySelector('input[type="email"]');
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(emailField.value.trim())) {
                showError(emailField, 'Invalid email address');
                isValid = false;
            }

            if (isValid) {
                displaySuccessMessage(subscriptionForm, 'You have successfully subscribed!');
                subscriptionForm.reset();
            }
        });
    });

    function clearErrors(form) {
        form.querySelectorAll('.error-message').forEach(function (element) {
            element.remove();
        });
    }

    const showError = (field, message) => {
        const error = Object.assign(document.createElement('div'), {
            className: 'error-message',
            style: 'color: red',
            textContent: message
        });
        field.parentElement.appendChild(error);
    };
    

    function displaySuccessMessage(form, message) {
        const existingSuccessMessage = form.querySelector('.success-message');
        if (existingSuccessMessage) {
            existingSuccessMessage.remove();
        }

        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.color = 'green';
        successMessage.style.marginTop = '10px';
        successMessage.textContent = message;

        if (form.closest('footer')) {
            form.insertAdjacentElement('afterend', successMessage);
        } else {
            form.appendChild(successMessage);
        }

        setTimeout(function () {
            successMessage.remove();
        }, 5000);
    }

    const fileInput = document.getElementById('file');
    const fileName = document.getElementById('file-name');

    if (fileInput) {
        fileInput.addEventListener('change', function () {
            fileName.textContent = this.files.length > 0 ? this.files[0].name : 'No file chosen';
        });
    }
});
