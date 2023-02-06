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

    function createToDoItem(name){
        let item = document.createElement('li')
        let buttonGroup = document.createElement('div')
        let doneButton = document.createElement('button')
        let deleteButton = document.createElement('button')

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center')
        item.textContent = name
        buttonGroup.classList.add('btn-group', 'btn-group-sm')
        doneButton.classList.add('btn', 'btn-success')
        doneButton.textContent = 'done'
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'delete'

        buttonGroup.append(doneButton, deleteButton)
        item.append(buttonGroup)

        return {
            item,
            doneButton,
            deleteButton
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

        toDoItemForm.form.addEventListener('submit', (e) => {
            e.preventDefault()

            if(!toDoItemForm.input.value){
                return
            }

            currentItem = createToDoItem(toDoItemForm.input.value)

            currentItem.doneButton.addEventListener('click', ()=>{
                currentItem.item.classList.toggle('list-group-item-success')
            })
            currentItem.deleteButton.addEventListener('click', ()=>{
                if(confirm('do you want remove this task?')){
                    currentItem.item.remove()
                }
            })

            toDoList.append(currentItem.item)

            toDoItemForm.input.value = ''
        })
    })
})()