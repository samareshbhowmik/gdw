document.addEventListener('DOMContentLoaded', function() {
    // Attach event listener to the join form submission
    document.getElementById('joinForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission behavior
        document.getElementById('otpModal').style.display = 'block';  // Display the OTP modal
    });

    // Function to collect OTP from inputs
    function collectOTP() {
        let otp = '';
        document.querySelectorAll('#otpInputs input').forEach(input => {
            otp += input.value.trim();  // Collect and trim each input value
        });
        return otp;
    }

    // Event listener for OTP submission
    document.getElementById('otpSubmit').addEventListener('click', function() {
        const otp = collectOTP();  // Collect OTP from inputs
        // Simulate OTP verification (for demo purposes, every OTP is considered correct)
        alert("Your account has been created successfully.");
        document.getElementById('otpModal').style.display = 'none';  // Hide the OTP modal
        window.location.href = 'account.html';  // Redirect to the account page
    });

    // Event listener for closing the OTP modal
    document.querySelector('.close-button').addEventListener('click', function() {
        document.getElementById('otpModal').style.display = 'none';  // Hide the OTP modal
    });

    // Event listener to close the OTP modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == document.getElementById('otpModal')) {
            document.getElementById('otpModal').style.display = 'none';  // Hide the OTP modal
        }
    };

    // Auto-focus on the next input field after entering each digit in the OTP
    const otpInputs = document.querySelectorAll('#otpInputs input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.trim().length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();  // Move focus to the next input
            }
        });
    });

    // Event listener for resending the OTP
    document.getElementById('resendOTP').addEventListener('click', function(event) {
        event.preventDefault();  // Prevent default anchor behavior
        // Add logic to resend the OTP here (not implemented in this demo)
        alert('OTP has been resent. Please check your email.');
    });
});
