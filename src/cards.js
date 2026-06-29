import { storageController, data } from "./storage.js";
import { projectsContainer, uiController, mainBody, dataInterface } from "./UI.js";
export { cardCreator }

const editProjectModal = document.getElementById("edit-project-modal");






function editProject() {
    const submitBtn = document.getElementById("edit-p-submit")
    const editProjectCloseBtn = document.getElementById("edit-p-close");
    const editProjectForm = document.getElementById("edit-p-form")
    const targetProject = data.projects.find(project => project.id === editProjectModal.className)

    editProjectForm.elements['edit-p-title'].value = ""
    editProjectForm.elements['edit-p-title'].placeholder = targetProject.title;



    editProjectCloseBtn.addEventListener("click", function (e) {
        e.preventDefault();
        editProjectModal.close();
        mainBody.classList.remove("blurred");
    })

    editProjectForm.addEventListener("submit", function (e) {
        e.preventDefault();
        storageController.modifyProjectData(editProjectModal.className)
        editProjectModal.close();
        mainBody.classList.remove("blurred");
    })



    editProjectModal.showModal();
    mainBody.classList.add("blurred");
}

const cardCreator = (() => {

    function renderProjectCard(index) {
        const currentProject = data.projects[index];
        const projectID = currentProject.id;

        
        const projectCard = document.createElement("button");
        projectCard.classList.add("project-card");
        projectsContainer.appendChild(projectCard);
        projectCard.id = projectID;

        const projectTitle = document.createElement("h3");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = currentProject.title;
        projectCard.appendChild(projectTitle);

        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("project-buttons")
        projectCard.appendChild(buttonDiv);

        const projectModifyBtn = document.createElement("button");
        projectModifyBtn.classList.add ("modify-btn");
        projectModifyBtn.id = projectID;
        buttonDiv.appendChild(projectModifyBtn);


        const projectDeleteBtn = document.createElement("button");
        projectDeleteBtn.classList.add ("delete-btn")
        buttonDiv.appendChild(projectDeleteBtn);

        projectDeleteBtn.addEventListener("click", function(e) {
            e.stopPropagation(); 
            storageController.deleteProject(projectID)});

        projectModifyBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            editProjectModal.className = projectID;
            editProject();
        })
        projectCard.addEventListener("click", function (e){ 
            e.preventDefault();
            dataInterface.openProject(projectID);

        });
        }

    function renderTaskCard(index) {
        const currentTask = data.tasks[index];
        const taskID = currentTask.id;
        const projectID = currentTask.projectId;
        const taskImportance = currentTask.important;

        const tasksContainer = document.getElementById("tasks-content");
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        tasksContainer.appendChild(taskCard);

        const taskTitle = document.createElement("h3");
        taskTitle.classList.add("task-title");
        taskTitle.textContent = currentTask.title;
        taskCard.appendChild(taskTitle);

        const taskIDDisplay = document.createElement("p");
        taskIDDisplay.textContent = ("Task ID: " + taskID)
        taskCard.appendChild(taskIDDisplay);

        const taskProjectID = document.createElement("p");
        taskProjectID.textContent = ("Project ID: " + projectID)
        taskCard.appendChild(taskProjectID);

        const taskDueDate = document.createElement("p");
        taskDueDate.textContent =("Due date: " + currentTask.dueDate)
        taskCard.appendChild(taskDueDate);

        const taskImportantBtn = document.createElement("button");
        taskImportantBtn.textContent = ("Important: " + taskImportance)
        taskImportantBtn.classList.add(taskImportance)
        taskCard.appendChild(taskImportantBtn)

        const taskDeleteBtn = document.createElement("button");
        taskDeleteBtn.textContent = "Delete"
        taskCard.appendChild(taskDeleteBtn);

        taskImportantBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            dataInterface.toggleTaskImportance(taskID, taskImportantBtn);
        })

        taskDeleteBtn.addEventListener("click", function (e) {
            storageController.deleteTask(taskID);
            tasksContainer.removeChild(taskCard);
        });

    }





    return {renderProjectCard, renderTaskCard, }
})();

