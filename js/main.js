(function () {
    function createAppTitle(title) {
        let appTitle = document.createElement('h2')
        appTitle.innerHTML = title
        return appTitle
    }

    function createToDoItemForm() {
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

    function createToDoItem(name) {
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

    function createToDoList() {
        let list = document.createElement('ul')
        list.classList.add('list-group')
        return list
    }

    function addToLocalStorage(name, task) {
        currentTasks = localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : []
        localStorage.setItem(name, JSON.stringify(currentTasks.concat([task])))
    }

    function getFromLocalStorage(name) {
        currentTasks = localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : []
        return currentTasks
    }

    function removeFromeLocalStorage(name, newTasks) {
        localStorage.removeItem(name)
        localStorage.setItem(name, JSON.stringify(newTasks))
    }

    function addTask(task, parent, toDoWrapperId) {
        currentItem = createToDoItem(task.task)

        currentItem.doneButton.addEventListener('click', () => {
            removeFromeLocalStorage(toDoWrapperId, getFromLocalStorage(toDoWrapperId).map((el) => {
                if (el.id == task.id) {
                    el.done = true
                    return el
                }
                return el
            }))
            updateTasks(parent, toDoWrapperId)
        })
        currentItem.deleteButton.addEventListener('click', () => {
            if (confirm('do you want remove this task?')) {
                removeFromeLocalStorage(toDoWrapperId, getFromLocalStorage(toDoWrapperId).filter((el) => {
                    return el.id !== task.id
                }))
                updateTasks(parent, toDoWrapperId)
            }
        })

        if(task.done){
            currentItem.item.classList.add('list-group-item-success')
        }

        parent.append(currentItem.item)
    }

    function updateTasks(parent, toDoWrapperId) {
        parent.innerHTML = ''
        tasks = getFromLocalStorage(toDoWrapperId)
        if (tasks.length !== 0) {
            for (let task in tasks) {
                addTask(tasks[task], parent, toDoWrapperId)
            }
        }
    }

    function createToDo(toDoWrapperId, name) {
        let container = document.getElementById(toDoWrapperId)

        appTitle = createAppTitle(name)
        toDoItemForm = createToDoItemForm()
        toDoList = createToDoList()

        container.append(appTitle)
        container.append(appTitle, toDoItemForm.form, toDoList)

        toDoItemForm.form.addEventListener('submit', (e) => {
            let id = localStorage.getItem('id') ? Number(localStorage.getItem('id')) + 1 : 1
            localStorage.setItem('id', id)

            e.preventDefault()

            if (!toDoItemForm.input.value) {
                return
            }

            let taskObject = {id: id, done: false, task: toDoItemForm.input.value}

            addToLocalStorage(toDoWrapperId, taskObject)
            addTask(taskObject, toDoList, toDoWrapperId)
            toDoItemForm.input.value = ''
        })
        updateTasks(toDoList, toDoWrapperId)
    }

    window.createToDo = createToDo

})()