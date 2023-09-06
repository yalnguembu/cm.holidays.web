window.addEventListener("DOMContentLoaded", function () {
  const form = document.forms[0];
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const emailGroup = document.getElementById("email-group");
  const passwordGroup = document.getElementById("password-group");
  const emailErrorMessage = document.getElementById("email-eror-msg");
  const passwordErrorMessage = document.getElementById("password-eror-msg");

  const setErrorMessage = (fields) => {
    if (fields === "email") {
      emailGroup.classList.add("invalid");
      emailErrorMessage.classList.add("invalid");
    } else if (fields === "password") {
      passwordGroup.classList.add("invalid");
      passwordErrorMessage.classList.add("invalid");
    }
  };

  const unSetErrorMessage = (fields) => {
    if (fields === "email") {
      emailGroup.classList.remove("invalid");
      emailErrorMessage.classList.remove("invalid");
      return;
    }
    passwordGroup.classList.remove("invalid");
    passwordErrorMessage.classList.remove("invalid");
  };

  const isEmailCorrect = () => {
    if (email.value.length > 0) {
      let valideEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!valideEmail.test(email.value)) {
        emailErrorMessage.innerText = "Sorry this is not a valid email";
        setErrorMessage("email");
        return false;
      } else unSetErrorMessage("email");
      return true;
    }
    emailErrorMessage.innerText = "This field can't not be empty";
    setErrorMessage("email");
    return false;
  };

  const isPasswordCorrect = () => {
    if (password.value.length > 0) {
      let validePassword = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,15}$/;
      if (!validePassword.test(password.value)) {
        passwordErrorMessage.innerText = "Sorry this is not a valid password";
        setErrorMessage("password");
        return false;
      } else unSetErrorMessage("password");
      return true;
    }
    passwordErrorMessage.innerText = "This field can't not be empty";
    setErrorMessage("password");
    return false;
  };

  const checkForm = () => {
    const validEmail = isEmailCorrect();
    const validPassword = isPasswordCorrect();
    return validEmail && validPassword;
  };

  email.addEventListener("blur", function () {
    isEmailCorrect();
  });

  password.addEventListener("blur", function () {
    isPasswordCorrect();
  });

  form.onsubmit = () => checkForm();
});
