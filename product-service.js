document.addEventListener('DOMContentLoaded', function() {
    // Set the current year in the footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Event listener for selecting a business type
    document.getElementById('selectBusinessType').addEventListener('click', function() {
        document.getElementById('businessCategories').style.display = 'block';
    });

    // Add event listeners to category buttons
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function() {
            const currentCategory = this.getAttribute('data-category');
            document.getElementById('selectedCategoryName').textContent = currentCategory;
            document.getElementById('confirmationModal').style.display = 'block';
        });
    });

    // Confirm selection of a category
    document.getElementById('confirmSelection').addEventListener('click', function() {
        document.getElementById('confirmationModal').style.display = 'none';
        document.getElementById('businessCategories').style.display = 'none';
        const selectBusinessType = document.getElementById('selectBusinessType');
        selectBusinessType.textContent = "Business Type: " + document.getElementById('selectedCategoryName').textContent;
        selectBusinessType.classList.add('confirmed');
        selectBusinessType.style.pointerEvents = 'none';
        selectBusinessType.style.opacity = '0.5';

        // Show the button for making a digital restaurant menu if Restaurant is selected
        if (document.getElementById('selectedCategoryName').textContent === 'Restaurant') {
            document.getElementById('digitalMenuButtonContainer').style.display = 'block';
        } else {
            document.getElementById('digitalMenuButtonContainer').style.display = 'none';
        }
    });

    // Handle click on the Digital Menu button
    document.getElementById('makeDigitalMenuBtn').addEventListener('click', function() {
        window.location.href = 'digital-menu.html';
    });

    // Cancel selection and close the modal
    document.getElementById('cancelSelection').addEventListener('click', function() {
        document.getElementById('confirmationModal').style.display = 'none';
    });
});