function addTailwindStyleString(node, tailwindStyleString) {
  const classes = tailwindStyleString.split(' ')
  node.classList.add(...classes)
}

class DOMHandler {
  constructor(tasklistsDisplayNode, tasksDisplayNode, taskList, taskLists) {
    this.tasklistsDisplay = tasklistsDisplayNode
    this.tasksDisplay = tasksDisplayNode
    this.currentList = taskList
    this.allLists = taskLists
  }
  renderAllLists() {
    while (this.tasklistsDisplay.firstChild) {
      this.tasklistsDisplay.firstChild.remove()
    }

    for (let list of this.allLists) {
      const li = document.createElement('li')
      li.innerText = list.name
      addTailwindStyleString(li, 'bg-slate-200 p-3 rounded-md hover:cursor-pointer hover:bg-slate-100 active:bg-slate-400')
      this.tasklistsDisplay.appendChild(li)
    }
  }

  renderTaskList() {

    while (this.tasksDisplay.firstChild) {
      this.tasksDisplay.firstChild.remove()
    }

    for (let task of this.currentList.getTasks()) {
      const li = document.createElement('li')
      addTailwindStyleString(li, 'flex gap-4 items-center flex-1 p-8 rounded-lg bg-slate-200')

      const info = document.createElement('div')
      addTailwindStyleString(info, 'flex-1')

      const title = document.createElement('h3')

      const description =document.createElement('p')
      addTailwindStyleString(description, 'text-sm opacity-70')

      const checkbox = document.createElement('input');
      addTailwindStyleString(checkbox, 'appearance-none active:border-0 checked:bg-slate-600 checked:border-1 w-5 h-5 border-2 border-slate-500 bg-white rounded-full')

      const close = document.createElement('button')
      addTailwindStyleString(close, 'bg-red-200 p-3 w-12 rounded-md align-top')

      close.innerText = 'x' // temp until i render an svg or some shit
      close.addEventListener('click', () => {
        this.currentList.removeTask(task.id)
        this.renderTaskList()
      });

      checkbox.type = 'checkbox'
      checkbox.task = task
      checkbox.addEventListener('click', () => {
        if (task.completed == "notCompleted") {
          this.currentList.completeTask(task.id)
          this.renderTaskList()
        } else {
          this.currentList.uncompleteTask(task.id)
          this.renderTaskList()
        }
      })

      title.innerText = task.name
      description.innerText = task.description
      li.appendChild(checkbox)
      info.appendChild(title);
      info.appendChild(description);
      li.appendChild(info)
      li.appendChild(close)

      if (task.completed == "completed") {
        addTailwindStyleString(li, 'bg-slate-100 opacity-50')
        checkbox.checked = true;
        description.style.textDecoration = "line-through"
        title.style.textDecoration = "line-through"
      }
      this.tasksDisplay.appendChild(li)
    }
  }
}

export default DOMHandler
