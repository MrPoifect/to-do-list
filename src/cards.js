import {addNewTask, data, addNewProject, saveData,
    deleteProject, modifyProjectData, 
} from "./storage.js";
import { projectsContainer, handleProjectSelect, refreshContent, mainBody } from "./UI.js";
export { renderProjectCard }

const editProjectModal = document.getElementById("edit-project-modal");



function renderProjectCard(index) {
    const currentProject = data.projects[index];
    const projectID = currentProject.id;

       
    const newCard = document.createElement("button");
    newCard.classList.add("project-card");
    projectsContainer.appendChild(newCard);
    newCard.id = projectID;

    const newTitle = document.createElement("h3");
    newTitle.classList.add("project-title");
    newTitle.textContent = currentProject.title;
    newCard.appendChild(newTitle);

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("project-buttons")
    newCard.appendChild(buttonDiv);

    const newModifyBtn = document.createElement("button");
    newModifyBtn.classList.add ("modify-btn");
    newModifyBtn.id = projectID;
    buttonDiv.appendChild(newModifyBtn);


    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.classList.add ("delete-btn")
    buttonDiv.appendChild(newDeleteBtn);

    newDeleteBtn.addEventListener("click", () => deleteProject(projectID));
    newModifyBtn.addEventListener("click", function () {
        editProjectModal.className = projectID;
        editProject();
    })
    newCard.addEventListener("click", () => handleProjectSelect(newCard));
}


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
        modifyProjectData(editProjectModal.className)
        editProjectModal.close();
        mainBody.classList.remove("blurred");
    })



    editProjectModal.showModal();
    mainBody.classList.add("blurred");
}

