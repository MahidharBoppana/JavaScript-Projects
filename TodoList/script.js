document.addEventListener("DOMContentLoaded", () => {

const inputTask = document.getElementById("inputTask");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach(task => renderTasks(task));

addTask.addEventListener("click", () => {
    const taskText = inputTask.value.trim();

    if (taskText === "") return;
    
    const newTask = {
        Id : Date.now(),
        task : taskText,
        completed : false,
    };
    
    tasks.push(newTask);
    saveTasks()
    renderTasks(newTask)
    inputTask.value = "";  
    console.log(tasks)  
});

function renderTasks(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.Id);
    li.innerHTML = `<span>${task.task}</span>
    <button>x</button>`;
     if (task.completed) {
        li.classList.add("completed");
    }
    li.addEventListener("click", (e) => {
        if(e.target.tagName === "SPAN") return;
        task.completed = !task.completed;
        li.classList.toggle("completed");
        saveTasks()
    });

    li.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
       tasks = tasks.filter(t => t.Id !== task.Id);
        li.remove();
        saveTasks();
    })
    taskList.appendChild(li);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
})