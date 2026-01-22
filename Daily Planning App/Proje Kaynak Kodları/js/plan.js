const button = document.getElementById("createPlan");
const result = document.getElementById("planResult");

function timeToMinutes(time) {
    const parts = time.split(":");
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

function minutesToTime(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
}

if (button) {
    button.addEventListener("click", function () {
        const startTime = document.getElementById("dayStart").value;
        const endTime = document.getElementById("dayEnd").value;

        if (!startTime || !endTime) {
            alert("Please select day start and end times");
            return;
        }

        let dayStart = timeToMinutes(startTime);
        let dayEnd = timeToMinutes(endTime);

        if (dayStart >= dayEnd) {
            alert("Start time must be before end time");
            return;
        }

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let unavailable = JSON.parse(localStorage.getItem("unavailableHours")) || [];

        if (tasks.length === 0) {
            result.innerHTML = "<p>No tasks available</p>";
            return;
        }

        tasks.sort((a, b) => a.priority - b.priority);

        let blocks = [];
        blocks.push({ start: dayStart, end: dayEnd });

        unavailable.forEach(u => {
            const uStart = timeToMinutes(u.start);
            const uEnd = timeToMinutes(u.end);

            blocks = blocks.flatMap(b => {
                if (uEnd <= b.start || uStart >= b.end) {
                    return [b];
                }
                let newBlocks = [];
                if (uStart > b.start) {
                    newBlocks.push({ start: b.start, end: uStart });
                }
                if (uEnd < b.end) {
                    newBlocks.push({ start: uEnd, end: b.end });
                }
                return newBlocks;
            });
        });

        let plan = [];
        let blockIndex = 0;
        let currentTime = blocks.length > 0 ? blocks[0].start : null;

        for (let task of tasks) {
            let duration = parseInt(task.duration);

            while (blockIndex < blocks.length) {
                let block = blocks[blockIndex];

                if (currentTime + duration <= block.end) {
                    plan.push({
                        title: task.title,
                        start: currentTime,
                        end: currentTime + duration
                    });
                    currentTime += duration;
                    break;
                } else {
                    blockIndex++;
                    if (blocks[blockIndex]) {
                        currentTime = blocks[blockIndex].start;
                    }
                }
            }
        }

        if (plan.length === 0) {
            result.innerHTML = "<p>Unable to create plan with given constraints</p>";
            return;
        }

        let html = "<h2>Generated Daily Plan</h2><ul>";

        plan.forEach(item => {
            html += "<li>" +
                minutesToTime(item.start) +
                " - " +
                minutesToTime(item.end) +
                " → " +
                item.title +
                "</li>";
        });

        html += "</ul>";

        result.innerHTML = html;
    });
}