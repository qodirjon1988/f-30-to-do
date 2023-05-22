const addTitle = document.getElementById("addTitle");
const titleInput = document.getElementById("titleInput");
const todosWrap = document.getElementById("todosWrap");
const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const editOK = document.getElementById("editOK");
const editCancel = document.getElementById("editCancel");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

const showTodo = () => {
  todosWrap.innerHTML = null;
  localStorage.setItem("todos", JSON.stringify(todos));

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${
      todo.isCompleted ? "<del>" + todo.title + "</del>" : todo.title
    }</strong><span class='btn_wrapper'><button onclick='editTodo(${
      todo.id
    })' style='background-color: #f5d120'><i class="fa-solid fa-pen-to-square"></i></button>
    <button onclick='completeTodo(${
      todo.id
    })' style='background-color: #19fa33'><i class="fa-solid fa-circle-check"></i></button>
    <button onclick='deleteTodo(${
      todo.id
    })' style='background-color: #f54720'><i class="fa-solid fa-trash-can"></i></button></span>`;

    li.className = "list_item";
    todosWrap.appendChild(li);
  });

  titleInput.value = "";
};

showTodo();

const addTodo = () => {
  const todoItem = {
    id: todos.length,
    title: titleInput.value,
    isCompleted: false,
  };
  todos.push(todoItem);
  showTodo();
};

const completeTodo = (id) => {
  todos[id].isCompleted = !todos[id].isCompleted;
  showTodo();
};

const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  showTodo();
};

const editTodo = (id) => {
  editModal.style.display = "block";
  editInput.value = todos[id].title;

  editOK.addEventListener("click", () => {
    todos[id].title = editInput.value;
    editModal.style.display = "none";
    showTodo();
  });

  editCancel.addEventListener("click", () => {
    editModal.style.display = "none";
  });
};
