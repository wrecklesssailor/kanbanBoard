/**
 * Refreshes the event listeners for the cards and sections on the board.
 * Called when the board is modified in some way.
 * Listens for dragstart and dragend events on all cards, and for dragover, dragenter, dragleave, and drop events on all sections.
 */
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

/**
 * Handles the add card event, prevents the default form submission
 * and adds a new card element to the start section if the input field
 * is not empty. If the input field is empty, it logs a message to the
 * console and prevents the default form submission. If the input field
 * is not empty, it creates a new div element with the class 'card',
 * sets its id to the value of the input field, sets its draggable property
 * to true, sets its inner text to the value of the input field, appends it
 * to the start section and resets the input field's value to an empty string.
 * It then calls the refreshBoard function and logs a message to the console.
 */
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

/**
 * Sets the data transfer text to the card's id and adds the 'dragging' class
 * to the card element when a card is dragged from a section element.
 */
function dragStart(e) {
    e.dataTransfer.setData("text/plain", this.id);
    this.classList.add('dragging');
}

/**
 * Removes the 'dragging' class from the card element when a card is
 * dragged out of a section element and logs a message to the
 * console.
 */
function dragEnd() {
    this.classList.remove('dragging');
    console.log('drag end');
}

/**
 * Prevents the default drag event from occurring when a card is
 * dragged over a section element. This is necessary to
 * prevent the browser from opening the card as a new tab
 * when it is dragged over a section.
 */
function dragOver(e) {
    e.preventDefault();
}

/**
 * Prevents the default drag event from occurring and adds the 'dragOver'
 * class to the section element when a card is dragged into the section.
 * If the section is the 'trash' section, the function returns without doing
 * anything.
 */
function dragEnter(e) {
    e.preventDefault();

    if (this.id === 'trash') {
        return;
    } else {

    }
    this.classList.add('dragOver');
}

/**
 * Removes the 'dragOver' class from the section element and logs a message
 * to the console when a card is dragged out of the section.
 */
function dragLeave() {
    this.classList.remove('dragOver');
    console.log('drag leave');
}

/**
 * Handles the drag drop event, appends the dropped card to the section
 * and applies line-through styling if the section is 'done'. If the section
 * is 'done', it also triggers a confetti burst and after a delay, asks for
 * confirmation to delete the task. If confirmed, the card is removed, if not
 * confirmed, the card's background color is reset to the default color.
 */
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
        card.style.backgroundColor = '#bee1e6';
        setTimeout(() => {
            card.style.backgroundColor = '#f86666';
            
        }, 1400);

        setTimeout(() => {
            console.log('test');
            const deleteCardConfirmation = confirm("Would you like to delete this task?");
            if (deleteCardConfirmation) {
                card.remove();
                } else {
                card.style.backgroundColor = '#f0efeb';
                }
        }, 1500);
    } else {
        card.style.textDecoration = 'none';
    }
}
refreshBoard();