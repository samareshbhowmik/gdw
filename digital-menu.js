document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('mainContent');

    for (let i = 0; i < 20; i++) {
        const categoryBox = document.createElement('div');
        categoryBox.classList.add('category-box');

        const categoryInput = document.createElement('input');
        categoryInput.setAttribute('type', 'text');
        categoryInput.classList.add('category-input');
        categoryInput.placeholder = 'Add Your Main Category';

        const addButton = document.createElement('button');
        addButton.textContent = 'Add';
        addButton.classList.add('add-btn');
        addButton.disabled = true; // Initially disable the add button until input is provided

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.style.display = 'none'; // Initially hide the edit button

        const addItemButton = document.createElement('button');
        addItemButton.textContent = 'Add Your Food/Drinks Name';
        addItemButton.classList.add('add-item-btn');
        addItemButton.disabled = true; // Initially disabled

        // Enable add button when input is provided
        categoryInput.addEventListener('input', function() {
            addButton.disabled = !categoryInput.value.trim();
        });

        // Functionality for the Add/Save button
        addButton.onclick = function() {
            if (categoryInput.value.trim()) {
                categoryInput.disabled = true; // Disable input after saving
                addButton.style.display = 'none'; // Hide add button after use
                editButton.style.display = 'inline'; // Show edit button
                addItemButton.disabled = false; // Enable the add item button
                // Save the category name to localStorage or handle it as needed
            }
        };

        // Enable editing of the category name
        editButton.onclick = function() {
            categoryInput.disabled = false; // Enable input for editing
            categoryInput.focus(); // Focus on input
            addButton.textContent = 'Save'; // Change button text to Save
            addButton.style.display = 'inline'; // Show add button again for saving
            editButton.style.display = 'none'; // Hide edit button while editing
        };

        // Redirect to add food/drink items page
        addItemButton.onclick = function() {
            window.location.href = `addItems.html?category=${i+1}`; // Redirect
        };

        categoryBox.appendChild(categoryInput);
        categoryBox.appendChild(addButton);
        categoryBox.appendChild(editButton);
        categoryBox.appendChild(addItemButton);

        mainContent.appendChild(categoryBox);
    }
});
