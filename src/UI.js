import { storageController, data } from "./storage.js";
import { cardCreator } from "./cards.js";
import "./UIStyles.css"
import "./sidebar-styles.css"
export {projectsContainer, mainBody, uiController, dataController};

const menuBtn = document.getElementById("menu-btn")
const allBtn = document.getElementById("all-btn")
const todayBtn = document.getElementById("today-btn");
const weekBtn = document.getElementById("week-btn");
const importantBtn = document.getElementById("important-btn")
const completedBtn = document.getElementById("completed-btn")
const mainBody = document.getElementById("main-body");
const projectsContainer = document.getElementById("projects-container");
const newProjectModal = document.getElementById("project-modal");
const newProjectCloseBtn = document.getElementById("p-close");
const newProjectForm = document.getElementById("p-form");
const newTaskModal = document.getElementById("task-modal");
const newTaskCloseBtn = document.getElementById("t-close");
const newTaskForm = document.getElementById("t-form");


adjustMenuForScreen();


const uiController = (() => {

    const addNavButtons = () => {
        allBtn.addEventListener("click", () => highlightNavButton("all"));
        todayBtn.addEventListener("click", () => highlightNavButton("today"));
        weekBtn.addEventListener("click", () => highlightNavButton("week"));
        importantBtn.addEventListener("click", () => highlightNavButton("important"));
        completedBtn.addEventListener("click", () => highlightNavButton("completed"));
        menuBtn.addEventListener("click", toggleMenu);
    }

    function highlightNavButton(choice) {

        const allNavElements = document.getElementsByClassName("nav");
        const allProjectCards = document.getElementsByClassName("project-card");
        //remove highlight from project card
        for (let i = 0; i < allProjectCards.length; i++) {
            if (allProjectCards[i].classList.contains("selected")) {
                allProjectCards[i].classList.remove("selected")
            }
        }

        //remove highlight from old choice and put highlight on new
        for (let i = 0; i < allNavElements.length; i++) {
            if (allNavElements[i].classList.contains("selected") && 
            !allNavElements[i].classList.contains(choice)) {
                allNavElements[i].classList.remove("selected")
            } else if (allNavElements[i].classList.contains(choice)) {
                allNavElements[i].classList.add("selected")
            }
        }
    };

    function highlightProjectSelect(target) {

        const allProjectCards = document.getElementsByClassName("project-card");
        const allNavElements = document.getElementsByClassName("nav");

        for (let i = 0; i < allNavElements.length; i++) {
            if (allNavElements[i].classList.contains("selected")) {
                allNavElements[i].classList.remove("selected")
            }
        }
        for (let i = 0; i < allProjectCards.length; i++) {
            if (allProjectCards[i].classList.contains("selected")) {
                allProjectCards[i].classList.remove("selected")
            }
        }

        target.classList.add("selected")
    };

    function addModalEvents() {
        newProjectCloseBtn.addEventListener("click", function (e) {
        e.preventDefault();
        newProjectModal.close();
        mainBody.classList.remove("blurred");
        })

        newProjectForm.addEventListener("submit", dataController.submitProject);

        newTaskCloseBtn.addEventListener("click", function (e) {
            e.preventDefault();
            mainBody.classList.remove("blurred");
        })

        newTaskForm.addEventListener("submit", submitTask);
    }

    function toggleMenu() {
        console.log("Hi")
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

    function displayProjects() {
        projectsContainer.innerHTML = "";

        for (let i = 0; i < data.projects.length; i++) {
            cardCreator.renderProjectCard(i);
        };
        const newProjectBtn = document.createElement("button");
        projectsContainer.appendChild(newProjectBtn);
        newProjectBtn.textContent = "New Project +";
        newProjectBtn.classList.add("project-card", "new-project-btn");
        newProjectBtn.addEventListener("click", function () {
        newProjectModal.showModal();
        mainBody.classList.add("blurred");
        newProjectForm.elements['p-title'].value = "";
        })
    }

    function refreshContent() {
        displayProjects();
        updateProjectList();
    }

    
    addNavButtons();
    return {addNavButtons, refreshContent, addModalEvents, highlightProjectSelect}
})();


const dataController = (() => {

    function submitProject(e) {
        e.preventDefault();

        const title = document.getElementById("p-form").elements['p-title'].value;

        storageController.addNewProject(title);
        uiController.refreshContent();
        newProjectModal.close();
        mainBody.classList.remove("blurred");
    }

    function deleteTask(UUID) {
        const targetTask = data.tasks.find(task => task.id === UUID)
        const index = data.tasks.indexOf(targetTask)
        data.tasks.splice(index, 1)
        storageController.saveData();
        uiController.refreshContent();
    }



    return {submitProject, deleteTask,}
})();






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


function adjustMenuForScreen() {
    const menuDiv = document.getElementById("side-bar");
    if (window.innerWidth <= 767) {
        menuDiv.classList.remove("opened")
        menuDiv.classList.add("collapsed")
    };
    }







function submitTask(e) {
    e.preventDefault();

    const form = document.getElementById("t-form")

    const title = form.elements['t-title'].value;
    const description = form.elements['t-description'].value;
    const projectIndex = form.elements['project-list'].value;
    const projectID = data.projects[projectIndex].id;
    const dueDate = form.elements['due-date'].value;

    

    storageController.addNewTask(title, projectID, description, dueDate);
    uiController.refreshContent();
    newTaskModal.close();
    mainBody.classList.remove("blurred");

}






