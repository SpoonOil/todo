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

// testList = new TaskList('test', 'testd')
// 
// testList.addTask('code', 'do your coding')
// 
// console.table(testList)
// 
// testList.completeTask('code')
// console.table(testList)
// 
// testList.removeTask('code')
// console.table(testList)

export {Task, TaskList}
