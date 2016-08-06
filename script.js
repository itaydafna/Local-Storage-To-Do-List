/*
 Ex. todoList

 On each todo value change, `todoHandler` is called
 On page load, `initTodos` is called
 When "Clear All" is clicked, `clearHandler` is called

 Requirements:
 - Save the todo's values using localStorage
 - If there is previous data saved, setup the todo elements with that data (use `initTodos`)
 - Make sure to check if `localStorage` is available for use (Modernizr is loaded)
 - Pressing `clear` should remove all todos (UI and localStorage)

 Hint:
 - Use only 1 key (`todosKey`)
 - Serielize the data using `JSON.stringify()`
 - Parse the data with `JSON.parse()`
 */

/* globals UTILS, Modernizr */
(function () {
    var todos = UTILS.qs('.todos'),
        clearBtn = UTILS.qs('#clearBtn'),
        initTodos,
        todoHandler,
        clearHandler,
        todosKey = 'todos',

        //I added these two vars (Itay)
        todosObj = localStorage.getItem(todosKey)?JSON.parse(localStorage.getItem(todosKey)):{},
        todosStorageIndex = 0;

    for (var key in todosObj){
        todosStorageIndex++;
    }


    // Setup the todos if there is data saved in localStorage
    initTodos = function () {
        // todosObj = localStorage.getItem(todosKey)?JSON.parse(localStorage.getItem(todosKey)):{};
        for (var key in todosObj){
            var li = document.createElement("li");
            li.setAttribute("contenteditable", "true");
            li.textContent = todosObj[key];
            todos.insertBefore(li,todos.querySelector("li:last-child"));

        }

    };

    // On each todo text change
        todoHandler = function (todo) {
        var todoVal = todo.textContent;
        todosObj[todosStorageIndex+1] = todoVal;
        localStorage.setItem(todosKey,JSON.stringify(todosObj));
        console.log(JSON.stringify(todosObj));
        todosStorageIndex++;

    };

    // Handle clear button
    clearHandler = function () {

        var lisToDelete = todos.querySelectorAll("li:not(:last-child)");
        lisToDelete.forEach(function(x){
            x.className = "delete";
            x.parentNode.removeChild(x.parentNode.querySelector(".delete"));
        })

        localStorage.clear();
        todosObj = {};
        todosStorageIndex = 0;

    };

    //-------------------------------------------------
    // Do not touch the code below
    //-------------------------------------------------

    UTILS.addEvent(todos, 'input keydown', function (e) {
        var target = e.target,
            type = e.type,
            keyCode = e.keyCode,
            newTodo;

        if (target.nodeName.toUpperCase() === 'LI') {
            // Handle keys
            if (type.indexOf('keydown') > -1) {
                // Handle Enter key
                if (keyCode === 13 && !e.shiftKey) {
                    e.preventDefault();

                    newTodo = target.cloneNode(true);
                    newTodo.innerHTML = '';
                    todos.appendChild(newTodo);
                    newTodo.focus();

                    todoHandler(target);
                }
            }
        }
    });

    // Handle clear button
    UTILS.addEvent(clearBtn, 'click', clearHandler);

    initTodos();
    // Focus on first todo
    todos.querySelector('.todos li:last-child').focus();
}());
