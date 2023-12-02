import _ from 'lodash';
import './css/style.css';

const ToDoInputName: HTMLInputElement = document.getElementById("ToDoName") as HTMLInputElement;
const ToDoInputBody: HTMLInputElement = document.getElementById("ToDoBody") as HTMLInputElement;
const ToDoSumbit: HTMLButtonElement = document.getElementById("ToDoSumbit") as HTMLButtonElement;
const ToDoDeleteAll: HTMLButtonElement = document.getElementById("ToDoDeleteAll") as HTMLButtonElement;
const container: HTMLDivElement = document.querySelector(".main__taskContainer") as HTMLDivElement;

interface ToDoElement {
  title: string;
  quote: string;
  id: string;
  done: boolean;
}

function createToDoElement({ title, quote, id, done }: ToDoElement): HTMLDivElement {
  const ToDo: HTMLDivElement = document.createElement("div");
  const ToDoNum: string = id;
  ToDo.classList.add("main__tasks", "tasks", ToDoNum);
  ToDo.setAttribute("aria-live", "assertive");
  const ToDoTitle: HTMLHeadingElement = document.createElement("h2");
  ToDoTitle.textContent = title;
  ToDoTitle.classList.add("tasks__title");

  const ToDoQuote: HTMLParagraphElement = document.createElement("p");
  ToDoQuote.textContent = quote;
  ToDoQuote.classList.add("tasks__quote");

  const ToDoDelete: HTMLButtonElement = document.createElement("button");
  ToDoDelete.textContent = "Удалить заметку";
  ToDoDelete.classList.add("tasks__delete");

  const ToDoDone: HTMLButtonElement = document.createElement("button");
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
    } catch (error) {
      const errorH2: HTMLHeadingElement = document.createElement("h2");
      errorH2.textContent = "Ошибка ваше локальное хранилище не работает";
      container.appendChild(errorH2);
      console.log(error);
    }

    refresh();
  });

  return ToDo;
}

ToDoSumbit.addEventListener("click", () => {
  const title: string = ToDoInputName.value.trim();
  const quote: string = ToDoInputBody.value.trim();

  if (!title || !quote) {
    ToDoInputBody.classList.add("danger");
    ToDoInputName.classList.add("danger");
    return;
  }

  const randomId: string = Math.random().toString(36).substring(2, 15);
  ToDoInputName.value = "";
  ToDoInputBody.value = "";
  ToDoInputBody.classList.remove("danger");
  ToDoInputName.classList.remove("danger");

  const ToDo: ToDoElement = {
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
  const headerElement: HTMLHeadingElement | null = container.querySelector('h1[role="text"]');
  container.innerHTML = "";
  if (headerElement) {
    container.appendChild(headerElement);
  }

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const ToDoAll: ToDoElement = JSON.parse(localStorage.getItem(key)!);
      container.appendChild(createToDoElement(ToDoAll));
    }
  }
}

document.addEventListener("DOMContentLoaded", refresh);
