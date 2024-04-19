import {Tasks, TaskList} from './tasks.js'
import './style.css'
import DOM from './printDOM.js'
import Overhead from './controller.js'

const test = new TaskList
test.addTask("bruh", "this is a test task");

const taskDisplay = document.querySelector('.task-display-list')
const overhead = new Overhead(document.getElementById('add-task-display'), test, () => {
    DOM.renderTaskList(taskDisplay, test)
})




