const ToDoInputName = document.getElementById("ToDoName"); // Ввод Заголовка
const ToDoInputBody = document.getElementById("ToDoBody"); // Ввод текста
const ToDoSumbit = document.getElementById("ToDoSumbit"); //Кнопка отправки формы
const ToDoDeleteAll = document.getElementById("ToDoDeleteAll"); //Кнопка удаления всех сообщений

const container = document.querySelector(".main__taskContainer"); //Контейнер сообщений
// !Функция создания элемента
function createToDoElement({ title, quote, id, done }) {    
  const ToDo = document.createElement("div");
  const ToDoNum = id;
  ToDo.classList.add("main__tasks", "tasks", ToDoNum);
  ToDo.setAttribute("aria-live","assertive")
  const ToDoTitle = document.createElement("h2");
  ToDoTitle.textContent = title;
  ToDoTitle.classList.add("tasks__title");

  const ToDoQuote = document.createElement("p");
  ToDoQuote.textContent = quote;
  ToDoQuote.classList.add("tasks__quote");

  const ToDoDelete = document.createElement("button");
  ToDoDelete.textContent = "Удалить заметку";
  ToDoDelete.classList.add("tasks__delete");

 //Проверка на статус "Сделано"
  const ToDoDone = document.createElement("button");
  ToDoDone.textContent = "Сделано";
  ToDoDone.classList.add("tasks__done");
 
  if (done == true) {
    ToDo.classList.add("tasks__finished");
    ToDoDone.textContent = "Отмена";
  }
  //Создание тела ToDo
  ToDo.appendChild(ToDoTitle);
  ToDo.appendChild(ToDoQuote);
  ToDo.appendChild(ToDoDelete);
  ToDo.appendChild(ToDoDone);
  //! Кнопка удаления сообщения
  ToDoDelete.addEventListener("click", () => {

    ToDo.remove();
    localStorage.removeItem(id);
  });
  //! Кнопка смены статуса 
  ToDoDone.addEventListener("click", () => {
    ToDo.done = !done;
    try{
      localStorage.setItem(id, JSON.stringify({ title, quote, id, done: !done }));
    }catch(error)
    {
      const errorH2 = document.createElement("h2")
      errorH2.textContent= "Ошибка ваше локальное хранилище не работает"
      container.appendChild(errorH2)
      console.log(error)
    }

    refresh();
  });
  return ToDo;
}
//! Обработчик кнопки создания сообщения
ToDoSumbit.addEventListener("click", () => {
  const title = ToDoInputName.value.trim();
  const quote = ToDoInputBody.value.trim();
//! Проверка строк
  if (!title || !quote) {
    ToDoInputBody.classList.add("danger");
    ToDoInputName.classList.add("danger");
    return;
  }

  const randomId = Math.random().toString(36).substring(2, 15); // Генерация ID
  ToDoInputName.value = "";
  ToDoInputBody.value = "";
  ToDoInputBody.classList.remove("danger");
  ToDoInputName.classList.remove("danger"); //Если введено все правильно убираем класс danger


  //Объект сообщения
  const ToDo = {
    title: title,
    quote: quote,
    id: randomId,
    done: false,
  };
  //Заносим сообщение в localstorage
  localStorage.setItem(ToDo.id, JSON.stringify(ToDo));
  container.appendChild(createToDoElement(ToDo));
});
//! Удаления всех сообщений
ToDoDeleteAll.addEventListener("click", () => {
  localStorage.clear(); //Отчистка localstorage
  refresh();
});
//! Обновление конейнера 
function refresh() {
  const headerElement = container.querySelector('h1[role="text"]'); // TODO: может поменять это?
  container.innerHTML = ""; // Отчистка контейнера каждый раз при вызове функции
  container.appendChild(headerElement);
  //! Проходимся по всем значениям в localstorage
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const ToDoAll = JSON.parse(localStorage.getItem(key)); //Парсим JSON строку в обьект
      container.appendChild(createToDoElement(ToDoAll)); // Добовляем каждый из них в контейнер
    }
  }
}
//Функцию вызываем только при загрузке всего DOM контента
document.addEventListener("DOMContentLoaded", refresh); 
