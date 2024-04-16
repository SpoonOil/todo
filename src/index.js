import {Tasks, TaskList} from './tasks.js'
import './style.css'
import DOM from './printDOM.js'

const test = new TaskList
const taskButton = document.getElementById('add-task-button');

taskButton.addEventListener('click')

test.addTask("bruh", "this is a test task");

const taskDisplay = document.querySelector('.task-display-list')

DOM.renderTaskList(taskDisplay, test)
