function addTailwindStyleString(node, tailwindStyleString) {
  const classes = tailwindStyleString.split(' ')
  node.classList.add(...classes)
}

class DOMHandler {
  constructor(ulNode, taskList) {
    this.ulNode = ulNode
    this.taskList = taskList
  }
  
  renderTaskList() {

    while (this.ulNode.firstChild) {
      this.ulNode.firstChild.remove()
    }

    for (let task of this.taskList.getTasks()) {
      const li = document.createElement('li')
      addTailwindStyleString(li, 'flex gap-4 items-center flex-1 p-8 rounded-lg bg-slate-200')
      const title = document.createElement('h3')
      const description =document.createElement('p')
      addTailwindStyleString(description, 'flex-1')

      const checkbox = document.createElement('input');
      addTailwindStyleString(checkbox, 'appearance-none active:border-0 checked:bg-slate-600 checked:border-1 w-5 h-5 border-2 border-slate-500 bg-white rounded-full')

      const close = document.createElement('button')
      addTailwindStyleString(close, 'bg-red-200 w-8 h-8 rounded-md font-mono')

      close.innerText = 'X' // temp until i render an svg or some shit
      close.addEventListener('click', () => {
        this.taskList.removeTask(task.id)
        this.renderTaskList()
      });

      checkbox.type = 'checkbox'
      checkbox.task = task
      checkbox.addEventListener('click', () => {
        if (task.completed == "notCompleted") {
          this.taskList.completeTask(task.id)
          this.renderTaskList()
        } else {
          this.taskList.uncompleteTask(task.id)
          this.renderTaskList()
        }
      })

      title.innerText = task.name
      description.innerText = task.description
      li.appendChild(checkbox)
      li.appendChild(title);
      li.appendChild(description);
      li.appendChild(close)

      if (task.completed == "completed") {
        addTailwindStyleString(li, 'bg-slate-100 opacity-50')
        checkbox.checked = true;
        description.style.textDecoration = "line-through"
        title.style.textDecoration = "line-through"
      }
      this.ulNode.appendChild(li)
    }
  }
}

export default DOMHandler
