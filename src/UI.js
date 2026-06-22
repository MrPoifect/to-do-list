import {data} from "./storage.js";
export {refreshContent};





function refreshContent() {
    displayProjects();
};

function displayProjects() {

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
        newID.textContent = projectID
        newCard.appendChild(newID);
    };
};



