"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/style.css");
const ToDoInputName = document.getElementById("ToDoName");
const ToDoInputBody = document.getElementById("ToDoBody");
const ToDoSumbit = document.getElementById("ToDoSumbit");
const ToDoDeleteAll = document.getElementById("ToDoDeleteAll");
const container = document.querySelector(".main__taskContainer");
function createToDoElement({ title, quote, id, done }) {
    const ToDo = document.createElement("div");
    const ToDoNum = id;
    ToDo.classList.add("main__tasks", "tasks", ToDoNum);
    ToDo.setAttribute("aria-live", "assertive");
    const ToDoTitle = document.createElement("h2");
    ToDoTitle.textContent = title;
    ToDoTitle.classList.add("tasks__title");
    const ToDoQuote = document.createElement("p");
    ToDoQuote.textContent = quote;
    ToDoQuote.classList.add("tasks__quote");
    const ToDoDelete = document.createElement("button");
    ToDoDelete.textContent = "Удалить заметку";
    ToDoDelete.classList.add("tasks__delete");
    const ToDoDone = document.createElement("button");
    ToDoDone.textContent = "Сделано";
    ToDoDone.classList.add("tasks__done");
    if (done === true) {
        ToDo.classList.add("tasks__finished");
        ToDoDone.textContent = "Отмена";
    }
    ToDo.appendChild(ToDoTitle);
    ToDo.appendChild(ToDoQuote);
    ToDo.appendChild(ToDoDelete);
    ToDo.appendChild(ToDoDone);
    ToDoDelete.addEventListener("click", () => {
        ToDo.remove();
        localStorage.removeItem(id);
    });
    ToDoDone.addEventListener("click", () => {
        done = !done;
        try {
            localStorage.setItem(id, JSON.stringify({ title, quote, id, done: !done }));
        }
        catch (error) {
            const errorH2 = document.createElement("h2");
            errorH2.textContent = "Ошибка ваше локальное хранилище не работает";
            container.appendChild(errorH2);
            console.log(error);
        }
        refresh();
    });
    return ToDo;
}
ToDoSumbit.addEventListener("click", () => {
    const title = ToDoInputName.value.trim();
    const quote = ToDoInputBody.value.trim();
    if (!title || !quote) {
        ToDoInputBody.classList.add("danger");
        ToDoInputName.classList.add("danger");
        return;
    }
    const randomId = Math.random().toString(36).substring(2, 15);
    ToDoInputName.value = "";
    ToDoInputBody.value = "";
    ToDoInputBody.classList.remove("danger");
    ToDoInputName.classList.remove("danger");
    const ToDo = {
        title: title,
        quote: quote,
        id: randomId,
        done: false,
    };
    localStorage.setItem(ToDo.id, JSON.stringify(ToDo));
    container.appendChild(createToDoElement(ToDo));
});
ToDoDeleteAll.addEventListener("click", () => {
    localStorage.clear();
    refresh();
});
function refresh() {
    const headerElement = container.querySelector('h1[role="text"]');
    container.innerHTML = "";
    if (headerElement) {
        container.appendChild(headerElement);
    }
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const ToDoAll = JSON.parse(localStorage.getItem(key));
            container.appendChild(createToDoElement(ToDoAll));
        }
    }
}
document.addEventListener("DOMContentLoaded", refresh);
