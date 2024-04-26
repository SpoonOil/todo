import {Tasks, TaskList} from './tasks.js'
import './style.css'
import DOMHandler from './printDOM.js'
import Overhead from './controller.js'

const test = new TaskList('testlist', 'testlist desc');
const dom = new DOMHandler(document.querySelector('.task-display-list'), test);
test.addTask("bruh", "this is a test task");

const overhead = new Overhead(document.getElementById('add-task-display'), test, () => {
    dom.renderTaskList();
})




