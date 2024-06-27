import { Task, TaskList } from './tasks.js'
import './style.css'
import DOMHandler from './printDOM.js'
import Overhead from './controller.js'

const test = new TaskList('testlist', 'testlist desc');
const taskLists = []
taskLists.push(test)
const dom = new DOMHandler(document.getElementById('task-lists-display'), document.querySelector('.task-display-list'), test, taskLists);
test.addTask("bruh", "this is a test task");
dom.bindAddTaskDisplay(document.querySelector("#add-task-display"))
dom.bindEditListDisplay(document.querySelector(".tasklist-info"))
// dom.bindEditListDone(document.getElementById("edit-list-submit"))
dom.setQuickbarMode("addTask");

const overhead = new Overhead(document.getElementById('add-task-display'), "add-list-button", TaskList, taskLists, test, dom)

overhead.setRenameListNodes(document.getElementById('list-name-change-button'), document.getElementById('tasklist-name-input'));

overhead.setDeleteListNode(document.getElementById("delete-list-button"));
overhead.render()




