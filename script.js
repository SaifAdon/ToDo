

const container=document.querySelector(".container");
const todoForm=document.querySelector(".inputform");
const inputField=todoForm.querySelector(".todoinput");
const btn=todoForm.querySelector(".btn");
const todoUList=document.getElementById("lists");
const messageElement=document.getElementById("message");

const addTodo= (event)=>{
      event.preventDefault();
      const todoValue=inputField.value;

    //uniqueid
    const todoId=Date.now().toString(); 
    createTodo(todoId,todoValue);
}
const createTodo=(todoId,todoValue)=>{
    const createtodolist=document.createElement("li");
    createtodolist.id=todoId;
    createtodolist.classList.add("li-style");
    createtodolist.innerHTML=`<span> ${todoValue}</span> 
    <span><button id="deleteButton"><i class="fa fa-trash"></i></button></span>`;
    todoUList.appendChild(createtodolist);
    showMessage("to do is added","success");
    const deletebtn=createtodolist.querySelector("#deleteButton");
    deletebtn.addEventListener("click",deletetodo);

    //adding todo to local storage

    const todos=getTodos();
    todos.push({todoId,todoValue});
    localStorage.setItem("mytodos",JSON.stringify(todos));
}
const showMessage=(text,status)=>{
    messageElement.innerHTML=text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() => {
        messageElement.textContent="";
        messageElement.classList.remove(`bg-${status}`);
    }, 1000);
}
const getTodos = ()=>{
    return localStorage.getItem("mytodos")?JSON.parse(localStorage.getItem("mytodos")):[];
}

const deletetodo=(event)=>{
    const selectTodo=event.target.parentElement.parentElement.parentElement;
    todoUList.removeChild(selectTodo);
    showMessage("todo is deleted","denger");
    let todostodeletefromlocal=getTodos();
    todostodeletefromlocal=todostodeletefromlocal.filter((todo)=>todo.todoId!==selectTodo.id);
    localStorage.setItem("mytodos",JSON.stringify(todostodeletefromlocal));
}
const loadtodos=()=>{
    const todos=getTodos();
    todos.map((todo)=>createTodo(todo.todoId,todo.todoValue));
}
//adding listener
todoForm.addEventListener("submit",addTodo);
window.addEventListener("DOMContentLoaded",loadtodos);