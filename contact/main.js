const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const submitInput = document.getElementById("submit");
const form = document.getElementById("form");

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

function sendForm() {
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alertMessage(
          "Dados enviados com sucesso!\nConfira seu e-mail, enviamos uma mensagem."
        );
      } else {
        alertMessage("Erro ao enviar o formulário. Verifique os campos.", true);

        if (data.errors.name) {
          document.getElementById("errorName").textContent = data.errors.name;
        }
        if (data.errors.email) {
          document.getElementById("errorEmail").textContent = data.errors.email;
        }
        if (data.errors.phone) {
          document.getElementById("errorPhone").textContent = data.errors.phone;
        }
      }
    });
}

phoneInput.addEventListener("focus", setMaskOnPhoneInput);
phoneInput.addEventListener("blur", removePlaceholderFromPhoneInput);
phoneInput.addEventListener("input", filterForPhoneInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendForm();
});
