document.getElementById('birthday').addEventListener('change', function () {
    var birthday = new Date(this.value);
    var today = new Date();
    var age = today.getFullYear() - birthday.getFullYear();
    var monthDiff = today.getMonth() - birthday.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }
    if (age < 18) {
        alert('age of student must be bigger than 18 years old!!');
        this.value = '';
    }
});
const KEY_TASKS_LIST = "tasks";
let allTask = JSON.parse(localStorage.getItem(KEY_TASKS_LIST)) || [];
let taskEdit = null;

// function addTask(id, taskName, birthday, phonenumber) {
//     const task = {
//         id: id,
//         taskName: taskName,
//         birthday: birthday,
//         phonenumber: phonenumber,
//         idmain: new Date().getTime(),

//     };
//     allTask.push(task);
//     localStorage.setItem(KEY_TASKS_LIST, JSON.stringify(allTask));
// }
function renderTasks() {
    const tbodyElement = document.querySelector(".js-tbody-task-app");
    let bodyTableHtml = ``;

    allTask.forEach((task) => {
        bodyTableHtml +=
            ` <tr>
        <td>${task.id}</td>
        <td>${task.taskName}</td>
        <td>${task.birthday}</td>
        <td>${task.phonenumber}</td>
        <td><button class="del-btn" onclick="deleteTaskById(${task.idmain})" >Delete</button></td>
       
    </tr>`;
    });

    tbodyElement.innerHTML = bodyTableHtml;
}


function addTask(id, taskName, birthday, phonenumber) {
    const existingTaskIndex = allTask.findIndex(task => task.id === id);

    if (existingTaskIndex !== -1) {

        allTask[existingTaskIndex].taskName = taskName;
        allTask[existingTaskIndex].birthday = birthday;
        allTask[existingTaskIndex].phonenumber = phonenumber;
    } else {

        const task = {
            id: id,
            taskName: taskName,
            birthday: birthday,
            phonenumber: phonenumber,
            isDone: false,
            idmain: new Date().getTime(),
        };
        allTask.push(task);
    }

    localStorage.setItem(KEY_TASKS_LIST, JSON.stringify(allTask));
}

function deleteTaskById(taskId) {
    allTask = allTask.filter((task) => task.idmain !== taskId);
    localStorage.setItem(KEY_TASKS_LIST, JSON.stringify(allTask));

    renderTasks();
}

function handleAddTask(event) {
    event.preventDefault();
    const inputTaskEleId = document.querySelector(".js-input-task-id");
    const inputTaskEleName = document.querySelector(".js-input-task-name");
    const inputTaskEleBirthday = document.querySelector(".js-input-task-birthday");
    const inputTaskElePhoneNumber = document.querySelector(".js-input-task-phonenumber");
    addTask(inputTaskEleId.value, inputTaskEleName.value, inputTaskEleBirthday.value, inputTaskElePhoneNumber.value);

    renderTasks();
    inputTaskEleId.value = "";
    inputTaskEleName.value = "";
    inputTaskElePhoneNumber.value = "";
    inputTaskEleBirthday.value = "";
}


function main() {
    const formInputTaskEle = document.querySelector(".js-form-task");
    formInputTaskEle.addEventListener("submit", handleAddTask);

    renderTasks();
}

main();

