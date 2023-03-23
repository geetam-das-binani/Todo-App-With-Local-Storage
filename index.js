
document.addEventListener('DOMContentLoaded', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const username = localStorage.getItem('username') || '';
    let nameinput = document.getElementById('nameinput');
    let contentinput = document.getElementById('content');


    nameinput.value = username;
    nameinput.addEventListener('change', () => {
        localStorage.setItem('username', nameinput.value)


    })
    let newtodoform = document.getElementById('new-todo-form');
    newtodoform.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!contentinput.value) {
            alert('Please Enter some text');
            return
        }
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
        }
        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));
        e.target.reset();
        Displaytodos();
    })
    Displaytodos();

})

function Displaytodos() {

    let todolist = document.querySelector('#todo-list');

    todolist.innerHTML = '';
    todos.forEach(todo => {
        let { content, category, done } = todo



        let todoitem = document.createElement('div');
        todoitem.classList.add('todo-item');

        let label = document.createElement('label');
        let inputcheckbox = document.createElement('input')
        let span = document.createElement('span');
        let todocontent = document.createElement('div');
        let input = document.createElement('input')
        let actions = document.createElement('div');
        let editbtn = document.createElement('button');
        let deletebtn = document.createElement('button');

        inputcheckbox.type = 'checkbox';
        inputcheckbox.checked = done;
        span.classList.add('bubble');
        if (category == 'personal') {
            span.classList.add('personal');


        }
        else {
            span.classList.add('bubble');

        }
        input.type = 'text';
        input.value = `${content}`

        todocontent.classList.add('todo-content');
        actions.classList.add('actions');
        editbtn.classList.add('edit');
        deletebtn.classList.add('delete');

        editbtn.innerHTML = 'Edit'
        deletebtn.innerHTML = 'Delete';
       

        label.appendChild(inputcheckbox);
        label.appendChild(span);
        todocontent.appendChild(input)
        actions.appendChild(editbtn);
        actions.appendChild(deletebtn);
        todoitem.appendChild(label)
        todoitem.appendChild(todocontent);
        todoitem.appendChild(actions);

        todolist.appendChild(todoitem)
        if (todo.done) {
            todocontent.classList.add('done')
        }
        else {
            todocontent.classList.remove('done')
        }
        input.addEventListener('click', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            Displaytodos();



        })




        editbtn.addEventListener('click', () => {

            let editinput = todocontent.querySelector('input');
            if (editbtn.innerHTML.toLocaleLowerCase() == 'edit') {
                editinput.removeAttribute('readonly');
                editinput.focus();
                editbtn.innerHTML = 'Save';

            }

            editinput.addEventListener('blur', (e) => {
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                editinput.setAttribute('readonly', 'readonly')
                Displaytodos();
                editbtn.innerHTML = 'Edit';


            })



        })
        deletebtn.addEventListener('click', () => {

            todos = todos.filter((y) => y !== todo)

            localStorage.setItem('todos', JSON.stringify(todos));
            Displaytodos();


        })



    })



}












