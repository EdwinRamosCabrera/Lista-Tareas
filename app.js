const date = document.getElementById('date')
const inputTask = document.getElementById('input-task')
const buttonTask = document.getElementById('button-task')
const listTask = document.querySelector('#ul-list')
const itemList = document.querySelector('#li-list')
const numberDoneTask = document.getElementById('done-tasks')
const numberPendingTask = document.getElementById('pending-tasks')
const iconCheck = 'fa-check-circle'
const iconUncheck = 'fa-circle'
const underline = 'underline'

let id
let toDoList 
let pendingTask 
let doneTask 

const currentDate = new Date()
date.innerHTML = currentDate.toLocaleDateString('es-ES', {weekday: 'long', month:'long', day: 'numeric', year:'numeric'})


buttonTask.addEventListener('click', () => {
    const task = inputTask.value
    if(task){
        addTask(task, id, false, false)
        toDoList.push({
            name: task,
            id: id,
            done: false,
            eliminate: false
        })
        id++
        pendingTask++
        localStorage.setItem('TODO', JSON.stringify(toDoList))
    }
    inputTask.value = ''

    console.log(toDoList);
})


function addTask(task, id, done, eliminate){
    if(eliminate){ 
        return
    }
    const DONE = done? iconCheck : iconUncheck
    const UNDERLINE = done? underline : ''
    const element = `
                    <li class='li-list' id='li-list'>
                    <i class="far ${DONE} co" data="done" id="${id}"></i>
                    <p class="text ${UNDERLINE}">${task}</p>
                    <i class="fas fa-trash de" data="eliminate" id="${id}"></i>
                    </li> 
                     `
    listTask.insertAdjacentHTML("beforeend", element)
    console.dir(listTask);
}

document.addEventListener('keyup', function(e){
    if(e.key == 'Enter'){
        const task = inputTask.value
        if(task){
            addTask(task, id, false, false)
            toDoList.push({
                name: task,
                id: id,
                done: false,
                eliminate: false
            })
            id++
            pendingTask++
            localStorage.setItem('TODO', JSON.stringify(toDoList))
        }
        inputTask.value = ''
        numberDoneTask.textContent = doneTask;
        numberPendingTask.textContent = pendingTask;
        console.log(toDoList);
        console.log(pendingTask);
    }
})

listTask.addEventListener('click', function(e){
    const iconElement = e.target
    console.dir(iconElement); 
    console.log(iconElement.attributes.data.value); 
 
    if(iconElement.attributes.data.value == 'done'){
        taskDone(iconElement)
    } else if(iconElement.attributes.data.value  == 'eliminate'){
        taskEliminate(iconElement)
    }
    localStorage.setItem('TODO', JSON.stringify(toDoList))
})

function taskDone(iconElement){
    iconElement.classList.toggle(iconUncheck)
    iconElement.classList.toggle(iconCheck)
    iconElement.parentNode.querySelector('.text').classList.toggle(underline)
    console.log(iconElement.attributes.data);
    
    toDoList[iconElement.attributes.id.value].done = toDoList[iconElement.attributes.id.value].done? false : true

    if(toDoList[iconElement.attributes.id.value].done){
        pendingTask--
        doneTask++
    } else {
        pendingTask++
        doneTask--
    }
    console.log(toDoList);
    console.log(pendingTask, doneTask);
}

function taskEliminate(iconElement){
    console.log(iconElement.attributes.data);
    iconElement.parentNode.parentNode.removeChild(iconElement.parentNode)
    toDoList[iconElement.attributes.id.value].eliminate = true;

    console.log(toDoList);
    if(toDoList[iconElement.attributes.id.value].done){
        doneTask--
    } else {
        pendingTask--
    }
}

document.addEventListener('click', () => {
    numberDoneTask.textContent = doneTask;
    numberPendingTask.textContent = pendingTask;
})

let data = localStorage.getItem('TODO')
if(data){
    toDoList = JSON.parse(data)
    id = toDoList.length
    loadList(toDoList)
}else {
    toDoList = []
    id = 0
    pendingTask = 0
    doneTask = 0
}

function loadList(DATA){
    DATA.forEach( function(i) {
        addTask(i.name, i.id, i.done, i.eliminate)
    });
}

//localStorage.clear()
