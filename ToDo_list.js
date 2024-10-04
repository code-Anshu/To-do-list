// To-Do List using localStorage 

// Load to-do list from localStorage when page loads
document.addEventListener('DOMContentLoaded', loadTodos);

const date = document.getElementById('date');
date.innerText = Date().substring(3,15);

const addBtn = document.getElementById('add-task');

const inputBox = document.getElementById('task');

addBtn.addEventListener("click",()=>{
    if(inputBox.value == "")
    {
        alert("Enter a task!");
        return;
    }
    addTask();
    inputBox.value = "";
});


inputBox.addEventListener("keydown", (e)=>{
    if(e.key === 'Enter')
    {
        if(inputBox.value == "")
        {
            alert("Enter a task!");
            return;
        }
        addTask();
        inputBox.value = "";
    }
});

function getRandomLightColor() 
{
    // For colors :  // Ensure the colors are light by keeping the RGB values between 150 and 255
    const red = Math.floor(Math.random() * 106) + 150;
    const blue = Math.floor(Math.random() * 106) + 150;
    const green = Math.floor(Math.random() * 106) + 150;

    // Generate a random alpha between 0.5 and 1 for light transparency
    const alpha = (Math.random() * 0.5) + 0.5;  // Alpha between 0.5 and 1;

    return  `rgba(${red}, ${blue}, ${green}, ${alpha})`;
}

// Function to load todos from localStorage
function loadTodos() 
{
    const todos = JSON.parse(localStorage.getItem('to-do')) || [];
    const todoListPlanner = document.getElementById('planner');
    todoListPlanner.innerHTML = '';  // Clear the current list

    todos.forEach((todoItem, index) => {
        const { task, completed } = todoItem;
        const todoElement = createTodoElement(task, index, completed);
        todoElement.style.backgroundColor = getRandomLightColor();
        todoListPlanner.appendChild(todoElement);
    });
}

// Function to add a new todo
function addTask() 
{
    const inputBox = document.getElementById('task');
    const newTodo = inputBox.value.trim();

    const todos = JSON.parse(localStorage.getItem('to-do')) || [];
    const newTask = { task: newTodo, completed: false };
    // console.log("Todos = ", todos);
    todos.push(newTask);
    localStorage.setItem('to-do', JSON.stringify(todos));

    // Add the new item to the UI
    const todoList = document.getElementById('planner');
    const todoItem = createTodoElement(newTodo, todos.length - 1, false);
    todoItem.style.backgroundColor = getRandomLightColor(); // Set random color for the new task
    todoList.appendChild(todoItem);

    // Clear the input field
    inputBox.value = '';
}

// Function to create a todo element
function createTodoElement(value, index, completed) 
{
    const div = document.createElement('div');
    div.classList.add('entry');
    div.innerHTML= `   <label>
            <input type="checkbox" id="to-do-task-${index}" name="to-do-task" ${completed ? 'checked' : ''}>
            <span class="${completed ? 'completed' : ''}">${value}</span>
        </label>`;

    const checkbox = div.querySelector(`#to-do-task-${index}`);
    checkbox.addEventListener('change', () => toggleCompletion(index));

    const divControls = document.createElement('div');
    divControls.classList.add('control-btn');

    const editButton = document.createElement('button');
    editButton.textContent = '✎ Edit';
    editButton.className = 'edit-btn';
    editButton.onclick = () => editTodo(index);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = () => deleteTodo(index);

    divControls.appendChild(editButton);
    divControls.appendChild(deleteButton);

    div.appendChild(divControls);

    return div;
}

// Function to toggle the completion of a todo
function toggleCompletion(index) 
{
    const todos = JSON.parse(localStorage.getItem('to-do')) || [];
    todos[index].completed = !todos[index].completed;  // Toggle the completed status
    localStorage.setItem('to-do', JSON.stringify(todos));
    loadTodos();  // Reload the list to update the UI
}

// Function to edit a todo
function editTodo(index) 
{
    const todos = JSON.parse(localStorage.getItem('to-do')) || [];
    const newTask = prompt('Edit the task', todos[index].task);

    if (newTask !== null && newTask.trim() !== '') {
        todos[index].task = newTask;
        localStorage.setItem('to-do', JSON.stringify(todos));
        loadTodos();  // Reload the list
    }
}

// Function to delete a todo
function deleteTodo(index) 
{
    const todos = JSON.parse(localStorage.getItem('to-do')) || [];
    todos.splice(index, 1);  // Remove the todo item
    localStorage.setItem('to-do', JSON.stringify(todos));
    loadTodos();  // Reload the list
}