const ToDoInputName = document.getElementById("ToDoName");
const ToDoInputBody = document.getElementById("ToDoBody");
const ToDoSumbit = document.getElementById("ToDoSumbit");
const ToDoDeleteAll = document.getElementById("ToDoDeleteAll");

const container = document.querySelector(".main__taskContainer");

function createToDoElement({ title, quote, id, done }) {
  const ToDo = document.createElement("div");
  const ToDoNum = id;
  ToDo.classList.add("main__tasks", "tasks", ToDoNum);

  const ToDoTitle = document.createElement("h2");
  ToDoTitle.textContent = title;
  ToDoTitle.classList.add("tasks__title");

  const ToDoQuote = document.createElement("p");
  ToDoQuote.textContent = quote;
  ToDoQuote.classList.add("tasks__quote");

  const ToDoDelete = document.createElement("button");
  ToDoDelete.textContent = "Удалить заметку";
  ToDoDelete.classList.add("tasks__delete");

  const ToDoDone = document.createElement("button")
  ToDoDone.textContent = "Сделано"
  ToDoDone.classList.add("tasks__done")
  if(done == true)
  {
    ToDo.classList.add("tasks__finished")
    ToDoDone.textContent = "Отмена"
  }
  ToDo.appendChild(ToDoTitle);
  ToDo.appendChild(ToDoQuote);
  ToDo.appendChild(ToDoDelete);
  ToDo.appendChild(ToDoDone)
  ToDoDelete.addEventListener("click", () => {
    ToDo.remove();
    localStorage.removeItem(id);
  });
  ToDoDone.addEventListener("click",()=>
  {
    ToDo.done = !done
    localStorage.setItem(id, JSON.stringify({title,quote,id,done:!done}))
    refresh();
  })
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
    done: false
  };

  localStorage.setItem(ToDo.id, JSON.stringify(ToDo));
  container.appendChild(createToDoElement(ToDo));
});

ToDoDeleteAll.addEventListener("click", () => {
  localStorage.clear();
  container.innerHTML = "";
});


function refresh() {
  container.innerHTML = ''; // Clear the container

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const ToDoAll = JSON.parse(localStorage.getItem(key));
      container.appendChild(createToDoElement(ToDoAll));
    }
  }
}

// ... (your existing code)

document.addEventListener("DOMContentLoaded", refresh);