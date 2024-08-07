import * as jc from "json-cycle"
class Overhead {
    constructor(addDisplayNode, listclass, listsArray, taskList, domObject) {
        domObject.renderFunction();
        const nameInput = addDisplayNode.querySelector('#task-name-input')
        const descriptionInput = addDisplayNode.querySelector('#task-description-input')

        this.taskList = taskList;
        this.renderFunction = domObject.renderFunction
        this.nameInput = nameInput
        this.descriptionInput = descriptionInput
        this.listclass = listclass
        this.listsArray = listsArray
        this.domObject = domObject
        this.renameListButton = undefined;
        this.renameListInput = "none";
    }

    bindDateInputs(dayNode, monthNode, yearNode, deadlineToggle) {
        this.dayNode = dayNode;
        this.monthNode = monthNode;
        this.yearNode = yearNode;
        this.deadlineToggle = deadlineToggle;
    }

    getDateInput() {
        if (this.deadlineToggle.checked == false) { return "No Deadline" }

        const date = new Date(this.yearNode.value, ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(this.monthNode.value), this.dayNode.value)
        console.log(date)
        return date
    }
    bindAddTaskButton(node) {
        console.log(this.priorityInput.value)
        node.addEventListener('click', () => {
            this.addTask(this.nameInput.value, this.descriptionInput.value, this.priorityInput.value, this.getDateInput());
            this.nameInput.value = "";
            this.descriptionInput.value = "";
            this.priorityInput.value = "normal"
            this.domObject.setDefaultDay();
            this.saveToLocal()
        })
    }

    bindPriorityInput(node) {
        this.priorityInput = node;
    }

    updateListName(input) {
        const list = this.domObject.getActiveList();
        list.setName(input.value)
        this.saveToLocal()
    }

    setDeleteListNode(node) {
        node.addEventListener("click", () => {
            this.deleteCurrentList()
        })
    }

    deleteCurrentList() {
        this.removeTaskList(this.domObject.getActiveList())
        this.saveToLocal()
    }
    setRenameListNodes(buttonNode, nameInput) {
        this.renameListButton = buttonNode;
        this.renameListInput = nameInput;
        this.renameListButton.addEventListener("click", () => {
            this.updateListName(this.renameListInput);
            this.render();
            this.domObject.setQuickbarMode("addTask");
        })
    }

    addTask(name, description, priority, dueDate) {
        this.updateActiveList()
        this.nameInput.reportValidity()
        if (this.nameInput.checkValidity()) {
            this.taskList.addTask(name, description, priority, dueDate)
            this.domObject.renderFunction();
        }
    }

    render() {
        this.domObject.renderFunction()
    }

    removeTask(name) {
        this.updateActiveList()
        this.taskList.removeTask(name)
        this.domObject.renderFunction();
        this.saveToLocal();
    }

    addTaskList(list) {
        this.listsArray.push(list)
        if (this.listsArray.length == 1) {
            this.domObject.setCurrentList(this.listsArray[0])
        }
        this.render();

        this.saveToLocal();
    }

    removeTaskList(list) {
        this.listsArray.splice(this.listsArray.indexOf(list), 1)
        this.domObject.setCurrentList(this.listsArray[0]);
        this.domObject.setQuickbarMode("addTask");
        this.render();
        this.saveToLocal();
    }
    updateActiveList() {
        const list = this.domObject.getActiveList()
        this.taskList = list;
    }

    saveToLocal() {
        localStorage.setItem("allTodoLists", JSON.stringify(jc.decycle(this.listsArray)))

    }
}


export default Overhead;





