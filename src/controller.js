class Overhead {
    constructor(addDisplayNode, addListId, listclass, listsArray, taskList, renderFunction) {
        renderFunction();
        const button = addDisplayNode.querySelector('#add-task-button')
        const nameInput = addDisplayNode.querySelector('#task-name-input')
        const descriptionInput = addDisplayNode.querySelector('#task-description-input')
        button.addEventListener('click', (e) => {
            console.log('clicked');
            this.addTask(nameInput.value, descriptionInput.value);
        })

        this.taskList = taskList;
        this.renderFunction = renderFunction
        this.nameInput = nameInput
        this.listclass = listclass
        this.listsArray = listsArray
        this.addListId = addListId
    }

    addTask(name, description) {
        this.nameInput.reportValidity()
        if (this.nameInput.checkValidity()) {
            this.taskList.addTask(name, description)
            this.renderFunction();
        }
    }

    render() {
        this.renderFunction()
        this.addTasklistAddButton()
    }

    removeTask(name) {
        this.taskList.removeTask(name)
        this.renderFunction();
    }

    addTasklistAddButton() {
        this.taskListAddButton = document.getElementById(this.addListId)
        console.log(this.taskListAddButton)
        this.taskListAddButton.addEventListener("click", () => {
            this.addTaskList("list", "no description")
        })
    }

    addTaskList(name, description) {
        let list = new this.listclass(name, description)
        this.listsArray.push(list)
        console.log(this.listsArray)
        this.render();
    }
}

export default Overhead