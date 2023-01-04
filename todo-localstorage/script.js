/* 
    TODO: remove code repetition  
    TODO: add validation
    TODO: style the list
    TODO: Edit should change the an EDIT button into SAVE 
    TODO: use modules!
*/

const localStorageKeyName = 'todos-1324-9876'

window.addEventListener('load', () => {
    /* read localStorage */
    const todoFormElement = document.querySelector('#add-todo-form');
    
    /* Retrieve list from LocalStorage and display it */
    todos = JSON.parse(localStorage.getItem(localStorageKeyName)) || [];
    DisplayTodoList();
    
    todoFormElement.addEventListener('submit', e => {
        e.preventDefault();
    
        const newTodo = {
            content: e.target.elements.content.value,
            done: false,
            createdAt: new Date().getTime()
        }

        // TODO: add validation before storing new todoItem

        // store new todo
        todos = [...todos, newTodo];

        // update LocalStorage
        localStorage.setItem(localStorageKeyName, JSON.stringify(todos));

        // Reset the form
        e.target.reset();

        DisplayTodoList();
    })

    function DisplayTodoList () {
        const todoList = document.querySelector('#todo-list');

        // delete list before displaying it from localStorage
        todoList.replaceChildren();
        
        todos.forEach(todo => {
            // create the todo item
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item')
    
            // create the todo item's children elements
            
            // done checkbox
            const inputDone = document.createElement('input');
            inputDone.type = 'checkbox';
            inputDone.checked = todo.done;

            // input with text content
            const inputContent = document.createElement('input');
            inputContent.type = 'text';
            inputContent.setAttribute('readonly', true);
            inputContent.value = todo.content;

            // actions-toolbar
            const itemActions = document.createElement('div');
            itemActions.classList.add('item-actions');
            const editButton = document.createElement('button');
            editButton.classList.add('edit-button');
            editButton.textContent = 'Edit';
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');

            // assemble actions-toolbar
            itemActions.append(editButton, deleteButton);

            // assemble todoItem
            todoItem.append(inputDone, inputContent, itemActions);

            // show todoItem 
            todoList.append(todoItem);

            if (todo.done) {
                todoItem.classList.add('done');
            } 

            inputDone.addEventListener('change', (e) => {
                todo.done = e.target.checked;
                localStorage.setItem(localStorageKeyName, JSON.stringify(todos));

                todoItem.classList.toggle('done');
                
                /* if (todo.done) {
                    todoItem.classList.add('done');
                } else {
                    todoItem.classList.remove('done');
                } */
            })



            editButton.addEventListener('click', (e) => {
                inputContent.removeAttribute('readonly');
                inputContent.focus();
                
                inputContent.addEventListener('blur', (e) => {
                    inputContent.setAttribute('readonly', true);
                    todo.content = e.target.value;
                    localStorage.setItem(localStorageKeyName, JSON.stringify(todos));
                    DisplayTodoList();
                })
            })

            deleteButton.addEventListener('click', (e) => {
                todos = todos.filter(item => item != todo);
                localStorage.setItem(localStorageKeyName, JSON.stringify(todos));
                DisplayTodoList();
            })

        })
        

    }
})


