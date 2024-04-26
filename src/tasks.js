class Task {
  constructor(name, description, taskList) {
    this.name = name;
    this.description = description;
    this.completed = "notCompleted" 
    this.parentList = taskList.tasks
    this.parent = taskList
    this.id = this.parent.getNextId();
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
    this.latestIdNum = 0
  }

  getNextId() {
    let id = this.latestIdNum
    this.latestIdNum++
    return id
  }

  getTasks() {
    return this.tasks;
  }
  addTask(taskName, taskDescription, list) {
    this.tasks.push(new Task(taskName, taskDescription, this))
    this.orderTasks();
  }

  orderTasks() {
    const completedTasks = []
    for ( let task of this.tasks) {
      if (task.completed == "completed") {
        completedTasks.push(this.tasks.splice(this.tasks.indexOf(task), 1)[0])
      }
    }
    this.tasks = this.tasks.concat(completedTasks)
  }

  removeTask(taskID) {
    this.tasks.splice(this.tasks.findIndex((task) => task.name == taskName), 1)
    this.orderTasks();
  }
  
  completeTask(taskID) {
    this.tasks.find((task) => task.id == taskID).complete()
    this.orderTasks();
  }

  uncompleteTask(taskID) {
    this.tasks.find((task) => task.id == taskID).uncomplete()
    this.orderTasks();
  }
}

export {Task, TaskList}
