(function(){
    function createAppTitle(title){
        let appTitle = document.createElement('h2')
        appTitle.innerHTML = title 
        return appTitle
    }

    function createToDoItemForm(){
        let form = document.createElement('form')
        let input = document.createElement('input')
        let buttonWrapper = document.createElement('div')
        let button = document.createElement('button')

        form.classList.add('input-group', 'mb-3')
        input.classList.add('form-control')
        input.placeholder = 'Enter new task'
        buttonWrapper.classList.add('input-group-append')
        button.classList.add('btn', 'btn-primary')
        button.textContent = 'add task'

        buttonWrapper.append(button)
        form.append(input)
        form.append(buttonWrapper)

        return {
            form,
            input,
            button
        }
    }

    function createToDoList(){
        let list = document.createElement('ul')
        list.classList.add('list-group')
        return list
    }

    document.addEventListener('DOMContentLoaded', ()=>{
        let container = document.getElementById('todo-app')

        appTitle = createAppTitle('ToDoList')
        toDoItemForm = createToDoItemForm()
        toDoList = createToDoList()

        container.append(appTitle)
        container.append(appTitle, toDoItemForm.form, toDoList)
    })
})()