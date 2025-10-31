
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const emailInput = document.getElementById('email');
    const cpfInput = document.getElementById('cpf');

    if (form && !cpfInput) {
        const emailGroup = document.querySelector('label[for="email"]').parentElement;
        const cpfGroup = document.createElement('div');
        cpfGroup.className = 'form-group';
        cpfGroup.innerHTML = `
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" placeholder="999.999.999-99" required>
            <small class="error-message" id="cpf-error"></small>
        `;
        emailGroup.parentNode.insertBefore(cpfGroup, emailGroup.nextSibling);
    }

    // Função para validar email
    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    // Função para validar CPF
    function validarCPF(cpf) {
        const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return regex.test(cpf);
    }

    // Formatar CPF automaticamente
    function formatarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{2})$/, '$1-$2');
        return cpf;
    }

    // Event listeners
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const errorElement = document.getElementById('email-error') || criarElementoErro(emailInput);
            if (!validarEmail(this.value)) {
                errorElement.textContent = 'Formato inválido. Use: exemplo@dominio.com';
                this.style.borderColor = '#e74c3c';
            } else {
                errorElement.textContent = '';
                this.style.borderColor = '#27ae60';
            }
        });
    }

    const cpfField = document.getElementById('cpf');
    if (cpfField) {

        cpfField.addEventListener('input', function() {
            this.value = formatarCPF(this.value);
        });

        cpfField.addEventListener('blur', function() {
            const errorElement = document.getElementById('cpf-error');
            if (!validarCPF(this.value)) {
                errorElement.textContent = 'Formato inválido. Use: 999.999.999-99';
                this.style.borderColor = '#e74c3c';
            } else {
                errorElement.textContent = '';
                this.style.borderColor = '#27ae60';
            }
        });
    }


    if (form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const email = document.getElementById('email');
            const cpf = document.getElementById('cpf');

            if (email && !validarEmail(email.value)) {
                isValid = false;
                email.style.borderColor = '#e74c3c';
            }

            if (cpf && !validarCPF(cpf.value)) {
                isValid = false;
                cpf.style.borderColor = '#e74c3c';
            }

            if (!isValid) {
                e.preventDefault();
                alert('Por favor, corrija os erros no formulário antes de enviar.');
            }
            window.alert("formulario enviado por sucesso!!")
        });
    }


    function criarElementoErro(inputElement) {
        const errorElement = document.createElement('small');
        errorElement.className = 'error-message';
        errorElement.id = inputElement.id + '-error';
        inputElement.parentNode.appendChild(errorElement);
        return errorElement;
    }
});