const hoursForm = document.getElementById("hoursForm");

if (hoursForm) {
    hoursForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const startTime = document.getElementById("startTime").value;
        const endTime = document.getElementById("endTime").value;

        const hours = {
            id: Date.now(),
            start: startTime,
            end: endTime
        };

        let unavailable = JSON.parse(localStorage.getItem("unavailableHours")) || [];
        unavailable.push(hours);
        localStorage.setItem("unavailableHours", JSON.stringify(unavailable));

        hoursForm.reset();
        alert("Unavailable hours saved");
    });
}