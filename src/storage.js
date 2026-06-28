import { uiController } from "./UI.js";

export {data};
export { addNewProject, deleteProject, 
    addNewTask, loadData, saveData, openProject, modifyProjectData};




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


function deleteProject(UUID) {
    //delete all child tasks first
    for (let i = data.tasks.length - 1; i >= 0; i--) { 
        if (data.tasks[i].projectId === UUID) {
            data.tasks.splice(i, 1);
        }
    }
    const targetProject = data.projects.find(project => project.id === UUID)
    const projectIndex = data.projects.indexOf(targetProject);
    data.projects.splice(projectIndex, 1);
    saveData();
    uiController.refreshContent();
}

function modifyProjectData(UUID) {

    const targetProject = data.projects.find(project => project.id === UUID)
    const title = document.getElementById("edit-p-form").elements['edit-p-title'].value;

    targetProject.title = title
    console.log(UUID);
    saveData();
    uiController.refreshContent();
}

function openProject(UUID) {

}