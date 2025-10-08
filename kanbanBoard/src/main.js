function refreshBoard() {
    const cards = document.querySelectorAll('.card');
    const sections = document.querySelectorAll('.section');
    const addCardButton = document.querySelector('#addCard');

    addCardButton.addEventListener('click', addCard)

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
}

function addCard(e) {
    if (document.getElementById('newCard').value === '') {
        e.preventDefault();
        console.log('empty');
        } else {
        e.preventDefault();
        const card = document.createElement('div');

        card.classList.add('card');
        card.id = document.getElementById('newCard').value;
        card.draggable = true;
        card.innerText = document.getElementById('newCard').value;
        document.getElementById('start').appendChild(card);

        document.getElementById('newCard').value = '';

        refreshBoard();
        console.log('added');
        }
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

    if (this.id === 'trash') {
        return;
    } else {

    }
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
    refreshBoard();

    if (this.id === 'done') {
        card.style.textDecoration = 'line-through';
        confettea.burst({
        particleCount: 300,
        startVelocity: 40,
        origin: { x: 0.8, y: 0.3 },
        colors: ['#EFF5D2', '#C6D870', '#8FA31E', '#556B2F']
    });

        setTimeout(() => {
        const deleteCardConfirmation = confirm("Would you like to delete this task?");
        if (deleteCardConfirmation) {
            card.remove();
            }
        }, 1500);
    } else {
        card.style.textDecoration = 'none';
    }
}
refreshBoard();