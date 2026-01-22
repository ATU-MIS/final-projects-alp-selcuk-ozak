const clearButton = document.getElementById("clearData");

if (clearButton) {
    clearButton.addEventListener("click", function () {
        const confirmReset = confirm("Are you sure you want to clear all data?");

        if (confirmReset) {
            localStorage.removeItem("tasks");
            localStorage.removeItem("unavailableHours");
            localStorage.removeItem("plans");

            alert("All data has been cleared");
        }
    });
}