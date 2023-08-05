class ShoppingList {
            constructor() {
                this.items = [];
                this.loadItemsFromLocalStorage();
            }

            addItem(item) {
                if (item.trim() !== "") {
                    this.items.push(item);
                    this.updateLocalStorage();
                }
            }

            removeItem(index) {
                this.items.splice(index, 1);
                this.updateLocalStorage();
            }

            editItem(index, newItem) {
                this.items[index] = newItem.trim();
                this.updateLocalStorage();
            }

            updateLocalStorage() {
                localStorage.setItem("shoppingListItems", JSON.stringify(this.items));
                this.displayItems();
            }

            loadItemsFromLocalStorage() {
                const savedItems = JSON.parse(localStorage.getItem("shoppingListItems"));
                this.items = savedItems || [];
                this.displayItems();
            }

            displayItems() {
                const shoppingList = document.getElementById("shoppingList");
                shoppingList.innerHTML = "";
                this.items.forEach((item, index) => {
                    const listItemContainer = document.createElement("div");
                    listItemContainer.classList.add("list-item-container");

                    const listItem = document.createElement("li");
                    listItem.textContent = item;
                    listItemContainer.appendChild(listItem);

                    const editButton = document.createElement("button");
                    editButton.textContent = "Edit";
                    editButton.classList.add("edit-btn");
                    editButton.onclick = () => {
                        const editedItem = prompt("Edit item:", item);
                        if (editedItem !== null) {
                            this.editItem(index, editedItem);
                        }
                    };
                    listItemContainer.appendChild(editButton);

                    const deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete";
                    deleteButton.classList.add("delete-btn");
                    deleteButton.onclick = () => {
                        if (confirm("Do you want to delete this item?")) {
                            this.removeItem(index);
                        }
                    };
                    listItemContainer.appendChild(deleteButton);

                    shoppingList.appendChild(listItemContainer);
                });
            }
        }

        const shoppingListApp = new ShoppingList();

        function addItem() {
            const itemInput = document.getElementById("itemInput");
            shoppingListApp.addItem(itemInput.value);
            itemInput.value = "";
        }