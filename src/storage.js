
export {data};
export {addNewProject};
export {saveData};
export {loadData};
export {addNewTask};


const data = {
    projects: [],
    tasks: []
};



function addNewProject(title) {
    const UUID = crypto.randomUUID()

    data.projects.push(new Project(title, UUID));
    saveData();
};

function addNewTask(title, projectId, description, dueDate) {
    const UUID = crypto.randomUUID();

    data.tasks.push(new Task(title, UUID, projectId, description, dueDate));
    saveData();
}



function Project(title, id) {
    if (!new.target) {
        throw Error("Must use 'new' operator")
    }
    this.title = title;
    this.id = id;
}

function Task(title, id, projectId, description, dueDate) {
    if (!new.target) {
        throw Error("Must use 'new' operator")
    }
    this.title = title;
    this.id = id;
    this.projectId = projectId;
    this.description = description;
    this.dueDate = dueDate;
}


function saveData() {
    localStorage.setItem("todoData", JSON.stringify(data));
}

function loadData() {
    const storedData = JSON.parse(localStorage.getItem("todoData"))
    if (storedData) {
        data.projects = storedData.projects;
        data.tasks = storedData.tasks;
    }
}