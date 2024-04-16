const date = document.getElementById('date');
const inputTask = document.getElementById('input-task');
const buttonTask = document.getElementById('button-task');
const listTask = document.querySelector('#ul-list');
const itemList = document.querySelector('#li-list');
const numberDoneTask = document.getElementById('done-tasks');
const numberPendingTask = document.getElementById('pending-tasks');
const iconCheck = 'fa-check-circle';
const iconUncheck = 'fa-circle';
const underline = 'underline';

let id;
let toDoList;
let pendingTask;
let doneTask;

const currentDate = new Date();
date.innerHTML = currentDate.toLocaleDateString('es-ES', {
	weekday: 'long',
	month: 'long',
	day: 'numeric',
	year: 'numeric',
});

buttonTask.addEventListener('click', () => {
	const task = inputTask.value;
	if (task) {
		pendingTask++;
		addTask(task, id, false, false, doneTask, pendingTask);
		toDoList.push({
			name: task,
			id: id,
			done: false,
			eliminate: false,
			doneTask: doneTask,
			pendingTask: pendingTask,
		});
		id++;

		countTask(doneTask, pendingTask);
		console.log(doneTask, pendingTask);
		console.log(toDoList);
		localStorage.setItem('TODO', JSON.stringify(toDoList));
	}
	inputTask.value = '';
});

function addTask(task, id, done, eliminate, doneTask, pendingTask) {
	if (eliminate) {
		return;
	}
	const DONE = done ? iconCheck : iconUncheck;
	const UNDERLINE = done ? underline : '';
	const element = `
                    <li class='li-list' id='li-list'>
                    <i class="far ${DONE} co" data="done" id="${id}"></i>
                    <p class="text ${UNDERLINE}">${task}</p>
                    <i class="fas fa-trash de" data="eliminate" id="${id}"></i>
                    </li> 
                     `;
	listTask.insertAdjacentHTML('beforeend', element);
	doneTask = doneTask;
	pendingTask = pendingTask;
	countTask(doneTask, pendingTask);
	console.dir(listTask);
	console.log(doneTask, pendingTask);
}

document.addEventListener('keyup', function (e) {
	if (e.key == 'Enter') {
		const task = inputTask.value;
		if (task) {
			pendingTask++;
			addTask(task, id, false, false, doneTask, pendingTask);
			toDoList.push({
				name: task,
				id: id,
				done: false,
				eliminate: false,
				doneTask: doneTask,
				pendingTask: pendingTask,
			});
			id++;
			console.log(doneTask, pendingTask);
			console.log(toDoList);
			localStorage.setItem('TODO', JSON.stringify(toDoList));
		}
		inputTask.value = '';
		// numberDoneTask.textContent = doneTask;
		// numberPendingTask.textContent = pendingTask;
		countTask(doneTask, pendingTask);
	}
});

listTask.addEventListener('click', function (e) {
	const iconElement = e.target;
	console.dir(iconElement);
	console.log(iconElement.attributes.data.value);

	if (iconElement.attributes.data.value == 'done') {
		taskDone(iconElement);
	} else if (iconElement.attributes.data.value == 'eliminate') {
		taskEliminate(iconElement);
	}

	//localStorage.setItem('TODO', JSON.stringify(toDoList))
});

function taskDone(iconElement) {
	iconElement.classList.toggle(iconUncheck);
	iconElement.classList.toggle(iconCheck);
	iconElement.parentNode.querySelector('.text').classList.toggle(underline);
	console.log(iconElement.attributes.data);

	toDoList[iconElement.attributes.id.value].done = toDoList[
		iconElement.attributes.id.value
	].done
		? false
		: true;

	if (toDoList[iconElement.attributes.id.value].done) {
		pendingTask--;
		doneTask++;
	} else {
		pendingTask++;
		doneTask--;
	}
	console.log(toDoList);
	countTask(doneTask, pendingTask);
	console.log(doneTask, pendingTask);

	toDoList[id - 1].doneTask = doneTask;
	toDoList[id - 1].pendingTask = pendingTask;
	console.log(toDoList);
	localStorage.setItem('TODO', JSON.stringify(toDoList));
}

function taskEliminate(iconElement) {
	console.log(iconElement.attributes.data);
	iconElement.parentNode.parentNode.removeChild(iconElement.parentNode);
	toDoList[iconElement.attributes.id.value].eliminate = true;

	if (toDoList[iconElement.attributes.id.value].done) {
		doneTask--;
	} else {
		pendingTask--;
	}

	countTask(doneTask, pendingTask);
	console.log(doneTask, pendingTask);
	console.log(toDoList);
	console.log(toDoList[id - 1].doneTask);
	toDoList[id - 1].doneTask = doneTask;
	toDoList[id - 1].pendingTask = pendingTask;
	console.log(toDoList);
	localStorage.setItem('TODO', JSON.stringify(toDoList));
}

function countTask(numDoneTask, numPendingTask) {
	numberDoneTask.textContent = numDoneTask;
	numberPendingTask.textContent = numPendingTask;
	doneTask = numDoneTask;
	pendingTask = numPendingTask;
}

let data = localStorage.getItem('TODO');

if (data) {
	toDoList = JSON.parse(data);
	id = toDoList.length;
	loadList(toDoList);

	console.log(toDoList);
} else {
	toDoList = [];
	id = 0;
	pendingTask = 0;
	doneTask = 0;
}

function loadList(DATA) {
	DATA.forEach(function (i) {
		addTask(i.name, i.id, i.done, i.eliminate, i.doneTask, i.pendingTask);
		countTask(i.doneTask, i.pendingTask);
	});
}

//localStorage.clear()
