import { format } from "date-fns";
class Task {

  static taskifyArrayFromJSON(tasksArray) {
    function complete() {
      this.completed = "completed";
    }

    function uncomplete() {
      this.completed = "notCompleted";
    }
    for (let task of tasksArray) {
      task.complete = complete
      task.uncomplete = uncomplete
    }
  }
  constructor(name, description, taskList, priority, dueDate) {
    this.name = name;
    this.description = description;
    this.completed = "notCompleted";
    this.parentList = taskList.tasks;
    this.parent = taskList;
    this.id = this.parent.getNextId();
    this.dueDate = dueDate
    this.createDate = format(Date.now(), "MM/dd/yyyy")
    this.priority = priority
  }

  complete() {
    this.completed = "completed";
  }

  uncomplete() {
    this.completed = "notCompleted";
  }
}

class TaskList {
  static addFunctionsToJSONarray(array) {
    function getNextId() {
      let id = this.latestIdNum;
      this.latestIdNum++;
      return id;
    }
    function getName() {
      return this.name;
    }

    function setName(name) {
      this.name = name;
    }

    function getTasks() {
      let completedTasks = [];
      let uncompletedTasks = []
      for (let task of this.tasks) {
        if (task.completed == "completed") {
          completedTasks.push(task);
        } else {
          uncompletedTasks.push(task)
        }
      }

      let normalPriority = []
      let highPriority = []

      for (let task of uncompletedTasks) {
        if (task.priority == "normal") {
          normalPriority.unshift(task)
        } else if (task.priority == "low") {
          normalPriority.push(task)
        } else if (task.priority == "high") {
          highPriority.push(task)
        } else if (task.priority == "veryHigh") {
          highPriority.unshift(task)
        }
      }
      uncompletedTasks = highPriority.concat(normalPriority)

      const sortedTasks = uncompletedTasks.concat(completedTasks)
      return sortedTasks;
    }
    function addTask(taskName, taskDescription, priority, dueDate) {
      this.tasks.push(new Task(taskName, taskDescription, this, priority, dueDate));
    }

    function removeTask(taskID) {
      this.tasks.splice(
        this.tasks.findIndex((task) => task.id == taskID),
        1
      );
    }

    function completeTask(taskID) {
      this.tasks.find((task) => task.id == taskID).complete();
    }

    function uncompleteTask(taskID) {
      this.tasks.find((task) => task.id == taskID).uncomplete();
    }
    function bindFunctionsToObject(arrayOfFunctions, obj) {
      for (let func of arrayOfFunctions) {
        obj[func.name] = func;
      }
    }
    for (let tasklist of array) {
      bindFunctionsToObject([completeTask, uncompleteTask, removeTask, addTask, getTasks, setName, getName, getNextId], tasklist)
      Task.taskifyArrayFromJSON(tasklist.tasks)
    }
  }

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
  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
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

    let normalPriority = []
    let highPriority = []

    for (let task of uncompletedTasks) {
      if (task.priority == "normal") {
        normalPriority.unshift(task)
      } else if (task.priority == "low") {
        normalPriority.push(task)
      } else if (task.priority == "high") {
        highPriority.push(task)
      } else if (task.priority == "veryHigh") {
        highPriority.unshift(task)
      }
    }
    uncompletedTasks = highPriority.concat(normalPriority)

    const sortedTasks = uncompletedTasks.concat(completedTasks)
    return sortedTasks;
  }
  addTask(taskName, taskDescription, priority, dueDate) {
    this.tasks.push(new Task(taskName, taskDescription, this, priority, dueDate));
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
