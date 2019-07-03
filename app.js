"use strict";
let ongoingTodosChild = document.getElementById('ongoing-todos-child');
let completedTodosChild = document.getElementById('completed-todos-child');
let $button = $('#btn-add-task');
let input = document.getElementById('new-task');
let textInput = document.querySelector('input[type=text]');
let $ongoingTab = $('#ongoing-tab');
let $completedTab = $('#completed-tab');
let $allTaskTab = $('#all-task-tab');
let $removeTaskTab = $('#remove-task-tab');
let $tabButton = $(".tab-button");
let allTaskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
let KEYCODE_ENTER = 13;
let KEYCODE_ESC = 27;
let i = 0;

localStorage.setItem('tasks', JSON.stringify(allTaskList));

let inputEvent = () => {
  createTodoItem(input.value)
};

let deleteAllTask = function() {      // Delete an existing task
  localStorage.clear();
  ongoingTodosChild.innerHTML ='';
  completedTodosChild.innerHTML ='';
  allTaskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  i = 0;
};

$(document).ready(() => {
  $removeTaskTab.on('click', deleteAllTask);

  $button.on('click', inputEvent);

  $ongoingTab.on('click', ()=>{
    openTab('event', 'ongoing-todos','ongoing-tab')
  });

  $completedTab.on('click', ()=>{
    openTab('event', 'completed-todos','completed-tab')
  });

  $allTaskTab.on('click', ()=>{
    $(".tabcontent").show();
    $tabButton.removeClass('selected');
    $('#all-task-tab').addClass('selected');

  });

  let openTab = (evt, taskList, tabName) => {

    $(".tabcontent").hide();
    $tabButton.removeClass('selected');

    $(`#${taskList}`).show();
    $(`#${tabName}`).addClass('selected');
  };

  $( ".defaultOpen" ).trigger( "click" );

});


let checkEvent = () => {

  let title = document.getElementById(`title${i}`);
  let checkbox = document.getElementById(`targetBox${i}`);
  let item = document.getElementById(`todo-div${i}`);
  let getId = item.getAttribute('id').match(/\d+/g);

  checkbox.addEventListener('change', (e) => {

    if (!item.classList.contains("completed-task")) {
      allTaskList[getId].completed = "true";
      item.classList.add('fade');
      item.classList.add('completed-task');
      completedTodosChild.appendChild(item);// Append listItem to incompleteTasksHolder

      console.log('Task completed:');
      console.log(allTaskList[getId]);
    } else {
      allTaskList[getId].completed = 'false';
      ongoingTodosChild.appendChild(item);// Append listItem to incompleteTasksHolder
      item.classList.remove('fade');
      item.classList.remove('completed-task');

      console.log('Task moved to ongoing tab:');
      console.log(allTaskList[getId]);
    }

    localStorage.setItem('tasks', JSON.stringify(allTaskList));
  });

  title.addEventListener('dblclick', (element) => {

    title.innerHTML = "<input type='text' id='editing'>";
    let editTitle = document.getElementById('editing');

    editTitle.focus();
    editTitle.addEventListener('keyup', function (event) {
      if (event.keyCode === KEYCODE_ENTER) {

        if (editTitle.value.trim()==='') {
          title.innerHTML = `${allTaskList[getId].title}`;
        } else {
          allTaskList[getId].title = editTitle.value;
          title.innerHTML = `${editTitle.value}`;
          localStorage.setItem('tasks', JSON.stringify(allTaskList))
        }
      }
      if (event.keyCode === KEYCODE_ESC) {
        title.innerHTML = `${allTaskList[getId].title}`;
      }});

    document.addEventListener("click", function () {
      for (let n=0; n; n++) {
        if (element.id === 'editing') {
          return;
        }
      }
      title.innerHTML = `${allTaskList[getId].title}`;
    });

  });
};

allTaskList.length > 0 ? console.log('Tasks loaded completely:'): null;

allTaskList.forEach(()=> {

  const taskDiv = document.createElement('div');
  const check = document.createElement('input');
  const taskTitle = document.createElement('span');

  allTaskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  localStorage.setItem('tasks', JSON.stringify(allTaskList));

  taskDiv.id = `todo-div${i}`;
  taskDiv.classList.add(`todo-item`);
  check.setAttribute('type', 'checkbox');
  check.id = `targetBox${i}`;

  taskTitle.innerText = allTaskList[i].title;
  taskTitle.classList.add(`task-item`);
  taskTitle.id = `title${i}`;

  console.log(allTaskList[i]);

  taskDiv.appendChild(check);
  taskDiv.appendChild(taskTitle);

  if (allTaskList[i].completed === 'true') {
    completedTodosChild.appendChild(taskDiv);
    taskDiv.classList.add(`completed-task`);
    taskDiv.classList.add(`fade`);
    document.getElementById(`targetBox${i}`).checked = true;
  } else {
    ongoingTodosChild.appendChild(taskDiv);
  }

  checkEvent();

  i++;
  return taskDiv;

}) ;

allTaskList.length > 0 ? i = allTaskList.length: null;

textInput.addEventListener('keyup', function (event) {
  if (event.keyCode === KEYCODE_ENTER) {
    inputEvent()  }
});

let createTodoItem = textInput => {
  //pushing the data as the following parameters
  // [string title, boolean completed]
  if (input.value !== '') {
    allTaskList.push({title: textInput, id: i, completed: "false"});
    localStorage.setItem('tasks', JSON.stringify(allTaskList));
    render()}
};

let render = () => {
  const taskDiv = document.createElement('div');
  const check = document.createElement('input');
  const taskTitle = document.createElement('span');

  allTaskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  localStorage.setItem('tasks', JSON.stringify(allTaskList));

  taskDiv.id = `todo-div${i}`;
  taskDiv.classList.add(`todo-item`);
  taskTitle.classList.add(`task-item`);
  check.setAttribute('type', 'checkbox');
  check.id = `targetBox${i}`;

  taskTitle.innerText = allTaskList[allTaskList.length - 1].title;
  taskTitle.id = `title${i}`;
  console.log('Added a new task:');
  console.log(allTaskList[i]);

  taskDiv.appendChild(check);
  taskDiv.appendChild(taskTitle);
  ongoingTodosChild.appendChild(taskDiv);

  textInput.value = "";

  checkEvent();
  i++;
  return taskDiv;
};
