const holidayWrapper = document.getElementById("holidays-wrapper");
const emptyCard = document.getElementById("empty");
let openButton = document.getElementById("create-modal");
let submitButton = document.getElementById("submit-button");
let modal = document.getElementById("modal");

const items = [
  //   {
  //     hour: "14h",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dolore nam voluptates, atque laboriosam optio ducimus ist",
  //     holidaytype: "Annual",
  //     startingDate: "2023-06-12",
  //     endingDate: "2023-06-17",
  //     creationDate: "2023-01-05",
  //   },
];

const holidayItem = ({
  hour,
  description,
  holidaytype,
  startingDate,
  endingDate,
  creationDate,
}) => {
  return `
    <div class="item">
        <div class="row time">
            <p>${new Date(creationDate).toDateString()}</p>
            <p>${hour}</p>
        </div>
        <h2 class="dauration">${new Date(
          startingDate
        ).toDateString()} -${new Date(endingDate).toDateString()}</h2>
        <p class="desc">
        ${description}
        </p>
        <p class="alert">${holidaytype}</p>
    </div>
    `;
};
if (items.length) {
  emptyCard.classList.remove("visible");
  for (const item of items) {
    holidayWrapper.innerHTML += holidayItem(item);
  }
} else {
  emptyCard.classList.add("visible");
}
const openModal = () => {
  modal.classList.add("visible");
  this.document.body.style.overflow = "hidden";
  console.log(hidden)
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
