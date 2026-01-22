const form = document.getElementById("taskForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const duration = document.getElementById("duration").value;
        const priority = document.getElementById("priority").value;

        const task = {
            id: Date.now(),
            title: title,
            description: description,
            duration: duration,
            priority: priority,
            completed: false
        };

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        form.reset();
        alert("Task added successfully");
    });
}