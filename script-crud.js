const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const formCancelTask = document.querySelector('.app__form-footer__button--cancel');
const textArea = document.querySelector('.app__form-textarea');
const ulTaskList = document.querySelector('.app__section-task-list');
const pTaskDescription =  document.querySelector('.app__section-active-task-description');

const btnRemoveConcluded = document.getElementById('btn-remover-concluidas');
const btnRemoveAll = document.getElementById('btn-remover-todas');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let selectedTask = null;
let liSelectedTask = null;

function updateTask() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearForm() {
    textArea.value = '';
    formAddTask.classList.add('hidden');
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
        `;
    
    const p = document.createElement('p');
    p.classList.add('app__section-task-list-item-description');
    p.textContent = task.descricao;

    const btn = document.createElement('button');
    btn.classList.add('app_button-edit');

    btn.onclick = () => {
        const newDescription = prompt('Editar tarefa:');
        if (newDescription === null || newDescription.trim() === '') {
            alert('Descrição inválida.');
            return;
        } else {
            p.textContent = newDescription;
            task.descricao = newDescription;
            updateTask();
        }
    }

    const btnImg = document.createElement('img');
    if (html.lang === 'pt-br') {
        btnImg.setAttribute('src', '/imagens/edit.png');
    } else {
        btnImg.setAttribute('src', '../imagens/edit.png');
    }

    btn.append(btnImg);
    li.append(svg, p, btn);

    if(task.completed) {
        li.classList.add('app__section-task-list-item-complete');
        btn.setAttribute('disabled', 'disabled');
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active').forEach(item => {
                item.classList.remove('app__section-task-list-item-active');
            });
    
            if (selectedTask == task) {
                pTaskDescription.textContent = '';
                selectedTask = null;
                liSelectedTask = null;
                return;
            }
    
            selectedTask = task;
            liSelectedTask = li;
            pTaskDescription.textContent = task.descricao;
            
            li.classList.add('app__section-task-list-item-active');
        }
    }

    return li;
}

btnAddTask.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden');
})

formCancelTask.addEventListener('click', clearForm);

formAddTask.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = {
        descricao: textArea.value
    }
    tasks.push(task);
    const taskElement = createTaskElement(task);
    ulTaskList.append(taskElement);
    updateTask();
    clearForm();
})

tasks.forEach(task => {
    const taskElement = createTaskElement(task);
    ulTaskList.append(taskElement);
});

document.addEventListener('focusFinished', () => {
    if (selectedTask && liSelectedTask) {
        liSelectedTask.classList.remove('app__section-task-list-item-active');
        liSelectedTask.classList.add('app__section-task-list-item-complete');
        liSelectedTask.querySelector('button').setAttribute('disabled', 'disabled');

        selectedTask.completed = true;
        updateTask();
    }
})

const removeTasks = (onlyCompleted) => {
    const selector = onlyCompleted ? '.app__section-task-list-item-complete' : '.app__section-task-list-item';
    document.querySelectorAll(selector).forEach(item => {
        item.remove();
    })
    tasks = onlyCompleted ? tasks.filter(task => !task.completed) : [];
    updateTask();
}

btnRemoveConcluded.onclick = () => removeTasks(true);
btnRemoveAll.onclick = () => removeTasks(false);