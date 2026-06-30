import { storageController, data } from "./storage.js";
import { projectsContainer, uiController, mainBody, dataInterface } from "./UI.js";
export { cardCreator }

const editProjectModal = document.getElementById("edit-project-modal");
const editTaskModal = document.getElementById("edit-task-modal");






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

function editTask() {

    const editTaskCloseBtn = document.getElementById("edit-t-close");
    const editTaskForm = document.getElementById("edit-t-form");
    const targetTask = data.tasks.find(task => task.id === editTaskModal.className);

    editTaskForm.elements['edit-t-title'].value = "";
    editTaskForm.elements['edit-t-title'].placeholder = targetTask.title;
    editTaskForm.elements['edit-t-description'].value = ""
    editTaskForm.elements['edit-t-description'].placeholder = targetTask.description;

    editTaskCloseBtn.addEventListener("click", function (e) {
        e.preventDefault();
        editTaskModal.close();
        mainBody.classList.remove("blurred");
    });

    editTaskForm.addEventListener("submit", function (e) {
        e.preventDefault();
        storageController.modifyTaskData(editTaskModal.className, editTaskForm);
        editTaskModal.close();
        mainBody.classList.remove("blurred");
    });

    editTaskModal.showModal();
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
        const parentProject = data.projects.find(project => project.id === currentTask.projectId)
        const taskID = currentTask.id;
        const projectID = currentTask.projectId;
        const taskImportance = currentTask.important;
        const isTaskComplete = currentTask.completed;
        const isTaskExpanded = currentTask.expanded;


        const tasksContainer = document.getElementById("tasks-content");
        const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");
            tasksContainer.appendChild(taskCard);

        const taskMainContent = document.createElement("div");
            taskMainContent.id = "task-main-content";
            taskCard.appendChild(taskMainContent)

        const taskExpandBtn = document.createElement("button");
            taskExpandBtn.id = "task-expand-btn";
            taskExpandBtn.classList.add(isTaskExpanded);
            taskMainContent.appendChild(taskExpandBtn)

        const taskCompletedBtn = document.createElement("button");
            taskCompletedBtn.id = "task-complete-btn";
            taskCompletedBtn.classList.add(isTaskComplete)
            taskMainContent.appendChild(taskCompletedBtn);

        const taskInfoDiv = document.createElement("div");
            taskInfoDiv.id = "task-info"
            taskMainContent.appendChild(taskInfoDiv);

        const taskTitle = document.createElement("h3");
            taskTitle.classList.add("task-title");
            taskTitle.textContent = currentTask.title;
            taskInfoDiv.appendChild(taskTitle);



        const taskProjectID = document.createElement("p");
            taskProjectID.textContent = (parentProject.title)
            taskInfoDiv.appendChild(taskProjectID);


        //Buttons
        const editTaskBtn = document.createElement("button");
            editTaskBtn.id ="task-edit-btn";
            taskMainContent.appendChild(editTaskBtn);


        const taskImportantBtn = document.createElement("button");
            taskImportantBtn.id = "task-important-btn"
            taskImportantBtn.classList.add(taskImportance)
            taskMainContent.appendChild(taskImportantBtn)

        const taskDeleteBtn = document.createElement("button");
            taskDeleteBtn.id = "task-delete-btn"
            taskMainContent.appendChild(taskDeleteBtn);

        //Expanded section    

        const taskExpandDiv = document.createElement("div");
            taskExpandDiv.id = "task-description-container"
            taskExpandDiv.classList.add(isTaskExpanded);
            taskCard.appendChild(taskExpandDiv)

        const taskTitleDupe = document.createElement("h3");
            taskTitleDupe.textContent = currentTask.title;
            taskExpandDiv.appendChild(taskTitleDupe);

        const taskDescription = document.createElement("p");
            taskDescription.textContent = (currentTask.description)
            taskExpandDiv.appendChild(taskDescription);

        //Due Date
        const dueDiv = document.createElement("div");
            dueDiv.textContent = "Due:"
            dueDiv.id = "due-div";
            taskExpandDiv.appendChild(dueDiv)

        const taskDueDate = document.createElement("p");
            taskDueDate.textContent =(currentTask.dueDate)
            taskDueDate.id = "due-date";
            dueDiv.appendChild(taskDueDate);

        const fadeDiv = document.createElement("div");
            fadeDiv.id = "fade-div";
            taskCard.appendChild(fadeDiv);

        //Button events    
        taskImportantBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            storageController.toggleTaskImportance(taskID, taskImportantBtn);
        })

        taskCompletedBtn.addEventListener("click", function (e) {
            e.stopPropagation();

            storageController.toggleTaskComplete(taskID, taskCompletedBtn, fadeDiv);

        })

        editTaskBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            editTaskModal.className = taskID;
            editTask();
        })

        taskDeleteBtn.addEventListener("click", function (e) {
            tasksContainer.removeChild(taskCard);
            storageController.deleteTask(taskID);
        });

        taskExpandBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            storageController.toggleTaskExpand(taskID, taskExpandBtn, taskExpandDiv)
        })

        if (isTaskComplete) {
            fadeDiv.classList.add("fade");
        }
        if (taskImportance) {
            taskImportantBtn.classList.add("true");
        }

    }





    return {renderProjectCard, renderTaskCard, }
})();

