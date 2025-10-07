const cards = document.querySelectorAll('.card');
const sections = document.querySelectorAll('.section');

for (const card of cards) {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
}

for (const section of sections) {
    section.addEventListener('dragover', dragOver);
    section.addEventListener('dragenter',dragEnter);
    section.addEventListener('dragleave', dragLeave);
    section.addEventListener('drop', dragDrop);
}

function dragStart(e) {
    e.dataTransfer.setData("text/plain", this.id);
    this.classList.add('dragging');
}

function dragEnd() {
    this.classList.remove('dragging');
    console.log('drag end');
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('dragOver');
}

function dragLeave() {
    this.classList.remove('dragOver');
    console.log('drag leave');
}

function dragDrop(e) {
    const id = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(id);

    this.appendChild(card);
    this.classList.remove("dragOver");
}