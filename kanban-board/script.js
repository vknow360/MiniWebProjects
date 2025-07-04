const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

for (const card of cards) {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
}
for (const list of lists) {
    list.addEventListener("dragover", dragOver);
    list.addEventListener("drop", dragDrop);
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
}

function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
}

function dragEnd(e) {
    e.target.classList.remove("dragging");
}
function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add("over");
}

function dragLeave(e) {
    this.classList.remove("over");
}

function dragDrop(e) {
    const id = e.dataTransfer.getData("text/plain");

    const card = document.getElementById(id);
    this.appendChild(card);

    this.classList.remove("over");
}
