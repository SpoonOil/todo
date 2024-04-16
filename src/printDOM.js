class DOMHandler {
  constructor() {
    
  }
  
  renderTaskList(ulNode, taskList) {
    while (ulNode.firstChild) {
      ulNode.firstChild.remove()
    }

    for (let task of taskList.getTasks()) {
      const li = document.createElement('li')  
      const title = document.createElement('h3')
      const description =document.createElement('p')
      const checkbox = document.createElement('input');

      checkbox.type = 'checkbox'
      checkbox.task = task
      checkbox.addEventListener('click', () => {
        if (task.completed == "notCompleted") {
          task.complete()
          DOM.renderTaskList(ulNode, taskList)
        } else {
          task.uncomplete()
          DOM.renderTaskList(ulNode, taskList)
        }
      })

      title.innerText = task.name
      description.innerText = task.description
      li.appendChild(title);
      li.appendChild(description);
      li.appendChild(checkbox)

      if (task.completed == "completed") {
        li.style.backgroundColor = 'green'
        checkbox.checked = true;
      }
      ulNode.appendChild(li)
    }
  }
}

const DOM = new DOMHandler()

export default DOM
