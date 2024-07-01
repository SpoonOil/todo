import { Task, TaskList } from './tasks.js'
import './style.css'
import DOMHandler from './printDOM.js'
import Overhead from './controller.js'

const test = new TaskList('Tasks', 'Description');
const taskLists = []
taskLists.push(test)
const dom = new DOMHandler(document.getElementById('task-lists-display'), document.querySelector('.task-display-list'), test, taskLists);
test.addTask("Task", "This is an example Task", "normal");
dom.bindAddTaskDisplay(document.querySelector("#add-task-display"))
dom.bindEditListDisplay(document.querySelector(".tasklist-info"))
dom.bindTaskDeadlineDisplay(document.querySelector(".deadline-date-container"));
dom.setQuickbarMode("addTask");

const overhead = new Overhead(document.getElementById('add-task-display'), TaskList, taskLists, test, dom)

overhead.setRenameListNodes(document.getElementById('list-name-change-button'), document.getElementById('tasklist-name-input'));
overhead.bindPriorityInput(document.getElementById('task-priority-select'));
overhead.bindAddTaskButton(document.getElementById('add-task-button'));

overhead.setDeleteListNode(document.getElementById("delete-list-button"));
overhead.render()




