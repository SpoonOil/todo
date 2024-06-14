import { Task, TaskList } from './tasks.js'
import './style.css'
import DOMHandler from './printDOM.js'
import Overhead from './controller.js'

const test = new TaskList('testlist', 'testlist desc');
const taskLists = []
taskLists.push(test)
const dom = new DOMHandler(document.getElementById('task-lists-display'), document.querySelector('.task-display-list'), test, taskLists);
test.addTask("bruh", "this is a test task");

const overhead = new Overhead(document.getElementById('add-task-display'), "add-list-button", TaskList, taskLists, test, dom)

overhead.render()




