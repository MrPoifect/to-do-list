import {addNewTask, data, addNewProject, saveData} from "./storage.js";
export {refreshContent};
export {addTestButtons};





function refreshContent() {
    displayProjects();
    updateProjectList();
    displayTasks();
};

function displayProjects() {
    document.getElementById("projects-container").innerHTML = "";

    for (let i = 0; i < data.projects.length; i++) {
        const currentProject = data.projects[i];
        const projectID = currentProject.id;

        const projectsContainer = document.getElementById("projects-container");
        const newCard = document.createElement("div");
        newCard.classList.add("project-card");
        projectsContainer.appendChild(newCard);

        const newTitle = document.createElement("h3");
        newTitle.classList.add("project-title");
        newTitle.textContent = currentProject.title;
        newCard.appendChild(newTitle);

        const newID = document.createElement("p");
        newID.textContent = ("Project ID: " + projectID)
        newCard.appendChild(newID);

        const newDeleteBtn = document.createElement("button");
        newDeleteBtn.textContent = "Delete"
        newCard.appendChild(newDeleteBtn);

        newDeleteBtn.addEventListener("click", () => deleteProject(projectID));
    };
};

function displayTasks() {
    document.getElementById("tasks-container").innerHTML = "";

    for (let i = 0; i < data.tasks.length; i++) {
        const currentTask = data.tasks[i];
        const taskID = currentTask.id;
        const projectID = currentTask.projectId;

        const tasksContainer = document.getElementById("tasks-container");
        const newCard = document.createElement("div");
        newCard.classList.add("task-card");
        tasksContainer.appendChild(newCard);

        const newTitle = document.createElement("h3");
        newTitle.classList.add("task-title");
        newTitle.textContent = currentTask.title;
        newCard.appendChild(newTitle);

        const newID = document.createElement("p");
        newID.textContent = ("Task ID: " + taskID)
        newCard.appendChild(newID);

        const newProjectID = document.createElement("p");
        newProjectID.textContent = ("Project ID: " + projectID)
        newCard.appendChild(newProjectID);

        const newDeleteBtn = document.createElement("button");
        newDeleteBtn.textContent = "Delete"
        newCard.appendChild(newDeleteBtn);

        newDeleteBtn.addEventListener("click", () => deleteTask(taskID));

    };
}

function updateProjectList() {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";
    for (let i = 0; i < data.projects.length; i++) {
        const newOption = document.createElement("option");
        newOption.value = i;
        newOption.innerHTML = data.projects[i].title;
        projectList.add(newOption);
    }
}













const newProjectBtn = document.getElementById("new-project");
const newProjectModal = document.getElementById("project-modal");
const newProjectCloseBtn = document.getElementById("p-close");
const newProjectForm = document.getElementById("p-form");


function addTestButtons() {
    newProjectBtn.addEventListener("click", function () {
    newProjectModal.showModal();
    })

    newProjectCloseBtn.addEventListener("click", function (e) {
    e.preventDefault();
    newProjectModal.close();
    })

    newProjectForm.addEventListener("submit", submitProject);

    newTaskBtn.addEventListener("click", function () {
        newTaskModal.showModal();
    })

    newTaskCloseBtn.addEventListener("click", function (e) {
        e.preventDefault();
        newTaskModal.close();
    })

    newTaskForm.addEventListener("submit", submitTask);

}

function submitProject(e) {
    e.preventDefault();

    const title = document.getElementById("p-form").elements['p-title'].value;

    addNewProject(title);
    refreshContent();
    newProjectModal.close();
}

function submitTask(e) {
    e.preventDefault();

    const form = document.getElementById("t-form")

    const title = form.elements['t-title'].value;
    const description = form.elements['t-description'].value;
    const projectIndex = form.elements['project-list'].value;
    const projectID = data.projects[projectIndex].id;
    const dueDate = form.elements['due-date'].value;

    

    addNewTask(title, projectID, description, dueDate);
    refreshContent();
    newTaskModal.close();

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
    refreshContent();
}

function deleteTask(UUID) {
    const targetTask = data.tasks.find(task => task.id === UUID)
    const index = data.tasks.indexOf(targetTask)
    data.tasks.splice(index, 1)
    saveData();
    refreshContent();
}



const newTaskBtn = document.getElementById("new-task");
const newTaskModal = document.getElementById("task-modal");
const newTaskCloseBtn = document.getElementById("t-close");
const newTaskForm = document.getElementById("t-form");