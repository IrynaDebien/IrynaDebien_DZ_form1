document.addEventListener("DOMContentLoaded", function() {
    let радиоПереключатели = document.querySelectorAll('input[name="переключатель"]');
    let списокПоле = document.querySelector('.списокВывод');
    радиоПереключатели.forEach(переключатель => {
        переключатель.addEventListener("change", (e) => {
            document.querySelectorAll('.text-input').forEach(input => input.disabled = true);
            let соответствующийВвод = document.getElementById(`textInput${e.target.value}`);
            if (соответствующийВвод) соответствующийВвод.disabled = false;
        });
    });
    document.querySelector('form').addEventListener("submit", function(e) {
        e.preventDefault();
        let выбранныйПереключатель = document.querySelector('input[name="переключатель"]:checked');
        if (выбранныйПереключатель) {
            let значениеТекста = выбранныйПереключатель.value !== "5" ? document.getElementById(`textInput${выбранныйПереключатель.value}`).value : '';
            switch (выбранныйПереключатель.value) {
                case "1":
                    // Добавить элемент в конец списка
                    let новыйЭлемент = document.createElement("li");
                    новыйЭлемент.textContent = значениеТекста;
                    списокПоле.appendChild(новыйЭлемент);
                    break;
                case "2":
                    // Вставить элемент списка ниже того элемента, где курсор
                    insertAtCaret(значениеТекста);
                    break;
                case "3":
                    // Изменить текст элемента списка на позиции курсора
                    changeAtCaret(значениеТекста);
                    break;
                case "4":
                    // Добавить вложенный список за курсором
                    addNestedListAtCaret(значениеТекста);
                    break;
                case "5":
                    // Удалить элемент списка на позиции курсора
                    deleteAtCaret();
                    break;
            }
            if (выбранныйПереключатель.value !== "5") {
                document.getElementById(`textInput${выбранныйПереключатель.value}`).value = "";
                document.getElementById(`textInput${выбранныйПереключатель.value}`).disabled = true;
            }
        } else {
            alert("Пожалуйста, выберите опцию.");
        }
    });
    function insertAtCaret(text) {
        const range = window.getSelection().getRangeAt(0);
        const parentLI = range.startContainer.parentElement.closest("li");
        if (parentLI) {
            const newElement = document.createElement("li");
            newElement.textContent = text;
            if (parentLI.nextSibling) {
                parentLI.parentNode.insertBefore(newElement, parentLI.nextSibling);
            } else {
                parentLI.parentNode.appendChild(newElement);
            }
        }
    }
    function changeAtCaret(text) {
        const range = window.getSelection().getRangeAt(0);
        const parentElement = range.startContainer.parentElement;
        if (parentElement.tagName === "LI") {
            parentElement.textContent = text;
        }
    }
    function addNestedListAtCaret(text) {
        const range = window.getSelection().getRangeAt(0);
        const parentElement = range.startContainer.parentElement;
        if (parentElement.tagName === "LI") {
            const nestedList = document.createElement("ul");
            const newElement = document.createElement("li");
            newElement.textContent = text;
            nestedList.appendChild(newElement);
            parentElement.insertAdjacentElement('afterend', nestedList);
        }
    }
    function deleteAtCaret() {
        const range = window.getSelection().getRangeAt(0);
        const parentElement = range.startContainer.parentElement;
        if (parentElement.tagName === "LI") {
            parentElement.remove();
        }
    }
});


