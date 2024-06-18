class Overhead {
    constructor(addDisplayNode, addListId, listclass, listsArray, taskList, domObject) {
        domObject.renderFunction();
        const button = addDisplayNode.querySelector('#add-task-button')
        const nameInput = addDisplayNode.querySelector('#task-name-input')
        const descriptionInput = addDisplayNode.querySelector('#task-description-input')
        button.addEventListener('click', () => {
            this.addTask(nameInput.value, descriptionInput.value);
        })

        this.taskList = taskList;
        this.renderFunction = domObject.renderFunction
        this.nameInput = nameInput
        this.listclass = listclass
        this.listsArray = listsArray
        this.addListId = addListId
        this.domObject = domObject
        this.renameListButton = undefined;
        this.renameListInput = "none";
    }

    updateListName(input) {
        const list = this.domObject.getActiveList();
        list.setName(input.value)
    }

    setRenameListNodes(buttonNode, nameInput) {
        this.renameListButton = buttonNode;
        this.renameListInput = nameInput;
        this.renameListButton.addEventListener("click", () => {
            this.updateListName(this.renameListInput);
            this.render();
        })
    }

    addTask(name, description) {
        this.updateActiveList()
        this.nameInput.reportValidity()
        if (this.nameInput.checkValidity()) {
            this.taskList.addTask(name, description)
            this.domObject.renderFunction();
        }
    }

    render() {
        this.domObject.renderFunction()
        this.addTasklistAddButton()
    }

    removeTask(name) {
        this.updateActiveList()
        this.taskList.removeTask(name)
        this.domObject.renderFunction();
    }

    addTasklistAddButton() {
        this.taskListAddButton = document.getElementById(this.addListId)
        this.taskListAddButton.addEventListener("click", () => {
            let list = new this.listclass("newlist", "newdesc")
            this.addTaskList(list)
            this.domObject.setCurrentList(list)
            this.render()
        })
    }

    addTaskList(list) {
        this.listsArray.push(list)
        console.log(this.listsArray)
        this.render();
    }
    updateActiveList() {
        const list = this.domObject.getActiveList()
        this.taskList = list
    }
}

export default Overhead

