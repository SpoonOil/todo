class Overhead {
    constructor(addButtonNode, taskList, renderFunction) {
        renderFunction();
        addButtonNode.addEventListener('click', (e) => {
            console.log('clicked');
            this.addTask('test', 'test d');
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