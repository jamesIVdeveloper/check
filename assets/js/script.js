var formEl = document.querySelector("#create-new-task-form");
var onDeckEl = document.querySelector(".on-deck-list");

/* create task function */

var createTask = function (event) {
  event.preventDefault();
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = document.querySelector(".new-task").value;

  onDeckEl.appendChild(listItemEl);
};

/* add task */

formEl.addEventListener("submit", createTask);
