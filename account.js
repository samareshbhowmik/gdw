document.addEventListener('DOMContentLoaded', function() {
    // Update the current year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // User icon click to show profile modal
    document.getElementById('userIcon').addEventListener('click', function() {
        document.getElementById('userProfileModal').style.display = 'block';
    });

    // Close profile modal
    document.querySelector('.close-button').addEventListener('click', function() {
        document.getElementById('userProfileModal').style.display = 'none';
    });

    // Clicking outside the modal closes it
    window.onclick = function(event) {
        if (event.target == document.getElementById('userProfileModal')) {
            document.getElementById('userProfileModal').style.display = 'none';
        }
    };

    // Example function to handle password change - remember to define this function or remove the call if not used
    function changePassword() {
        // Your change password logic here
        console.log("Change password function called");
    }
});
