var formEl = document.querySelector("#create-new-task-form");
var onDeckEl = document.querySelector(".on-deck-list");

// create task function

var createTask = function (event) {
  event.preventDefault();
  var taskInput = document.querySelector(".new-task").value;
  var notesInput = document.querySelector(".notes").value;

  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  var taskEl = document.createElement("div");
  taskEl.className = "task";

  taskEl.innerHTML =
    "<h3 class='task-name'>" +
    taskInput +
    "</h3><span class='task-notes'>" +
    notesInput +
    "</span>";

  listItemEl.appendChild(taskEl);
  onDeckEl.appendChild(listItemEl);
};

// add task

formEl.addEventListener("submit", createTask);
