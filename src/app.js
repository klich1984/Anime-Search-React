let $d = document

// Select the submit event
$d.getElementById('formTask').addEventListener('submit', saveTask)

// Method Save task
function saveTask(e) {
  let title,
    description

  e.preventDefault()
  title = $d.getElementById('title').value
  description = $d.getElementById('description').value
  // console.log(title, description)
  const task = {
    title,
    description
  }
  // console.log(task)
  // Guardar datos como string en el local storage
  // localStorage.setItem('tasks', JSON.stringify(task))
  // Obtener datos como objeto del local storage
  // listTask = JSON.parse(localStorage.getItem('tasks'))
  // console.log(listTask)
  // Si ya hay tareas agrega tareas si no actualiza y guardalas
  if (localStorage.getItem("tasks") === null) {
    let listTask = []
    listTask.push(task)
    localStorage.setItem('tasks', JSON.stringify(listTask))
  } else {
    let readTask = JSON.parse(localStorage.getItem('tasks'))
    readTask.push(task)
    localStorage.setItem('tasks', JSON.stringify(readTask))
  }
  // Borrar Formulario
  $d.getElementById('formTask').reset()
  getTasks()
}

// Get Tasks
function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'))
  let tasksView = $d.getElementById('tasks')

  tasksView.innerHTML = ''

  for (let i = 0; i < tasks.length; i++) {
    // console.log(tasks[i])
    let title = tasks[i].title
    let description = tasks[i].description

    tasksView.innerHTML += `<div class="card mb-2">
      <div class="card-body">
        <p>${title} - ${description}</p>
        <a class="btn btn-danger" onclick="deleteTask('${title}')">
          Delete
        </a>
      </div>
    </div>`
  }
}

// Delete tTasks
function deleteTask(title) {
  // console.log(title)
  let tasks = JSON.parse(localStorage.getItem('tasks'))

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title == title) {
      tasks.splice(i, 1)
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks))
  getTasks()
}

getTasks()
