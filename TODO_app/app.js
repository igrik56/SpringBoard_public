const form = document.querySelector('#todo_list');
const input = document.querySelector('#new_task');
const list = document.querySelector('#list');

let saveList = JSON.parse(localStorage.getItem('savedList'));

list.addEventListener('click', function(e){
    if(e.target.tagName === 'BUTTON'){
        if(e.target.innerText === 'Done'){
            e.target.parentElement.style.setProperty('text-decoration', 'line-through');
            saveList = document.querySelector('#list').innerHTML;
            localStorage.setItem('savedList', JSON.stringify(saveList));
        }
        if(e.target.innerText === 'Remove task'){  //&& e.target.previousSibling.previousSibling.style === ('text-decoration', 'line-through'))
            e.target.parentElement.remove();
            saveList = document.querySelector('#list').innerHTML;
            localStorage.setItem('savedList', JSON.stringify(saveList));
        }
    };
});

form.addEventListener('submit', function(e){
    e.preventDefault();
    if (input.value !== ''){
        const newTask = document.createElement('li');
        const doneBtn = document.createElement('button');
        doneBtn.innerText = 'Done';
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove task';
    
        newTask.innerText = input.value;
        list.appendChild(newTask);
        newTask.appendChild(doneBtn);
        newTask.appendChild(removeBtn);
        input.value='';
        saveList = document.querySelector('#list').innerHTML;
        localStorage.setItem('savedList', JSON.stringify(saveList));
    }
    else{
        alert(`New task can't be empty`);
    }
});

list.innerHTML = saveList;