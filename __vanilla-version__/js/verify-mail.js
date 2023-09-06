window.addEventListener("DOMContentLoaded", function () {
  var form = document.forms[0];
  let fields = this.document.querySelectorAll(".field");

  function isEmpty() {
    fields.forEach((field) => {
      if (field.value.length <= 0) return false;
    });
    return true;
  }

  for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener("keyup", function () {
      if (fields[i].value.length > 0) {
        if (fields[i + 1] < fields.length) {
          fields[i + 1].focus;
        }
      }
    });
  }

  form.onsubmit = isEmpty();
});
