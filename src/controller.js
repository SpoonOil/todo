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

    bindAddTaskButton(node) {
        console.log(this.priorityInput.value)
        node.addEventListener('click', () => {
            this.addTask(this.nameInput.value, this.descriptionInput.value, this.priorityInput.value);
            this.nameInput.value = "";
            this.descriptionInput.value = "";
            this.priorityInput.value = "normal"
        })
    }

    bindPriorityInput(node) {
        this.priorityInput = node;
    }

    updateListName(input) {
        const list = this.domObject.getActiveList();
        list.setName(input.value)
    }

    setDeleteListNode(node) {
        node.addEventListener("click", () => {
            this.deleteCurrentList()
        })
    }

    deleteCurrentList() {
        this.removeTaskList(this.domObject.getActiveList())
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
    }

    addTaskList(list) {
        this.listsArray.push(list)
        if (this.listsArray.length == 1) {
            this.domObject.setCurrentList(this.listsArray[0])
        }
        this.render();
    }

    removeTaskList(list) {
        this.listsArray.splice(this.listsArray.indexOf(list), 1)
        this.domObject.setCurrentList(this.listsArray[0]);
        this.domObject.setQuickbarMode("addTask");
        this.render();
    }
    updateActiveList() {
        const list = this.domObject.getActiveList()
        this.taskList = list;
    }
}


export default Overhead;





