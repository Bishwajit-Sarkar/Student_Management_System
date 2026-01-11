let students = [];

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const grade = document.getElementById("grade").value;
    const index = document.getElementById("studentIndex").value;

    if (index === "") {
        students.push({ name, age, grade });
    } else {
        students[index] = { name, age, grade };
        document.getElementById("studentIndex").value = "";
    }

    form.reset();
    displayStudents();
});

function displayStudents() {
    table.innerHTML = "";

    students.forEach((student, index) => {
        table.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.grade}</td>
                <td>
                    <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
                    <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function editStudent(index) {
    document.getElementById("name").value = students[index].name;
    document.getElementById("age").value = students[index].age;
    document.getElementById("grade").value = students[index].grade;
    document.getElementById("studentIndex").value = index;
}

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        displayStudents();
    }
}


function searchStudent() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    table.innerHTML = "";

    students
        .filter(student =>
            student.name.toLowerCase().includes(searchValue) ||
            student.grade.toLowerCase().includes(searchValue)
        )
        .forEach((student, index) => {
            table.innerHTML += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td>${student.grade}</td>
                    <td>
                        <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
                        <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
                    </td>
                </tr>
            `;
        });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const grade = document.getElementById("grade").value.trim();
    const index = document.getElementById("studentIndex").value;
    const error = document.getElementById("error");

    if (name === "" || age === "" || grade === "") {
        error.textContent = "All fields are required!";
        return;
    }

    if (age <= 0) {
        error.textContent = "Age must be a positive number!";
        return;
    }

    error.textContent = "";

    if (index === "") {
        students.push({ name, age, grade });
    } else {
        students[index] = { name, age, grade };
        document.getElementById("studentIndex").value = "";
    }

    form.reset();
    displayStudents();
});
