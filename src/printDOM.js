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
      const title = document.createElement('h3')
      const description =document.createElement('p')
      const checkbox = document.createElement('input');
      const close = document.createElement('button')

      close.innerText = 'X'
      close.addEventListener('click', () => {
        this.taskList.removeTask(task.name)
        this.renderTaskList()
      });

      checkbox.type = 'checkbox'
      checkbox.task = task
      checkbox.addEventListener('click', () => {
        if (task.completed == "notCompleted") {
          task.complete()
          this.renderTaskList()
        } else {
          task.uncomplete()
          this.renderTaskList()
        }
      })

      title.innerText = task.name
      description.innerText = task.description
      li.appendChild(title);
      li.appendChild(description);
      li.appendChild(checkbox)
      li.appendChild(close)

      if (task.completed == "completed") {
        li.style.backgroundColor = 'green'
        checkbox.checked = true;
      }
      this.ulNode.appendChild(li)
    }
  }
}

export default DOMHandler
