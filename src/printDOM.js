import { Task, TaskList } from "./tasks.js"

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
    this.quickbarMode = "addTask"
    this.quickbarNodes = []
  }
  bindAddTaskDisplay(node) {
    this.addTaskDisplay = node
    this.updateQuickbarNodes()
  }

  bindEditListDisplay(node) {
    this.editListDisplay = node
    this.updateQuickbarNodes()
  }

  updateQuickbarNodes() {
    const nodes = []
    nodes.push(this.addTaskDisplay)
    nodes.push(this.editListDisplay)
    this.quickbarNodes = [...nodes]
  }

  setQuickbarMode(modeString) {
    this.quickbarMode = modeString
    this.updateQuickbarDisplay()
  }

  updateQuickbarDisplay() {
    switch (this.quickbarMode) {
      case "addTask":
        this.addTaskDisplay.classList.remove("hidden")
        this.hideOtherNodes(this.addTaskDisplay)
        break;
      case "editList":
        this.editListDisplay.classList.remove("hidden")
        this.hideOtherNodes(this.editListDisplay)
        break;
    }

  }

  hideOtherNodes(exceptionNode) {
    for (let node of this.quickbarNodes) {
      if (node == exceptionNode) { continue }
      node.classList.add("hidden")
    }
  }


  renderAllLists() {
    while (this.tasklistsDisplay.firstChild) {
      this.tasklistsDisplay.firstChild.remove()
    }

    for (let list of this.allLists) {
      const li = document.createElement('li')
      li.innerText = list.name
      if (list == this.currentList) {
        addTailwindStyleString(li, 'bg-slate-200 p-3 rounded-md flex items-center justify-between hover:cursor-pointer hover:bg-slate-100 active:bg-slate-400')

        const editButton = document.createElement("button");
        const editIcon = document.createElement("span");
        editIcon.className = "material-symbols-outlined";
        editIcon.innerText = "edit"

        editButton.appendChild(editIcon)

        addTailwindStyleString(editButton, "bg-slate-300 ms-2 p-1 rounded-md hover:cursor-pointer hover:bg-slate-100 active:bg-slate-300");
        editButton.addEventListener("click", () => {
          this.setQuickbarMode("editList")
        })

        li.appendChild(editButton);

      } else {
        addTailwindStyleString(li, 'bg-slate-200 p-3 rounded-md flex items-center justify-between hover:cursor-pointer hover:bg-slate-100 active:bg-slate-400')
      }

      li.addEventListener("click", () => {
        this.setCurrentList(list)
      })
      this.tasklistsDisplay.appendChild(li)
    }

    const addListBtn = document.createElement('li')
    addListBtn.innerText = "+"
    addTailwindStyleString(addListBtn, 'bg-slate-400 p-3 text-center rounded-md hover:cursor-pointer hover:bg-slate-500 active:bg-slate-700')
    this.tasklistsDisplay.appendChild(addListBtn)
    addListBtn.id = "add-list-button"

    addListBtn.addEventListener("click", () => {
      const newList = new TaskList("New List " + this.allLists.length, "Description");
      this.allLists.push(newList)
      this.setCurrentList(newList)
      this.setQuickbarMode("editList");
      this.renderFunction();
    })
  }

  setCurrentList(list) {
    this.currentList = list;
    this.renderFunction();
  }

  getActiveList() {
    return this.currentList;
  }

  renderFunction() {
    this.updateQuickbarDisplay()
    this.renderTaskList()
    this.renderAllLists()
  }
  renderTaskList() {


    while (this.tasksDisplay.firstChild) {
      this.tasksDisplay.firstChild.remove()
    }

    const taskNameInput = document.getElementById('tasklist-name-input')
    const taskInfo = document.querySelector('.tasklist-info')
    if (this.currentList) {
      taskNameInput.value = this.currentList.getName();
      taskInfo.style.opacity = 1;
    } else {
      taskNameInput.value = ""
      taskInfo.style.opacity = 0.2;
      return;
    }

    for (let task of this.currentList.getTasks()) {
      const li = document.createElement('li')
      addTailwindStyleString(li, 'flex gap-4 items-center flex-1 p-8 rounded-lg bg-slate-200')

      const info = document.createElement('div')
      addTailwindStyleString(info, 'flex-1')

      const title = document.createElement('h3')

      const description = document.createElement('p')
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
