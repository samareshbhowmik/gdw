document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.getElementById('formContainer');
    const showFormBtn = document.getElementById('showFormBtn');
    const form = document.getElementById('foodItemForm');
    const foodItemsList = document.getElementById('foodItemsList');

    // Show the form when the "Add New Food Item" button is clicked
    showFormBtn.addEventListener('click', function() {
        formContainer.style.display = 'block';
    });

    // Save the food item and update the list upon form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Gather food item data from the form
        const foodItem = {
            name: document.getElementById('foodName').value,
            price: document.getElementById('price').value,
            description: document.getElementById('description').value,
            ingredients: document.getElementById('ingredients').value,
            calories: parseInt(document.getElementById('calories').value, 10),
            available: true  // Default to available when adding a new item
        };

        saveFoodItem(foodItem);  // Save the food item
        form.reset();            // Reset the form for the next entry
        formContainer.style.display = 'none';  // Hide the form after saving
    });

    // Save food item to local storage
    function saveFoodItem(foodItem) {
        let foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];

        if (foodItems.length >= 100) {
            alert('The list has reached its maximum capacity of 100 items.');
            return;
        }

        foodItems.push(foodItem);
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
        displayFoodItems();  // Refresh the displayed list
    }

    // Display food items from local storage
    function displayFoodItems() {
        const foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];
        foodItemsList.innerHTML = '';

        foodItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            const availabilityText = item.available ? 'Available' : 'Unavailable';
            const toggleAvailabilityText = item.available ? 'Set Unavailable' : 'Set Available';
            itemElement.innerHTML = `
                <p>${item.name}</p>
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="toggleAvailability(${index})">${toggleAvailabilityText}</button>
            `;
            foodItemsList.appendChild(itemElement);
        });
    }

    // Toggle item availability
    function toggleAvailability(index) {
        let foodItems = JSON.parse(localStorage.getItem('foodItems'));
        foodItems[index].available = !foodItems[index].available;
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
        displayFoodItems();  // Refresh the displayed list
    }

    // Edit an item (functionality to be implemented based on your application's requirements)
    function editItem(index) {
        let foodItems = JSON.parse(localStorage.getItem('foodItems'));
        let item = foodItems[index];
        // You can populate the form with item details for editing and show the form
        // Example:
        document.getElementById('foodName').value = item.name;
        document.getElementById('price').value = item.price;
        document.getElementById('description').value = item.description;
        document.getElementById('ingredients').value = item.ingredients;
        document.getElementById('calories').value = item.calories;
        formContainer.style.display = 'block';
        // You might want to implement a way to save the edited item back to the list
    }

    // Initial display of stored food items
    displayFoodItems();
});
var editingIndex = -1; // Global variable to track the index of the item being edited

// Inside DOMContentLoaded:
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const foodItem = {
        // Gather food item data from the form...
    };

    if (editingIndex !== -1) {
        // Update existing item
        updateFoodItem(editingIndex, foodItem);
    } else {
        // Save new item
        saveFoodItem(foodItem);
    }
    form.reset();
    formContainer.style.display = 'none';
    editingIndex = -1; // Reset editing index
});

function editItem(index) {
    var foodItems = JSON.parse(localStorage.getItem('foodItems'));
    var item = foodItems[index];
    // Populate form fields...
    editingIndex = index; // Set the editing index
    formContainer.style.display = 'block';
}

function updateFoodItem(index, foodItem) {
    var foodItems = JSON.parse(localStorage.getItem('foodItems'));
    foodItems[index] = foodItem;
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
    displayFoodItems();
}

// Ensure toggleAvailability and other functions are correctly implemented...
