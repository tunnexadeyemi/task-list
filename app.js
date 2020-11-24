const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection'); 
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listener 
loadeventlisteners();

// load all event listener 
function loadeventlisteners(){
    //DOM Load Event
document.addEventListener('DOMContentLoaded', getTasks);

// add task event
form.addEventListener('submit', addTask);

// remove task event
taskList.addEventListener('click', removeTask);
//clear task event
clearBtn.addEventListener('click', cleartask);
// filter tasks event
filter.addEventListener('keyup', filterTask);
}

// get task from LS
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null){tasks =[]; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }


    tasks.forEach(function(task){
         // create Li element
const li = document.createElement('li');
// Add class
li.className = 'collection-item';
// create text node and append to li
li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class ="fa fa-remove "></i>';
    // Append the link to li
    li.appendChild(link);
    // append li to ul
   taskList.appendChild(li);

});
}

  


// Add task
function addTask(e) {

    if(taskInput.nodeValue === ''){
        alert('Add a task');

    }

    // create Li element
const li = document.createElement('li');
// Add class
li.className = 'collection-item';
// create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class ="fa fa-remove "></i>';
    // Append the link to li
    li.appendChild(link);
    // append li to ul
   taskList.appendChild(li);

// // store in Local storage

// storeTaskInlocalStorage(taskInput.value);


    // clear input
    taskInput.value = '';

    e.preventDefault();
}
// store task
function storeTaskInlocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks') === null){tasks =[]; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains(
        'delete-item')) {
            if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();


            // remove from LS

            removeTaskFromLocalStorage
            ( e.target.parentElement.parentElement);


          }
        }
    }

// remove form LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks =[]; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks' , JSON.stringify(task));
}



    // clear task
     function cleartask (){
        //  taskList.innerHTML = "";

        // faster
        while(taskList.firstChild){taskList.removeChild(taskList.firstchild);
        }

        // https://jsperf.com/innerhtml-vs-removechild


        // clear from LS
        clearTaskFriomLocalStorage();
     }

     // Clear Task form LS
     function clearTaskfromLocalStorage() {
         localStorage.clear();
     }

     // Filter Task
     function filterTask(e) {
         const text = e.target.value.toLowerCase();
         

         document.querySelectorAll('.collection-item').forEach
         (function(task){
             const item = task. firstChild.textContent;
             if(item.toLowerCase().indexOf(text) != -1){
                 task.style.display ='block';
             }else{
                 task.style.display ='none';
             }
         });
     }