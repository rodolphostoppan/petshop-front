const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const submitInput = document.getElementById("submit");
const form = document.getElementById("form");

phoneInput.addEventListener("focus", function () {
  if (phoneInput.value === "") {
    phoneInput.setAttribute("placeholder", "(XX) X XXXX-XXXX");
  }
});

phoneInput.addEventListener("blur", function () {
  phoneInput.removeAttribute("placeholder");
});

phoneInput.addEventListener("input", function () {
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
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendForm();
});

function sendForm() {
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
  }).then(
    alert(
      "Dados enviados com sucesso!                                              Confira seu e-mail, enviamos uma mensagem."
    )
  );
}
