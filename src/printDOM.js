class DOMHandler {
  constructor() {
    
  }

  renderTaskList(ulNode, taskList) {
    for (let task of taskList) {
      const li = document.createElement('li')  
      const title = document.createElement('h3')
      const description =document.createElement('p')
      const checkbox = document.createElement('input');

      checkbox.type = 'checkbox'
      checkbox.task = task
      checkbox.addEventListener('click', (task, taskList) => {
        taskList.task.complete()
      })

      title.innerText = task.name
      description.innerText = task.description
      li.appendChild(title);
      li.appendChild(description);
      li.appendChild(checkbox)
      ulNode.appendChild(li)
    }
  }
}

const DOM = new DOMHandler()

export default DOM
