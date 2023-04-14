import { v4 as uuidV4 } from "uuid"

type Task = {
   id: string,
   title: string,
   completed: boolean,
   createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const taskForm = document.querySelector<HTMLFormElement>("#new-task-form")
const taskInput = document.querySelector<HTMLInputElement>("#new-task-input")

const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

taskForm?.addEventListener("submit", e => {
   e.preventDefault()

   if(taskInput?.value == "" || taskInput?.value == null) return

   const newTask: Task = {
      id: uuidV4(),
      title: taskInput.value,
      completed: false,
      createdAt: new Date()
   }
   tasks.push(newTask)
   saveTasks()
   addListItem(newTask)
   taskInput.value = ""
})

function addListItem(task: Task){
   const item = document.createElement("li")
   const label = document.createElement("div")
   const checkbox = document.createElement("input")
   const deleteButton = document.createElement("button")
   deleteButton.innerHTML= "Delete"
   checkbox.addEventListener("change", ()=> {
      task.completed = checkbox.checked
   })
   checkbox.checked = task.completed
   checkbox.type = "checkbox"
   label.append(checkbox, task.title, deleteButton)
   item.append(label)
   list?.append(item)

   function deleteItem() {
      deleteButton.addEventListener("click", ()=> {
         item.remove()
         localStorage.removeItem("TASKS")
      })
   }
   deleteItem();
}

function saveTasks() {
   localStorage.setItem("TASKS", JSON.stringify(tasks))
}
function loadTasks(): Task[] {
   const jsonTask = localStorage.getItem("TASKS")
   if(jsonTask == null) {return []}
   return JSON.parse(jsonTask)
}