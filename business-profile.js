document.addEventListener('DOMContentLoaded', function() {
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const categoriesContainer = document.getElementById('categoriesContainer');
    let categoryCount = 0;

    // Function to add a new category
    function addCategory() {
        // Check if the category count is less than 100
        if (categoryCount < 100) {
            const categoryName = prompt("Enter the main food category name:");
            // Proceed only if categoryName is provided
            if (categoryName && categoryName.trim() !== "") {
                categoryCount++;  // Increment the category count
                const categoryBtn = document.createElement('button');
                categoryBtn.textContent = categoryName;
                categoryBtn.classList.add('category-btn');
                categoryBtn.setAttribute('data-category', categoryName);
                categoryBtn.onclick = function() {
                    // Here you can add functionality to handle category selection
                    document.getElementById('currentCategoryName').textContent = this.getAttribute('data-category');
                    document.getElementById('itemsSection').style.display = 'block';
                };
                categoriesContainer.appendChild(categoryBtn);
            }
        } else {
            alert('Maximum number of food categories reached (100).');
        }
    }

    // Event listener for the "Add Category" button
    addCategoryBtn.addEventListener('click', addCategory);
});
