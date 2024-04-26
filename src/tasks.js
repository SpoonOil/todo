class Task {
  constructor(name, description, taskList) {
    this.name = name;
    this.description = description;
    this.completed = "notCompleted";
    this.parentList = taskList.tasks;
    this.parent = taskList;
    this.id = this.parent.getNextId();
  }

  complete() {
    this.completed = "completed";
  }

  uncomplete() {
    this.completed = "notCompleted";
  }
}

class TaskList {
  constructor(listName, listDescription) {
    this.name = listName;
    this.description = listDescription;
    this.tasks = [];
    this.latestIdNum = 0;
  }

  getNextId() {
    let id = this.latestIdNum;
    this.latestIdNum++;
    return id;
  }

  getTasks() {
    let completedTasks = [];
    let uncompletedTasks = []
    for (let task of this.tasks) {
      if (task.completed == "completed") {
        completedTasks.push(task);
      } else {
        uncompletedTasks.push(task)
      }
    }
    const sortedTasks = uncompletedTasks.concat(completedTasks)
    return sortedTasks;
  }
  addTask(taskName, taskDescription, list) {
    this.tasks.push(new Task(taskName, taskDescription, this));
  }

  removeTask(taskID) {
    this.tasks.splice(
      this.tasks.findIndex((task) => task.id == taskID),
      1
    );
  }

  completeTask(taskID) {
    this.tasks.find((task) => task.id == taskID).complete();
  }

  uncompleteTask(taskID) {
    this.tasks.find((task) => task.id == taskID).uncomplete();
  }
}

export { Task, TaskList };
