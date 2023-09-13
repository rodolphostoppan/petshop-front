const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const form = document.getElementById("form");
const errorName = document.getElementById("errorName");
const errorEmail = document.getElementById("errorEmail");
const errorPhone = document.getElementById("errorPhone");

function setMaskOnPhoneInput() {
  if (phoneInput.value === "") {
    phoneInput.setAttribute("placeholder", "(XX) X XXXX-XXXX");
  }
}

function removePlaceholderFromPhoneInput() {
  phoneInput.removeAttribute("placeholder");
}

function filterForPhoneInput() {
  let value = phoneInput.value.replace(/\D/g, "");

  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  if (value.length > 2) {
    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  }

  if (value.length > 7) {
    value = `${value.slice(0, 10)}-${value.slice(10)}`;
  }
  phoneInput.value = value;
}

function alertMessage(message) {
  alert(message);
}

function resetInputs() {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
}

function sendForm() {
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      const { success } = data;
      const { errors } = data;
      const { email, name, phone } = errors;

      if (success) {
        alertMessage(
          "Dados enviados com sucesso!\nConfira seu e-mail, enviamos uma mensagem."
        );

        resetInputs();
      } else {
        alertMessage("Erro ao enviar o formulário.\nVerifique os campos.");
        if (name) {
          errorName.textContent = name;
        }
        if (email) {
          errorEmail.textContent = email;
        }
        if (phone) {
          errorPhone.textContent = phone;
        }
      }
    });
}

phoneInput.addEventListener("focus", setMaskOnPhoneInput);
phoneInput.addEventListener("blur", removePlaceholderFromPhoneInput);
phoneInput.addEventListener("input", filterForPhoneInput);
form.addEventListener("submit", (eventClick) => {
  eventClick.preventDefault();
  sendForm();
});
