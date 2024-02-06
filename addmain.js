document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addMainServiceButton').addEventListener('click', addMainService);
});

var mainServices = [];

function addMainService() {
    const serviceNameInput = document.getElementById('newServiceInput');
    const serviceName = serviceNameInput.value.trim();

    if (!serviceName) {
        alert("Service name cannot be empty.");
        return;
    }

    if (mainServices.some(service => service.name.toLowerCase() === serviceName.toLowerCase())) {
        alert("Service name already exists.");
        return;
    }

    mainServices.push({ name: serviceName, subItems: [] });
    serviceNameInput.value = '';
    updateMainServicesList();
}

function updateMainServicesList() {
    const list = document.getElementById('mainServicesList');
    list.innerHTML = '';

    mainServices.forEach((service, index) => {
        const serviceDiv = document.createElement('div');
        serviceDiv.innerHTML = `<div>${service.name} <button onclick="showSubItemForm(${index})">Add Sub-Item</button></div>`;
        const subItemsContainer = document.createElement('div');

        service.subItems.forEach((subItem, subIndex) => {
            const subItemDiv = document.createElement('div');
            subItemDiv.classList.add('service-item');
            subItemDiv.innerHTML = subItemTemplate(subItem, index, subIndex);
            subItemsContainer.appendChild(subItemDiv);
        });

        serviceDiv.appendChild(subItemsContainer);
        list.appendChild(serviceDiv);
    });
}

function subItemTemplate(subItem, serviceIndex, subIndex) {
    return `
        <img src="${subItem.imageUrl}" alt="Sub Item Image" style="width:100px; height:auto;">
        <p>Name: ${subItem.name}</p>
        <p>Price: ${subItem.price}</p>
        <p>Description: ${subItem.description}</p>
        <p>Ingredients: ${subItem.ingredients}</p>
        <p>Calories: ${subItem.calories}</p>
        <button onclick="editSubItem(${serviceIndex}, ${subIndex})">Edit</button>
    `;
}

function showSubItemForm(serviceIndex, subIndex = null) {
    resetSubItemForm();
    document.getElementById('subItemForm').style.display = 'block';
    document.getElementById('submitSubItemButton').onclick = function() { submitSubItemForm(serviceIndex, subIndex); };
    if (subIndex !== null) {
        loadSubItemData(serviceIndex, subIndex);
    }
}

function submitSubItemForm(serviceIndex, subIndex) {
    const subItemData = collectSubItemFormData();
    if (!subItemData.name || !subItemData.imageFile) {
        alert('Please provide both a name and an image for the sub-item.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        subItemData.imageUrl = e.target.result;
        if (subIndex !== null) {
            mainServices[serviceIndex].subItems[subIndex] = subItemData;
        } else {
            mainServices[serviceIndex].subItems.push(subItemData);
        }
        updateMainServicesList();
        resetSubItemForm();
    };
    reader.readAsDataURL(subItemData.imageFile);
}

function loadSubItemData(serviceIndex, subIndex) {
    const subItem = mainServices[serviceIndex].subItems[subIndex];
    document.getElementById('subItemName').value = subItem.name;
    document.getElementById('subItemPrice').value = subItem.price;
    document.getElementById('subItemDescription').value = subItem.description;
    document.getElementById('subItemIngredients').value = subItem.ingredients;
    document.getElementById('subItemCalories').value = subItem.calories;
    // Note: Image cannot be loaded into file input for security reasons
}

function collectSubItemFormData() {
    return {
        name: document.getElementById('subItemName').value.trim(),
        price: document.getElementById('subItemPrice').value.trim(),
        description: document.getElementById('subItemDescription').value.trim(),
        ingredients: document.getElementById('subItemIngredients').value.trim(),
        calories: document.getElementById('subItemCalories').value.trim(),
        imageFile: document.getElementById('subItemImage').files[0]
    };
}
function editSubItem(serviceIndex, subIndex) {
    const subItem = mainServices[serviceIndex].subItems[subIndex];
    showSubItemForm(serviceIndex, subIndex);

    // Hide the edit button
    const editButton = document.querySelector(`.editSubItemButton[data-service-index="${serviceIndex}"][data-sub-index="${subIndex}"]`);
    editButton.style.display = 'none';

    // Show Save and Cancel buttons
    document.getElementById('saveButton').style.display = 'inline';
    document.getElementById('cancelButton').style.display = 'inline';

    // Adjust onclick handlers for Save and Cancel
    document.getElementById('saveButton').onclick = function() { saveEdit(serviceIndex, subIndex); };
    document.getElementById('cancelButton').onclick = function() { cancelEdit(serviceIndex, subIndex, editButton); };
}


function resetSubItemForm() {
    // Hide the form
    document.getElementById('subItemForm').style.display = 'none';
    // Reset form fields
    document.getElementById('subItemName').value = '';
    document.getElementById('subItemPrice').value = '';
    document.getElementById('subItemDescription').value = '';
    document.getElementById('subItemIngredients').value = '';
    document.getElementById('subItemCalories').value = '';
    document.getElementById('subItemImage').value = '';
    // Reset the submit button text and remove any specific onclick event to return to default state
    document.getElementById('submitSubItemButton').innerText = 'Add Sub-Item';
    document.getElementById('submitSubItemButton').onclick = null;
}

// This function is used when the 'Cancel' button is clicked in the sub-item form.
function cancelEdit() {
    resetSubItemForm();
}

// Make sure to call this function when setting up your form, for example in the showSubItemForm function
document.getElementById('cancelButton').addEventListener('click', cancelEdit);

