var formEl = document.querySelector("#create-new-task-form");
var onDeckEl = document.querySelector(".on-deck-list");
var inProgressEl = document.querySelector(".in-progress");
var doneEl = document.querySelector(".done");
var pageContentEl = document.querySelector(".page-content");

var taskIdCounter = 0;

var tasks = [];

// handle form submit

var taskFormHandler = function (event) {
  event.preventDefault();
  var taskInput = document.querySelector(".new-task").value;
  var notesInput = document.querySelector(".notes").value;

  if (!taskInput) {
    alert("You must provide a task");
    return false;
  }

  document.querySelector(".new-task").value = "";
  document.querySelector(".notes").value = "";

  var isEdit = formEl.hasAttribute("data-task-id");

  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskInput, notesInput, taskId);
  } else {
    var taskDataObj = {
      task: taskInput,
      notes: notesInput,
      status: "on deck",
    };
  }

  createTask(taskDataObj);
};

// create task function

var createTask = function (taskDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  var taskEl = document.createElement("div");
  taskEl.className = "task";

  taskEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.task +
    "</h3><span class='task-notes'>" +
    taskDataObj.notes +
    "</span>";

  listItemEl.appendChild(taskEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  switch (taskDataObj.status) {
    case "on deck":
      taskActionsEl.querySelector(
        "select[name='status-change']"
      ).selectedIndex = 0;
      onDeckEl.append(listItemEl);
      break;
    case "in progress":
      taskActionsEl.querySelector(
        "select[name='status-change']"
      ).selectedIndex = 1;
      inProgressEl.append(listItemEl);
      break;
    case "done":
      taskActionsEl.querySelector(
        "select[name='status-change']"
      ).selectedIndex = 2;
      doneEl.append(listItemEl);
      break;
    default:
      console.log("Something went wrong!");
  }

  taskDataObj.id = taskIdCounter;

  tasks.push(taskDataObj);

  taskIdCounter++;
};

// create task actions

var createTaskActions = function (taskId) {
  var actionaContainerEl = document.createElement("div");
  actionaContainerEl.className = "task-actions";

  // edit task button
  var editTaskBtn = document.createElement("button");
  editTaskBtn.textContent = "EDIT";
  editTaskBtn.className = "btn edit-btn";
  editTaskBtn.setAttribute("data-task-id", taskId);
  actionaContainerEl.appendChild(editTaskBtn);

  // delete task button
  var deleteTaskBtn = document.createElement("button");
  deleteTaskBtn.textContent = "DELETE";
  deleteTaskBtn.className = "btn delete-btn";
  deleteTaskBtn.setAttribute("data-task-id", taskId);
  actionaContainerEl.appendChild(deleteTaskBtn);

  // change status dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";
  actionaContainerEl.appendChild(statusSelectEl);
  // create status options
  var statusChoices = ["On Deck", "In Progress", "Done"];

  for (var i = 0; i < statusChoices.length; i++) {
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];

    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionaContainerEl;
};

// handle edit/delete button events
var taskActionHandler = function (e) {
  var targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    console.log("edit", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } else if (targetEl.matches(".delete-btn")) {
    console.log("delete", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

// edit task
var editTask = function (taskId) {
  console.log(taskId);

  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  var notes = taskSelected.querySelector("span.task-notes").textContent;
  console.log(notes);

  document.querySelector("input[name='new-task']").value = taskName;
  document.querySelector("input[name='notes']").value = notes;

  formEl.setAttribute("data-task-id", taskId);
  formEl.querySelector("#add-task-btn").textContent = "Save Task";
};

// complete edit

var completeEditTask = function (taskInput, notesInput, taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  taskSelected.querySelector("h3.task-name").textContent = taskInput;
  taskSelected.querySelector("span.task-notes").value = notesInput;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskInput;
      tasks[i].notes = notesInput;
    }
  }

  alert("Task Updated!");

  formEl.removeAttribute("data-task-id");
  formEl.querySelector("#add-task-btn").textContent = "Add Task";
  saveTasks();
};

// delete task
var deleteTask = function (taskId) {
  console.log(taskId);

  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();

  var updatedTaskArr = [];

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  tasks = updatedTaskArr;
  saveTasks();
};

// handle task status change

var taskStatusChangeHandler = function (event) {
  var taskId = event.target.getAttribute("data-task-id");

  var statusValue = event.target.value.toLowerCase();

  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  if (statusValue === "on deck") {
    onDeckEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    inProgressEl.appendChild(taskSelected);
  } else if (statusValue === "done") {
    doneEl.appendChild(taskSelected);
  }
};

// add task

formEl.addEventListener("submit", taskFormHandler);

// edit delete

pageContentEl.addEventListener("click", taskActionHandler);

// change status

pageContentEl.addEventListener("change", taskStatusChangeHandler);
