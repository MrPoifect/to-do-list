import {addNewTask, data, addNewProject, saveData,
    deleteProject
} from "./storage.js";
import { projectsContainer } from "./UI.js";
export { renderProjectCard }



function renderProjectCard(index) {
    const currentProject = data.projects[index];
    const projectID = currentProject.id;

       
    const newCard = document.createElement("div");
    newCard.classList.add("project-card");
    projectsContainer.appendChild(newCard);

    const newTitle = document.createElement("h3");
    newTitle.classList.add("project-title");
    newTitle.textContent = currentProject.title;
    newCard.appendChild(newTitle);

    const newModifyBtn = document.createElement("button");
    newModifyBtn.classList.add ("modify-btn");
    newCard.appendChild(newModifyBtn);


    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.classList.add ("delete-btn")
    newDeleteBtn.textContent = "Delete"
    newCard.appendChild(newDeleteBtn);

    newDeleteBtn.addEventListener("click", () => deleteProject(projectID));
}

function modifyProjectCard(index) {

}