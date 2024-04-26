class Task {
  constructor(name, description, taskList) {
    this.name = name;
    this.description = description;
    this.completed = "notCompleted" 
    this.parentList = taskList.tasks
  }

  complete() {
    this.completed = "completed"
    console.log(this.parentList)
    this.parentList.push(this.parentList.splice(this.parentList.indexOf(this), 1)[0])
  }

  uncomplete() {
    this.completed = "notCompleted"
  }
}

class TaskList {
  constructor(listName, listDescription) {
    this.name = listName;
    this.description = listDescription;
    this.tasks = []
  }

  getTasks() {
    return this.tasks;
  }
  addTask(taskName, taskDescription, list) {
    this.tasks.push(new Task(taskName, taskDescription, this))
  }

  removeTask(taskName) {
    this.tasks.splice(
      this.tasks.findIndex((task) => task.name == taskName), 1)
  }

  completeTask(taskName) {
    this.tasks.find((task) => task.name ==taskName).complete()
  }
}

export {Task, TaskList}
