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
        currentTasks = localStorage.getItem(name) ? localStorage.getItem(name) + ';' : ''
        localStorage.setItem(name, currentTasks + task)
    }

    function getFromLocalStorage(name) {
        currentTasks = localStorage.getItem(name) ? localStorage.getItem(name).split(';') : []
        return currentTasks
    }

    function removeFromeLocalStorage(name, newTasks) {
        localStorage.removeItem(name)
        localStorage.setItem(name, newTasks)
    }

    function addTask(task, parent, mainParentId) {
        currentItem = createToDoItem(task)

        currentItem.doneButton.addEventListener('click', () => {
            currentItem.item.classList.toggle('list-group-item-success')
        })
        currentItem.deleteButton.addEventListener('click', () => {
            if (confirm('do you want remove this task?')) {
                removeFromeLocalStorage(mainParentId, getFromLocalStorage(mainParentId).filter((item) => {
                    return item !== task
                }).join(';'))
                updateTasks(parent, mainParentId)
            }
        })

        parent.append(currentItem.item)
    }

    function updateTasks(parent, mainParentId) {
        parent.innerHTML = ''
        tasks = getFromLocalStorage(mainParentId)
        if (tasks.length !== 0) {
            for (let task in tasks) {
                addTask(tasks[task], parent, mainParentId)
                console.log('i work', task, tasks)
            }
        }
    }

    function createToDo(parentId, name) {
        let container = document.getElementById(parentId)

        appTitle = createAppTitle(name)
        toDoItemForm = createToDoItemForm()
        toDoList = createToDoList()

        container.append(appTitle)
        container.append(appTitle, toDoItemForm.form, toDoList)

        toDoItemForm.form.addEventListener('submit', (e) => {
            e.preventDefault()

            if (!toDoItemForm.input.value) {
                return
            }

            addToLocalStorage(parentId, toDoItemForm.input.value)

            addTask(toDoItemForm.input.value, toDoList, parentId)

            toDoItemForm.input.value = ''
        })
        updateTasks(toDoList, parentId)
    }

    window.createToDo = createToDo

})()