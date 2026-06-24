import {addNewTask, data, addNewProject, saveData,
    deleteProject
} from "./storage.js";
import { renderProjectCard } from "./cards.js";
import "./UIStyles.css"
export {refreshContent};
export { addButtonEvents };
export {projectsContainer};

const menuBtn = document.getElementById("menu-btn")
const allBtn = document.getElementById("all-btn")
const todayBtn = document.getElementById("today-btn");
const weekBtn = document.getElementById("week-btn");
const importantBtn = document.getElementById("important-btn")
const completedBtn = document.getElementById("completed-btn")


allBtn.addEventListener("click", () => handleNavButton("all"));
todayBtn.addEventListener("click", () => handleNavButton("today"));
weekBtn.addEventListener("click", () => handleNavButton("week"));
importantBtn.addEventListener("click", () => handleNavButton("important"));
completedBtn.addEventListener("click", () => handleNavButton("completed"));

adjustMenuForScreen();


function refreshContent() {
    displayProjects();
    updateProjectList();
    displayTasks();
};

function displayProjects() {
    projectsContainer.innerHTML = "";

    for (let i = 0; i < data.projects.length; i++) {
        renderProjectCard(i);
    };
    const newProjectBtn = document.createElement("button");
    projectsContainer.appendChild(newProjectBtn);
    newProjectBtn.textContent = "New Project"
    newProjectBtn.addEventListener("click", function () {
    newProjectModal.showModal();
    })
}

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



menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
    const menuDiv = document.getElementById("side-bar");
    const sideBarWidth = menuDiv.clientWidth;
    const tasksDiv = document.getElementById("tasks-container");
    if (sideBarWidth > 0) {
        menuDiv.classList.remove("opened");
        menuDiv.classList.add("collapsed");
        tasksDiv.classList.remove("darken");
    } else {
        menuDiv.classList.remove("collapsed");
        menuDiv.classList.add("opened");        
        if (window.screen.width <= 767) {
            tasksDiv.classList.add("darken");
        };
    }
}

function adjustMenuForScreen() {
    const menuDiv = document.getElementById("side-bar");
    if (window.innerWidth <= 767) {
        menuDiv.classList.remove("opened")
        menuDiv.classList.add("collapsed")
    };
    }







const projectsContainer = document.getElementById("projects-container");
const newProjectModal = document.getElementById("project-modal");
const newProjectCloseBtn = document.getElementById("p-close");
const newProjectForm = document.getElementById("p-form");


function addButtonEvents() {


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



function deleteTask(UUID) {
    const targetTask = data.tasks.find(task => task.id === UUID)
    const index = data.tasks.indexOf(targetTask)
    data.tasks.splice(index, 1)
    saveData();
    refreshContent();
}



function handleNavButton(choice) {

const allNavElements = document.getElementsByClassName("nav");

for (let i = 0; i < allNavElements.length; i++) {
    if (allNavElements[i].classList.contains("selected") && 
    !allNavElements[i].classList.contains(choice)) {
        allNavElements[i].classList.remove("selected")
    } else if (allNavElements[i].classList.contains(choice)) {
        allNavElements[i].classList.add("selected")
    }
}
};

    


const newTaskBtn = document.getElementById("new-task");
const newTaskModal = document.getElementById("task-modal");
const newTaskCloseBtn = document.getElementById("t-close");
const newTaskForm = document.getElementById("t-form");