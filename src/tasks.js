class Task {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.completed = "notCompleted" 
  }

  complete() {
    this.completed = "completed"
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
  addTask(taskName, taskDescription) {
    this.tasks.push(new Task(taskName, taskDescription))
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
