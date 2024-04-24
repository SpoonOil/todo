class Overhead {
    constructor(addDisplayNode, taskList, renderFunction) {
        renderFunction();
        const button = addDisplayNode.querySelector('#add-task-button')
        const nameInput = addDisplayNode.querySelector('#task-name-input')
        const descriptionInput = addDisplayNode.querySelector('#task-description-input')
        button.addEventListener('click', (e) => {
            console.log('clicked');
            this.addTask(nameInput.value, descriptionInput.value);
        })
        console.log('contructed')

        this.taskList = taskList;
        this.renderFunction = renderFunction
        this.nameInput = nameInput
    }

    addTask(name, description) {
        this.nameInput.reportValidity()
        if (this.nameInput.checkValidity()) {
            this.taskList.addTask(name, description)
            this.renderFunction();
        }
    }

    removeTask(name) {
        this.taskList.removeTask(name)
        this.renderFunction();
    }

}

export default Overhead