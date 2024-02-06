document.addEventListener('DOMContentLoaded', function() {
    const twentyFourHoursCheckbox = document.getElementById('twentyFourHours');

    twentyFourHoursCheckbox.addEventListener('change', function() {
        const inputs = document.querySelectorAll('#openingHoursForm input[type="time"]');
        const checkboxes = document.querySelectorAll('#openingHoursForm input[type="checkbox"]:not(#twentyFourHours)');
        if (this.checked) {
            inputs.forEach(input => {
                input.disabled = true;
                input.value = ''; // Clear the value
            });
            checkboxes.forEach(checkbox => {
                checkbox.disabled = true;
                checkbox.checked = false; // Uncheck all checkboxes
            });
        } else {
            inputs.forEach(input => input.disabled = false);
            checkboxes.forEach(checkbox => checkbox.disabled = false);
        }
    });
});
