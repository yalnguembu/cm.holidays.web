window.addEventListener("DOMContentLoaded", function () {
  let openButton = document.getElementById("create-modal");
  let submitButton = document.getElementById("submit-button");
  let modal = document.getElementById("modal");

  const openModal = () => {
    modal.classList.add("visible");
    this.document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    modal.classList.remove("visible");
  };

  openButton.onclick = openModal;

  const modalCard = document.getElementById("modal-card");

  const listener = (event) => {
    if (event.target !== modalCard && !modalCard.contains(event.target)) {
      if (event.target === openButton) openModal();
      else if (modal.classList.contains("visible")) closeModal();
    }
  };

  submitButton.click = () => alert("holliday created");

  window.addEventListener("click", listener);
});
