const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmation = document.getElementById("confirmation");

const showErr = (input, msg) => {
  input.className = "err";
  const errMsg = input.parentElement.querySelector("p");
  errMsg.classList.remove("hidden");
  errMsg.innerText = msg;
};

const showSucces = (input) => {
  input.className = "succes";
  const errMsg = input.parentElement.querySelector("p");
  errMsg.classList.add("hidden");
};

function checkEmail(inputEmail) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(inputEmail.value.trim())) {
    showSucces(inputEmail);
  } else {
    showErr(inputEmail, "Email is not valid.");
  }
}

const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showErr(input, `${getFieldName(input)} is required`);
    } else {
      showSucces(input);
    }
  });
};

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showErr(
      input,
      `${getFieldName(input)} must be at least ${min} characters.`
    );
  } else if (input.value.length > max) {
    showErr(
      input,
      `${getFieldName(input)} must be less than ${max} characters.`
    );
  } else {
    showSucces(input);
  }
};

const checkPasswordsMatch = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showErr(pass2, "Password do not match.");
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkRequired([username, email, password, confirmation]);
  checkLength(username, 4, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordsMatch(password, confirmation);
});
