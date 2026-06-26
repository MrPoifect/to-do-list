import {addNewTask, data, addNewProject, saveData,
    deleteProject, modifyProjectData, 
} from "./storage.js";
import { projectsContainer, handleProjectSelect, refreshContent } from "./UI.js";
export { renderProjectCard }

const editProjectModal = document.getElementById("edit-project-modal");
const editProjectCloseBtn = document.getElementById("edit-p-close");
const editProjectForm = document.getElementById("edit-p-form")

function renderProjectCard(index) {
    const currentProject = data.projects[index];
    const projectID = currentProject.id;

       
    const newCard = document.createElement("button");
    newCard.classList.add("project-card");
    projectsContainer.appendChild(newCard);

    const newTitle = document.createElement("h3");
    newTitle.classList.add("project-title");
    newTitle.textContent = currentProject.title;
    newCard.appendChild(newTitle);

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("project-buttons")
    newCard.appendChild(buttonDiv);

    const newModifyBtn = document.createElement("button");
    newModifyBtn.classList.add ("modify-btn");
    buttonDiv.appendChild(newModifyBtn);


    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.classList.add ("delete-btn")
    buttonDiv.appendChild(newDeleteBtn);

    newDeleteBtn.addEventListener("click", () => deleteProject(projectID));
    newModifyBtn.addEventListener("click", function () {
        editProjectModal.showModal();
    })
    newCard.addEventListener("click", () => handleProjectSelect(newCard));
    addProjectButtonEvents(index);
}

function addProjectButtonEvents(index) {
    const currentProject = data.projects[index];
    const projectID = currentProject.id;
    const newTitle = editProjectForm.elements['edit-p-title'].value;

    editProjectCloseBtn.addEventListener("click", function (e) {
    e.preventDefault();
    editProjectModal.close();
    })

    editProjectForm.elements['edit-p-title'].value = "";
    editProjectForm.elements['edit-p-title'].placeholder = currentProject.title;

    editProjectForm.addEventListener("submit", function (e) {
        e.preventDefault();
        modifyProjectData(projectID, newTitle);
        editProjectModal.close();
    });



}

