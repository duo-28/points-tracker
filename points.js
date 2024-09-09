document.addEventListener('DOMContentLoaded', () => {
    const addStudentModal = document.getElementById('addStudentModal');
    const studentName = document.getElementById('studentName');
    const studentForm = document.getElementById('studentForm');
    const studentsTableBody = document.getElementById('studentsTableBody');
    const confirmRemoveBtn = document.getElementById('confirmRemoveBtn');
    const colourDropdown = document.getElementById('colourDropdown');
    const saveColourBtn = document.getElementById('saveColourBtn');
    let studentToRemoveIndex = null;
    let studentToEditIndex = null;

    let students = JSON.parse(localStorage.getItem('students')) || [];

    const colours = ['Teal', 'Turquoise', 'LimeGreen', 'SeaGreen', 'MediumPurple', 'BlueViolet', 'FireBrick', 'Crimson'];

    colours.forEach(colour => {
        const option = document.createElement('option');
        option.value = colour;
        option.textContent = colour;
        option.style.backgroundColor = colour;
        colourDropdown.appendChild(option);
    });

    function updateTable() {
        studentsTableBody.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            const nameBox = document.createElement('div');
            nameBox.className = 'name-box';
            nameBox.textContent = student.name; // Display full name
            nameBox.style.backgroundColor = student.colour || 'var(--highlight-colour)';
            nameCell.appendChild(nameBox);
            row.appendChild(nameCell);

            const pointsCell = document.createElement('td');
            const decreaseBtn = document.createElement('button');
            decreaseBtn.className += "btn btn-outline-secondary rounded-circle";
            decreaseBtn.textContent = '-';
            decreaseBtn.addEventListener('click', () => {
                student.points = Math.max(0, student.points - 1);
                saveAndUpdateTable();
            });

            const increaseBtn = document.createElement('button');
            increaseBtn.className += "btn btn-outline-secondary rounded-circle";
            increaseBtn.textContent = '+';
            increaseBtn.addEventListener('click', () => {
                student.points += 1;
                saveAndUpdateTable();
            });

            const pointsText = document.createElement('span');
            pointsText.style.padding = '0 15px';
            pointsText.style.fontSize = '18px';
            pointsText.textContent = student.points;

            pointsCell.appendChild(decreaseBtn);
            pointsCell.appendChild(pointsText);
            pointsCell.appendChild(increaseBtn);
            row.appendChild(pointsCell);

            const actionsCell = document.createElement('td');
            const colourBtn = document.createElement('button');
            colourBtn.className = 'btn btn-outline-primary me-2';
            colourBtn.dataset.bsToggle = 'modal';
            colourBtn.dataset.bsTarget = "#colourModal";
            colourBtn.textContent = 'Colour';
            colourBtn.addEventListener('click', () => {
                studentToEditIndex = index;
                colourDropdown.value = student.colour || 'var(--highlight-colour)';
            });

            const removeBtn = document.createElement('button');
            removeBtn.className = "btn btn-outline-danger";
            removeBtn.dataset.bsToggle = 'modal';
            removeBtn.dataset.bsTarget = "#removeStudentModal";
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                studentToRemoveIndex = index;
            });

            actionsCell.appendChild(colourBtn);
            actionsCell.appendChild(removeBtn);
            row.appendChild(actionsCell);

            studentsTableBody.appendChild(row);
        });
    }

    function saveAndUpdateTable() {
        localStorage.setItem('students', JSON.stringify(students));
        updateTable();
    }

    addStudentModal.addEventListener('shown.bs.modal', () => {
        studentName.focus();
    });

    studentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('studentName').value;

        students.push({ name, points: 0, colour: 'var(--highlight-colour)' });

        saveAndUpdateTable();
        studentForm.reset();
        studentName.focus();
    });

    confirmRemoveBtn.addEventListener('click', () => {
        if (studentToRemoveIndex !== null) {
            students.splice(studentToRemoveIndex, 1);
            saveAndUpdateTable();
            studentToRemoveIndex = null;
        }
    });

    saveColourBtn.addEventListener('click', () => {
        if (studentToEditIndex !== null) {
            students[studentToEditIndex].colour = colourDropdown.value;
            saveAndUpdateTable();
            studentToEditIndex = null;
        }
    });

    // Apply background color to the dropdown
    colourDropdown.addEventListener('change', (event) => {
        event.target.style.backgroundColor = event.target.value;
        event.target.style.color = 'white';
    });

    // Initial table update from localStorage
    updateTable();
});
