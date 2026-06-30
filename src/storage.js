import { dataInterface, uiController,} from "./UI.js";

export {data};
export { storageController };




const data = {
    projects: [],
    tasks: []
};

const storageController = (() => {

    function addNewProject(title) {
        const UUID = crypto.randomUUID()

        data.projects.push(new Project(title, UUID));
        saveData();
        uiController.refreshContent(); 
        dataInterface.openProject(UUID);
        };

    function modifyProjectData(UUID) {

        const targetProject = data.projects.find(project => project.id === UUID)
        const title = document.getElementById("edit-p-form").elements['edit-p-title'].value;

        targetProject.title = title;
        saveData();
        uiController.refreshContent();
}

    function deleteProject(UUID) {
        //delete all child tasks first
        for (let i = data.tasks.length - 1; i >= 0; i--) { 
            if (data.tasks[i].projectId === UUID) {
                data.tasks.splice(i, 1);
            }
        }
        const targetProject = data.projects.find(project => project.id === UUID)
        const projectIndex = data.projects.indexOf(targetProject);
        data.projects.splice(projectIndex, 1);
        saveData();
        uiController.refreshContent();
        dataInterface.openAllTasks();
    }

    function addNewTask(title, projectId, description, dueDate, important,) {
        const UUID = crypto.randomUUID();

        data.tasks.push(new Task(title, UUID, projectId, description, dueDate, important,));
        saveData();
    }

    function modifyTaskData(UUID, form) {
        
        const targetTask = data.tasks.find(task => task.id === UUID)
        const title = form.elements['edit-t-title'].value;
        const description = form.elements['edit-t-description'].value;
        const dueDate = form.elements['edit-t-duedate'].value;

        targetTask.title = title;
        targetTask.description = description;
        targetTask.dueDate = dueDate;

        saveData();
        uiController.refreshContent();

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
        saveData();
        uiController.refreshContent();
    }

    function toggleTaskComplete(UUID, btn, fadeDiv) {
        const targetTask = data.tasks.find(task => task.id === UUID);

        if (targetTask.completed) {
            targetTask.completed = false;
            btn.classList.remove("true");
            fadeDiv.classList.remove("fade");
        } else {
            targetTask.completed = true;
            btn.classList.add("true");
            fadeDiv.classList.add("fade");
        }
        saveData();
        uiController.refreshContent();
    }

    function toggleTaskExpand(UUID, btn, div) {
        const targetTask = data.tasks.find(task => task.id === UUID);

        if (targetTask.expanded) {
            targetTask.expanded = false;
            btn.classList.remove("true");
            div.classList.remove("true")
        } else {
            targetTask.expanded = true;
            btn.classList.add("true");
            div.classList.add("true")
        }
        saveData();
    }

    function deleteTask(UUID) {
        const targetTask = data.tasks.find(task => task.id === UUID)
        const taskIndex = data.tasks.indexOf(targetTask);
        data.tasks.splice(taskIndex, 1);
        saveData();
        uiController.refreshContent();
    }

    function saveData() {
    localStorage.setItem("todoData", JSON.stringify(data));
    };

    function loadData() {
    const storedData = JSON.parse(localStorage.getItem("todoData"))
    if (storedData) {
        data.projects = storedData.projects;
        data.tasks = storedData.tasks;
    }
}


return {addNewProject, modifyProjectData, deleteProject, addNewTask, 
    loadData, deleteTask, toggleTaskImportance, toggleTaskComplete,
    toggleTaskExpand, modifyTaskData, }
})();


function Project(title, id) {
    if (!new.target) {
        throw Error("Must use 'new' operator")
    }
    this.title = title;
    this.id = id;
}

function Task(title, id, projectId, description, dueDate, important,) {
    if (!new.target) {
        throw Error("Must use 'new' operator")
    }
    this.title = title;
    this.id = id;
    this.projectId = projectId;
    this.description = description;
    this.dueDate = dueDate;
    this.important = important;
    this.completed = false;
    this.expanded = false;
}

















