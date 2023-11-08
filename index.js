const ToDoInputName = document.getElementById("ToDoName");
const ToDoInputBody = document.getElementById("ToDoBody");
const ToDoSumbit = document.getElementById("ToDoSumbit");
const ToDoDeleteAll = document.getElementById("ToDoDeleteAll")

ToDoSumbit.addEventListener("click", () => {
  let title = ToDoInputName.value;
  let quote = ToDoInputBody.value;
  if (!title) {
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
  };

  localStorage.setItem((ToDo.id), JSON.stringify(ToDo));

  createToDo(ToDo);
});

const container = document.querySelector(".main__taskContainer");

const createToDo = ({ title, quote, id }) => {
  const ToDo = document.createElement("div");
  const ToDoNum = id
  ToDo.classList.add("main__tasks", "tasks", ToDoNum);
  const ToDoTitle = document.createElement("h2");
  ToDoTitle.innerHTML = title;
  ToDoTitle.classList.add("tasks__title");
  const ToDoQuote = document.createElement("p");
  ToDoQuote.innerHTML = quote;
  ToDoQuote.classList.add("tasks__quote");
  const ToDoDelete = document.createElement("button");
  ToDoDelete.textContent = "Удалить заметку";
  ToDoDelete.classList.add("tasks__delete");
  container.appendChild(ToDo);
  ToDo.appendChild(ToDoTitle);
  ToDo.appendChild(ToDoQuote);
  ToDo.appendChild(ToDoDelete);

  ToDoDelete.addEventListener("click", () => {
    console.log(id)
  
    ToDo.remove();
    localStorage.removeItem(id)
  });
};
ToDoDeleteAll.addEventListener("click",()=>
{
    localStorage.clear();
    const Lists = document.querySelectorAll(".tasks")
    Lists.forEach((list)=> list.remove())
})

document.addEventListener("DOMContentLoaded", () => {
  const renderToDo = () => {
    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue;
      }
     const ToDoAll = JSON.parse(localStorage.getItem(key))
      console.log(ToDoAll)
     createToDo(ToDoAll)
    }
  };

  renderToDo();
});

