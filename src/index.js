const newProjectBtn = document.getElementById("new-project");
const newProjectModal = document.getElementById("project-modal");
const newProjectCloseBtn = document.getElementById("p-close");
const newProjectSubmit = document.getElementById("p-submit");
const newProjectForm = document.getElementById("p-form");


import { data } from "./storage.js"; 
import { addNewProject } from "./storage.js";
import { refreshContent, addButtonEvents, } from "./UI.js";
import { loadData } from "./storage.js";



loadData();
refreshContent();
addButtonEvents();








