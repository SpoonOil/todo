import { TaskList } from "./tasks.js"
import { format } from "date-fns"

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
  bindController(controlObj) {
    this.controller = controlObj
  }

  bindTaskDeadlineDisplay(node) {
    this.taskDeadlineDisplay = node;
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
      this.controller.saveToLocal();
    })
  }

  insertDeadlineOptions() {
    const deadDateCont = document.querySelector(".deadline-date-container")
    const deadlineToggle = document.querySelector("#task-deadline-checkbox")
    const deadlineParent = this.taskDeadlineDisplay;
    const daySelect = deadlineParent.querySelector("#day-select");
    const monthSelect = deadlineParent.querySelector("#month-select");
    const yearSelect = deadlineParent.querySelector("#year-select");
    this.daySelect = daySelect
    this.monthSelect = monthSelect
    this.yearSelect = yearSelect

    deadlineToggle.addEventListener("click", () => {
      this.renderFunction()
    })
    if (!deadlineToggle.checked) {
      deadDateCont.style.opacity = 0.4
      daySelect.disabled = true;
      monthSelect.disabled = true;
      yearSelect.disabled = true;
    } else {
      deadDateCont.style.opacity = 1;
      daySelect.disabled = false;
      monthSelect.disabled = false;
      yearSelect.disabled = false;
    }

    yearSelect.addEventListener("change", () => {
      this.renderFunction()
    })

    monthSelect.addEventListener("change", () => {
      this.renderFunction()
    })
    const maxYears = 10

    if (yearSelect.rendered === undefined) { //hacky TODO: extract this to something that runs on startup
      for (let i = 0; i <= maxYears; i++) {
        const year = 2024 + i
        const yearOption = document.createElement("option")
        yearOption.innerText = year
        yearOption.classList.add("p-3")
        yearSelect.rendered = true
        yearSelect.appendChild(yearOption)
      }
    }

    if (monthSelect.rendered === undefined) {
      for (let month of ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]) {
        const monthOption = document.createElement("option")
        monthOption.innerText = month;
        monthOption.classList.add("p-3")
        monthSelect.rendered = true;
        monthSelect.appendChild(monthOption)
      }
    }

    while (daySelect.firstChild) {
      daySelect.firstChild.remove()
    }


    const leap = !(yearSelect.value % 4)
    const month = monthSelect.value;
    let daysInMonth = 30 // baseline
    if (["Jan", "Mar", "May", "July", "Aug", "Oct", "Dec"].includes(month)) {
      daysInMonth += 1
    } else if (month == "Feb") {
      daysInMonth--;
      leap ? daysInMonth : daysInMonth--;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayOption = document.createElement("option");
      dayOption.innerText = day
      dayOption.classList.add("p-3");
      daySelect.appendChild(dayOption)
    }


  }

  setDefaultDay() {
    const todayDate = new Date(Date.now())
    const todayMonth = todayDate.getMonth()
    const todayYear = todayDate.getFullYear()
    const todayDay = todayDate.getDate();
    console.table(todayMonth, todayYear, todayDay)
    this.yearSelect.value = todayYear
    this.monthSelect.value = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][todayMonth];
    this.daySelect.value = todayDay
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
    this.insertDeadlineOptions()
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

      const deadlineInfo = document.createElement('div')
      const deadlineHeader = document.createElement('h5')
      const deadlineBody = document.createElement('p')

      deadlineInfo.appendChild(deadlineHeader);
      deadlineInfo.appendChild(deadlineBody);
      addTailwindStyleString(deadlineInfo, "flex flex-col items-center")

      deadlineHeader.innerText = "Due"

      const priorityInfo = document.createElement("span")
      addTailwindStyleString(priorityInfo, "p-3 rounded-md")
      let prioText = ""

      switch (task.priority) {
        case "normal":
          prioText = "Normal"
          priorityInfo.classList.add("bg-slate-300")
          break;
        case "high":
          prioText = "High"
          priorityInfo.classList.add("bg-red-100")
          break;
        case "veryHigh":
          prioText = "Very High"
          priorityInfo.classList.add("bg-red-300")
          break;
        case "low":
          prioText = "Low"
          priorityInfo.classList.add("bg-slate-100")
          break;
      }


      priorityInfo.innerText = prioText;

      const close = document.createElement('button')
      addTailwindStyleString(close, 'bg-red-200 p-3 w-12 rounded-md align-top')

      close.innerText = 'x' // temp until i render an svg or some shit
      close.addEventListener('click', () => {
        this.currentList.removeTask(task.id)
        this.renderTaskList()
        this.controller.saveToLocal();
      });

      checkbox.type = 'checkbox'
      checkbox.task = task
      checkbox.addEventListener('click', () => {
        if (task.completed == "notCompleted") {
          this.currentList.completeTask(task.id)
          this.controller.saveToLocal();
          this.renderTaskList()
        } else {
          this.currentList.uncompleteTask(task.id)
          this.controller.saveToLocal();
          this.renderTaskList()
        }
      })

      title.innerText = task.name
      description.innerText = task.description
      li.appendChild(checkbox)
      info.appendChild(title);
      info.appendChild(description);
      li.appendChild(info)
      if (task.dueDate != "No Deadline") {
        deadlineBody.innerText = format(task.dueDate, "MM/dd/yyyy");
        li.appendChild(deadlineInfo);
      }

      li.appendChild(priorityInfo)
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
