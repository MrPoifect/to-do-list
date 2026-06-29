import { storageController, data } from "./storage.js";
import { cardCreator } from "./cards.js";
import "./UIStyles.css"
import "./sidebar-styles.css"
import { format, isToday, differenceInCalendarDays } from "date-fns";
export {projectsContainer, mainBody, uiController, dataInterface};

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
        allBtn.addEventListener("click", function (e) {
            highlightNavButton("all");
            dataInterface.openAllTasks();
            adjustMenuForScreen();
        });
        
        todayBtn.addEventListener("click", function (e) { 
            highlightNavButton("today")
            dataInterface.openTodayTasks();
            adjustMenuForScreen();
        });

        weekBtn.addEventListener("click", function (e) {
            highlightNavButton("week")
            dataInterface.openWeekTasks();
            adjustMenuForScreen();
        });

        importantBtn.addEventListener("click", function () {
            highlightNavButton("important")
            dataInterface.openImportantTasks();
            adjustMenuForScreen();
        });

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

    function highlightProjectSelect(UUID) {

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
        const projectCard = document.getElementById(UUID)

        projectCard.classList.add("selected")
    };

    function addModalEvents() {
        newProjectCloseBtn.addEventListener("click", function (e) {
        e.preventDefault();
        newProjectModal.close();
        mainBody.classList.remove("blurred");
        })

        newProjectForm.addEventListener("submit", dataInterface.submitProject);

        newTaskCloseBtn.addEventListener("click", function (e) {
            e.preventDefault();
            mainBody.classList.remove("blurred");
            newTaskModal.close();
        })

        newTaskForm.addEventListener("submit", dataInterface.submitTask);
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

/*    function updateProjectList() {
        const projectList = document.getElementById("project-list");
        projectList.innerHTML = "";
        for (let i = 0; i < data.projects.length; i++) {
            const newOption = document.createElement("option");
            newOption.value = i;
            newOption.innerHTML = data.projects[i].title;
            projectList.add(newOption);
        }
    }*/

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
    }

    function addNewTaskButton(targetProjectID) {
        const tasksContainer = document.getElementById("tasks-content")

        const addTaskBtn = document.createElement("button");
        addTaskBtn.classList.add("new-task-btn")
        addTaskBtn.textContent = "New Task +"
        tasksContainer.appendChild(addTaskBtn)

        addTaskBtn.addEventListener("click", () => { 
            newTaskModal.showModal();
            newTaskModal.classList.add(targetProjectID);
            mainBody.classList.add("blurred"); }
        );
    }


    
    addNavButtons();
    return {addNavButtons, refreshContent, addModalEvents, highlightProjectSelect, addNewTaskButton}
})();


const dataInterface = (() => {

    function submitProject(e) {
        e.preventDefault();

        const title = document.getElementById("p-form").elements['p-title'].value;

        storageController.addNewProject(title);
        uiController.refreshContent();
        newProjectModal.close();
        mainBody.classList.remove("blurred");
    }


    function openProject(UUID) {
        const tasksContainer = document.getElementById("tasks-content")
        const targetProject = data.projects.find(project => project.id === UUID)
        const targetProjectID = targetProject.id;


        const projectTitle = document.createElement("h2");
        projectTitle.textContent = (targetProject.title + " - " + targetProjectID);

        tasksContainer.innerHTML = ""
        tasksContainer.append(projectTitle);
        uiController.addNewTaskButton(targetProjectID);
        adjustMenuForScreen();
        for (let i = 0; i < data.tasks.length; i++) {
            if (data.tasks[i].projectId === targetProjectID) {
                cardCreator.renderTaskCard(i);

            }
        }
        uiController.highlightProjectSelect(UUID);
    }

    function openAllTasks() {
        const tasksContainer = document.getElementById("tasks-content");
        const projectTitle = document.createElement("h2");
        projectTitle.textContent = "All Tasks";

        tasksContainer.innerHTML = ""
        tasksContainer.append(projectTitle);
        for (let i = 0 ; i < data.tasks.length; i++) {
            cardCreator.renderTaskCard(i);
        }
    }

    function submitTask(e) {
        e.preventDefault();

        const form = document.getElementById("t-form")

        const title = form.elements['t-title'].value;
        const description = form.elements['t-description'].value;
        const projectID = newTaskModal.className;
        const dueDate = form.elements['due-date'].value;
        const isImportant = document.getElementById("importance").checked;

        

        storageController.addNewTask(title, projectID, description, dueDate, isImportant);
        uiController.refreshContent();
        openProject(projectID);
        newTaskModal.classList.remove(projectID);
        newTaskModal.close();
        mainBody.classList.remove("blurred");

    }

    function openTodayTasks() {
        const todaysDate = format(new Date(), "yyyy-MM-dd");
        const tasksContainer = document.getElementById("tasks-content");
        const projectTitle = document.createElement("h2");
        projectTitle.textContent = "Due Today";

        tasksContainer.innerHTML = ""
        tasksContainer.append(projectTitle);
        for (let i = 0 ; i < data.tasks.length; i++) {
            if (isToday(data.tasks[i].dueDate))
                {cardCreator.renderTaskCard(i);
                };
        }

    }

    function openWeekTasks() {
        const todaysDate = format(new Date(), "yyyy-MM-dd");
        const tasksContainer = document.getElementById("tasks-content");
        const projectTitle = document.createElement("h2");
        projectTitle.textContent = "Due by next week";

        tasksContainer.innerHTML = ""
        tasksContainer.append(projectTitle);
        for (let i = 0 ; i < data.tasks.length; i++) {
            if (differenceInCalendarDays(data.tasks[i].dueDate, todaysDate) <= 7){
                cardCreator.renderTaskCard(i);
            }
        }
    }

    function openImportantTasks() {
        const tasksContainer = document.getElementById("tasks-content");
        const projectTitle = document.createElement("h2");
        projectTitle.textContent = "Important";

        tasksContainer.innerHTML = ""
        tasksContainer.append(projectTitle);
        for (let i = 0 ; i < data.tasks.length; i++) {
            if (data.tasks[i].important){
                cardCreator.renderTaskCard(i);
            }
        }
    }

    function toggleTaskImportance(UUID, btn) {
        const targetTask = data.tasks.find(task => task.id === UUID)

        if (targetTask.important) {
            targetTask.important = false;
            btn.classList.remove("true");
        } else { 
            targetTask.important = true
            btn.classList.add("true");
            };
    }


    return {submitProject, openProject, submitTask, 
        openAllTasks, openTodayTasks, openWeekTasks, openImportantTasks, toggleTaskImportance}
})();





function adjustMenuForScreen() {
    const menuDiv = document.getElementById("side-bar");
    if (window.innerWidth <= 767) {
        menuDiv.classList.remove("opened")
        menuDiv.classList.add("collapsed")
    };
    }














