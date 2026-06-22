export {data};
export {addNewProject};


const data = {
    projects: [],
    tasks: []
};




function addNewProject(title) {
    const UUID = crypto.randomUUID()

    data.projects.push(new Project(title, UUID))
};



function Project(title, id) {
    if (!new.target) {
        throw Error("Must use 'new' operator")
    }
    this.title = title;
    this.id = id;
}