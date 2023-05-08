var toDoListApp = (function () {
  let tasks = [];
  const taskList = document.getElementById("list");
  const addTaskInput = document.getElementById("add");
  const tasksCounter = document.getElementById("tasks-counter");

//   console.log("Working");
var a = 10;

  async function fetchTodo() {
    // get request

    // fetch('https://jsonplaceholder.typicode.com/todos')

    // .then(function(response){
    //   // console.log(response);
    //   return response.json()
    // }).then(function(data){
    //   // console.log(data);
    //   tasks=data.slice(10,20)
    //   renderList()
    // })
    // .catch(function(error){
    //   console.log('error',error);
    // })

    // use async await

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      tasks = data.slice(10, 20);
      renderList();
    } catch (error) {
      console.log(Error);
    }
  }

  function addTaskToDOM(task) {
    const li = document.createElement("li");

    li.innerHTML = ` 
       <input type="checkbox" id="${task.id}"  ${
      task.completed ? "checked" : ""
    } data-id="${task.id}" class="custom-checkbox">
       <label for="${task.id}">${task.title}</label>
       <img src="delete.png" class="delete" data-id="${task.id}" />
    
       `;

    taskList.append(li);
  }

  function renderList() {
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
      addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
  }

  function ToggleTask(taskId) {
    const task = tasks.filter(function (task) {
      return task.id === Number(taskId);
    });
    if (task.length > 0) {
      const currentTask = task[0];

      currentTask.completed = !currentTask.completed;
      renderList();
      showNotification("Task toggle Sucessfully");
      return;
    }
    showNotification("Could not the toggle Task");
  }

  function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
      return task.id !== Number(taskId);
    });

    tasks = newTasks;
    renderList();
    showNotification("Task delated Sucessfully");
  }

  function addTask(task) {
    if (task) {
      // fetch("https://jsonplaceholder.typicode.com/todos", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(task),
      // })
      //   .then(function (data) {
      //     console.log(data);
      //     tasks.push(task);
      //     renderList();
      //     showNotification("Task added Sucessfully");
      //   })
      //   .catch(function (error) {
      //     console.log("error", error);
      //   });

      tasks.push(task);
      renderList();
      showNotification("Task added Sucessfully");
      return;
    }
    showNotification("Task can not be added");
  }

  function showNotification(text) {
    alert(text);
    return;
  }

  function handleInputKeyPress(e) {
    if (e.key === "Enter") {
      const text = e.target.value;
      // console.log('text',text);   is there an issue for declare var
      if (!text) {
        showNotification("Test text can not be empty");
        return;
      }

      const task = {
        title: text,
        id: Date.now(),
        completed: false,
      };

      e.target.value = "";
      addTask(task);
    }
  }

  function handleClickListener(e) {
    const target = e.target;
    // console.log(target);
    if (target.className === "delete") {
      const taskId = target.dataset.id;
      deleteTask(taskId);
      return;
    } else if (target.className === "custom-checkbox") {
      const taskId = target.id;
      ToggleTask(taskId);
      return;
    }
  }

  function initializeApp() {
    fetchTodo();
    addTaskInput.addEventListener("keyup", handleInputKeyPress);
    document.addEventListener("click", handleClickListener);
  }

//   initializeApp();

  return{
    initialize: initializeApp,
    a:a
  }
})();

// var toDoListApp = (function () {
//   return {};
// })();
