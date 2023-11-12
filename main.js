const add = document.querySelector(".add");
const content = document.querySelector(".content");
const left = document.querySelector(".left");
const trash = document.querySelector(".delete");
const main = document.querySelector(".main");
const textarea = document.querySelector("textarea");
const items = document.querySelectorAll(".item");

add.addEventListener("click", () => {
    addNote();
});

textarea.addEventListener("blur", () => {
    addNote();
});

textarea.addEventListener("input", () => {
    updateActiveItem();
});

function addNote() {
    const noteBody = textarea.value.trim();
    if (noteBody !== "") {
        const currentDate = new Date();
        const formattedDate = `${currentDate.toLocaleDateString()}`;

        let html = `<div class="item">
                        <p class="item-title">${noteBody}</p>
                        <p class="item-body">${formattedDate}</p>
                    </div>`;
        left.innerHTML += html; // Append the new item
        left.classList.add("selected"); // Add the "selected" class to the left item
        updateItemEventListeners();
        textarea.value = "";
        textarea.focus(); // Set focus to the textarea
    }
}

function updateItemEventListeners() {
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
        item.addEventListener("click", () => {
            items.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }
            });
            item.classList.toggle("active");

            if (item.classList.contains("active")) {
                const body = item.querySelector(".item-title").textContent;
                textarea.value = `${body}`;
            } else {
                textarea.value = "";
            }
        });

        const deleteButton = item.querySelector(".delete-item");
        if (deleteButton) {
            deleteButton.addEventListener("click", () => {
                item.remove();
            });
        }
    });
}

function updateActiveItem() {
    const activeItem = document.querySelector(".item.active");
    if (activeItem) {
        const newNoteBody = textarea.value.trim();
        const bodyElement = activeItem.querySelector(".item-title");
        if (newNoteBody !== "") {
            bodyElement.textContent = newNoteBody;
        }
    }
}

trash.addEventListener("click", () => {
    const activeItem = document.querySelector(".item.active");
    if (activeItem) {
        activeItem.remove();
        textarea.value = "";
    }
});

updateItemEventListeners();
