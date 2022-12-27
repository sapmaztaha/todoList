// ! ELEMENTLERİ SEÇİM ALANI

const form           = document.querySelector("#todo-form");
const todoInput      = document.querySelector("#todo");
const todoList       = document.querySelectorAll(".list-group");
const firstCardBody  = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter         = document.querySelector("#filter");
const clearButton    = document.querySelector("#clear-todos");


eventListener();

function eventListener()  // * Tüm Evenetler
{
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos)
}



function clearAllTodos(e)
{
    if(confirm("Todoların tamamı silinsim mi ? "))
    {
        while(todoList.firsElementChild != null)
        {
            todoList.removeChild(todoList.firsElementChild);
        }
    }

    localStorage.removeItem("todos")

    window.location.reload()
    
}




function filterTodos(e)
{
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem)
    {
        const text = listItem.textContent.toLocaleLowerCase();

        if(text.indexOf(filterValue) === -1)
        {
            listItem.setAttribute("style","display : none !important")
        }
        else
        {
            listItem.setAttribute("style","display : block ")
        }
    });

    
}

function deleteTodo(e)
{
    if (e.target.className === "fa fa-remove")
    {
        e.target.parentElement.parentElement.remove();
        delteTodoFromStroage(e.target.parentElement.parentElement.textContent);
        showAlert("warning","Todo Silindi")
    }
}

function delteTodoFromStroage(deleteTodo)
{
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index)
    {
        if(todo === deleteTodo)
        {
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosUI()
{
    let todos = getTodosFromStorage();

    // todos.forEach(function todo() 
    // {
    //     addTodoToUI(todo)
    // })
    todos.forEach(todo => addTodoToUI(todo));
}

function addTodo(e)
{
    const newTodo = todoInput.value.trim();

    if (newTodo === "")
    {   
        /*
            <div class="alert alert-danger" role="alert">
                        <strong>Yapılacak İş Girilmedi</strong>
                    </div>
        */
        showAlert("danger","Lütfen bir Todo Girin");
    }
    else
    {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","ToDo Eklendi")
    }
    
    e.preventDefault();
}

// ? Todo To Local Storage

function getTodosFromStorage()   // * localstorage den eklediğimiz todoları çekme
{
    let todos;

    if (localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}
function addTodoToStorage(newTodo)
{
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}


// ? Hata Mesajı

function showAlert(type,message)
{
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // ? settimeOut  (aloşturduğumuz hata mesajını belirttiğimiz süre sonra silmek için)

    setTimeout
    (
        function ()
        {
            alert.remove();    
        },
        1200
    )


}


function addTodoToUI(newTodo)
{
    /*
        <li class="list-group-item d-flex justify-content-between">
            Todo 1
            <a href = "#" class ="delete-item">
                <i class = "fa fa-remove"></i>
            </a>
        </li>
    */

    // ? Liste Item Oluşturma (<li>)

    const listItem = document.createElement("li");
    

    // ? Link Oluşturma (<a>)

    const link = document.createElement("a");
    link.setAttribute = "href","#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    // ? Text Node Ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // ? Todo Liste List Iteme Ekleme  (oluşturduğumuz <li> elementini <ul> içersine ekleme)

    // todoList.appendChild(listItem); // * hata (todo liste ekle derken nereye ekleneceğini belitmke gerekir (yorumum hatalıysa düzeltin))

    // * hatasız şekli 

    todoList[0].appendChild(listItem);

    
    /*
    if (todoInput.value === "")
    {

    }
    else
    {
        todoList.forEach(function(list) {  // * Alternatif olarak
            list.appendChild(listItem);   // *
        });
    }
*/
    todoInput.value = "";  // Ekleme Yaptıktan sonra inputu temizlemek için
    


    

}