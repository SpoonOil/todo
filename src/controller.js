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
    }

    addTask(name, description) {
        this.taskList.addTask(name, description)
        this.renderFunction();
    }

}

export default Overhead