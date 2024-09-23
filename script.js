// Data to hold the projects
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let currentProjectIndex = null;

// DOM Elements
const projectForm = document.getElementById('projectForm');
const projectList = document.getElementById('projectList');
const projectDetails = document.getElementById('projectDetails');
const currentProjectName = document.getElementById('currentProjectName');
const teamForm = document.getElementById('teamForm');
const teamList = document.getElementById('teamList');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const progress = document.getElementById('progress');
const backButton = document.getElementById('backButton');

// Load existing projects on page load
document.addEventListener('DOMContentLoaded', () => {
    updateProjectList();
});

// Add new project
projectForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const projectName = document.getElementById('projectName').value;
    const newProject = { name: projectName, team: [], tasks: [] };
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    document.getElementById('projectName').value = '';
    updateProjectList();
});

// Update project list in the UI
function updateProjectList() {
    projectList.innerHTML = '';
    projects.forEach((project, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = project.name;

        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.onclick = () => showProjectDetails(index);
        listItem.appendChild(viewButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteProject(index);
        listItem.appendChild(deleteButton);

        projectList.appendChild(listItem);
    });
}

// Delete a project
function deleteProject(index) {
    projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
    updateProjectList();
}

// Show project details
function showProjectDetails(index) {
    currentProjectIndex = index;
    const project = projects[index];
    currentProjectName.textContent = project.name;

    updateTeamList();
    updateTaskList();
    updateProgress();

    projectList.classList.add('hidden');
    projectDetails.classList.remove('hidden');
    backButton.classList.remove('hidden');
}

// Add team member
teamForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const teamMember = document.getElementById('teamMember').value;
    projects[currentProjectIndex].team.push(teamMember);
    localStorage.setItem('projects', JSON.stringify(projects));
    document.getElementById('teamMember').value = '';
    updateTeamList();
});

// Update team list in the UI
function updateTeamList() {
    const team = projects[currentProjectIndex].team;
    teamList.innerHTML = '';
    team.forEach((member, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = member;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTeamMember(index);
        listItem.appendChild(deleteButton);

        teamList.appendChild(listItem);
    });
}

// Delete team member
function deleteTeamMember(index) {
    projects[currentProjectIndex].team.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
    updateTeamList();
}

// Add task
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const task = { name: taskName, completed: false };
    projects[currentProjectIndex].tasks.push(task);
    localStorage.setItem('projects', JSON.stringify(projects));
    document.getElementById('taskName').value = '';
    updateTaskList();
    updateProgress();
});

// Update task list in the UI
function updateTaskList() {
    const tasks = projects[currentProjectIndex].tasks;
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = task.name;

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Completed' : 'Complete';
        completeButton.onclick = () => toggleTaskCompletion(index);
        listItem.appendChild(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}

// Toggle task completion
function toggleTaskCompletion(index) {
    projects[currentProjectIndex].tasks[index].completed = !projects[currentProjectIndex].tasks[index].completed;
    localStorage.setItem('projects', JSON.stringify(projects));
    updateTaskList();
    updateProgress();
}

// Delete task
function deleteTask(index) {
    projects[currentProjectIndex].tasks.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
    updateTaskList();
    updateProgress();
}

// Update project progress
function updateProgress() {
    const tasks = projects[currentProjectIndex].tasks;
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    progress.textContent = `Completed: ${completedTasks} / ${totalTasks}`;
}

// Back to project list
backButton.addEventListener('click', function () {
    projectList.classList.remove('hidden');
    projectDetails.classList.add('hidden');
    backButton.classList.add('hidden');
});
