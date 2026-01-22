const list = document.getElementById("taskList");

function getPriorityText(value) {
    if (value == 1) return "High";
    if (value == 2) return "Medium";
    if (value == 3) return "Low";
    return "";
}

function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (tasks.length === 0) {
        list.innerHTML = "<li>No tasks found</li>";
        return;
    }

    list.innerHTML = "";

    tasks.forEach(task => {
        const status = task.completed ? "Completed" : "Pending";

        let buttons = "";

        if (!task.completed) {
            buttons += `<button onclick="completeTask(${task.id})">Complete</button> `;
            buttons += `<button onclick="editTask(${task.id})">Edit</button> `;
        }

        buttons += `<button onclick="deleteTask(${task.id})">Delete</button>`;

        list.innerHTML += `
            <li>
                <strong>${task.title}</strong>
                (${task.duration} min, ${getPriorityText(task.priority)} Priority)
                - ${status}
                ${buttons}
            </li>
        `;
    });
}

function completeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        if (task.id === id) {
            task.completed = true;
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === id);

    const newTitle = prompt("Edit title:", task.title);
    if (newTitle === null) return;

    const newDuration = prompt("Edit duration (minutes):", task.duration);
    if (newDuration === null) return;

    const newPriority = prompt("Edit priority (1=High, 2=Medium, 3=Low):", task.priority);
    if (newPriority === null) return;

    task.title = newTitle;
    task.duration = newDuration;
    task.priority = newPriority;

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(id) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

if (list) {
    renderTasks();
}