const newProjectBtn = document.getElementById("new-project");
const newProjectModal = document.getElementById("project-modal");
const newProjectCloseBtn = document.getElementById("p-close");
const newProjectSubmit = document.getElementById("p-submit");
const newProjectForm = document.getElementById("p-form");


import { data } from "./storage.js"; 
import { addNewProject } from "./storage.js";
import { refreshContent } from "./UI.js";

newProjectBtn.addEventListener("click", function () {
    newProjectModal.showModal();
})

newProjectCloseBtn.addEventListener("click", function (e) {
    e.preventDefault();
    newProjectModal.close();
})

newProjectForm.addEventListener("submit", submitProject);

function submitProject(e) {
    e.preventDefault();

    const title = document.getElementById("p-form").elements['p-title'].value;

    addNewProject(title);
    refreshContent();
}



