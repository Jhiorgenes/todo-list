const inputElement = document.getElementById('inputTask')
const buttonElement = document.getElementById('button-send')
const taskAreaElement = document.querySelector('.task-area')
const errorElement = document.querySelector('.error-area')

function createTask() {
  const task = inputElement.value.trim()
  if (task === '') {
    return
  }

  // creating new div for a each task
  const newTaskItem = document.createElement('div')
  const newTaskText = document.createElement('p')
  const newTaskIcon = document.createElement('img')

  // Adding values to each task
  newTaskItem.classList.add('task-item')
  newTaskText.textContent = task
  newTaskIcon.src = './x.svg'

  // Providing children with full values
  newTaskItem.appendChild(newTaskText)
  newTaskItem.appendChild(newTaskIcon)
  taskAreaElement.appendChild(newTaskItem)

  newTaskItem.addEventListener('click', () => handleDoneTask(newTaskText))
  newTaskIcon.addEventListener('click', () =>
    handleDeleteTask(newTaskItem, newTaskText)
  )

  inputElement.value = ''
  updateLocalStorage()
}

buttonElement.addEventListener('click', createTask)
inputElement.addEventListener('keyup', e => {
  if (e.code === 'Enter') {
    createTask()
  }
})

// if I click on the div of the newTaskItem, and the "p" of the NodeList is equal to the "p" of the newTaskItem, it does a toggle in css class "done"

const handleDoneTask = newTaskText => {
  const taskItem = taskAreaElement.childNodes

  for (const task of taskItem) {
    if (task.firstChild.isSameNode(newTaskText)) {
      task.classList.toggle('done')
    }
  }

  updateLocalStorage()
}

// if I click on the delete button, and the "p" of the NodeList is equal to the "p" of the newTaskItem, it removes that newTask item
const handleDeleteTask = (newTaskItem, newTaskText) => {
  const taskItem = taskAreaElement.childNodes

  for (const task of taskItem) {
    if (task.firstChild.isSameNode(newTaskText)) {
      newTaskItem.remove()
    }
  }
  updateLocalStorage()
}

const updateLocalStorage = () => {
  const taskItem = taskAreaElement.childNodes

  const localStorageTaskitem = [...taskItem].map(item => {
    const taskText = item.firstChild.textContent
    const isDone = item.classList.contains('done')
    return { description: taskText, done: isDone }
  })

  localStorage.setItem('task', JSON.stringify(localStorageTaskitem))
}

const getLocalStorageTaskitem = () => {
  const localStorageTaskitem = JSON.parse(localStorage.getItem('task'))
  if (!localStorageTaskitem) return

  for (const task of localStorageTaskitem) {
    const newTaskItem = document.createElement('div')
    const newTaskText = document.createElement('p')
    const newTaskIcon = document.createElement('img')

    // Adding the values ​​inside these divs
    newTaskItem.classList.add('task-item')
    newTaskText.textContent = task.description

    if (task.done) {
      newTaskItem.classList.add('done')
    }

    newTaskIcon.src = './x.svg'

    // Providing children with full values
    newTaskItem.appendChild(newTaskText)
    newTaskItem.appendChild(newTaskIcon)
    taskAreaElement.appendChild(newTaskItem)

    newTaskItem.addEventListener('click', () => handleDoneTask(newTaskText))
    newTaskIcon.addEventListener('click', () =>
      handleDeleteTask(newTaskItem, newTaskText)
    )
  }
}

getLocalStorageTaskitem()
