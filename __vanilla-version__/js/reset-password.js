window.addEventListener("DOMContentLoaded", function () {
  var form = document.forms[0];
  let confPwd = document.getElementById("confirm-password");
  let password = document.getElementById("password");
  let confPwdGroup = document.getElementById("confirm-password-group");
  let passwordGroup = document.getElementById("password-group");
  let confPwdErrMessage = document.getElementById("confirm-password-err-msg");
  let passwordErrMessage = document.getElementById("password-err-msg");

  function setErrMessage(champs) {
    if (champs === "confPwd") {
      confPwdGroup.classList.add("invalid");
      confPwdErrMessage.classList.add("invalid");
    } else if (champs === "password") {
      passwordGroup.classList.add("invalid");
      passwordErrMessage.classList.add("invalid");
    }
  }
  function unSetErrMessage(champs) {
    if (champs === "confPwd") {
      confPwdGroup.classList.remove("invalid");
      confPwdErrMessage.classList.remove("invalid");
    } else if (champs === "password") {
      passwordGroup.classList.remove("invalid");
      passwordErrMessage.classList.remove("invalid");
    }
  }
  function isconfPwdCorrect() {
    if (confPwd.value.length > 0) {
      let valid = password.value === confPwd.value;
      if (!valid) {
        confPwdErrMessage.innerText = "the both are not simillar";
        setErrMessage("confPwd");
      } else unSetErrMessage("confPwd");
      return valid;
    } else {
      confPwdErrMessage.innerText = "This field can't not be empty";
      setErrMessage("confPwd");
      return false;
    }
  }

  function isPasswordCorrect() {
    if (password.value.length > 0) {
      let validePassword = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,15}$/;
      let valid = validePassword.test(password.value);
      if (!valid) {
        passwordErrMessage.innerText = "Incorrect password";
        setErrMessage("password");
      } else unSetErrMessage("password");
      return valid;
    }
    passwordErrMessage.innerText = "This field can't not be empty";
    setErrMessage("password");
    return false;
  }
  function checkForm() {
    if (isPasswordCorrect() && isconfPwdCorrect()) {
      return true;
    } else return false;
  }

  confPwd.addEventListener("keyup", function () {
    isconfPwdCorrect();
  });
  password.addEventListener("keyup", function () {
    isPasswordCorrect();
  });
  form.onsubmit = function () {
    return checkForm();
  };
});
