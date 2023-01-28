
const x = document.getElementById('container')
const container = document.querySelector('#container');
const y = document.querySelectorAll('li.second');
const z = document.querySelector('ol').querySelector('.third');

container.textContent = "Hello";

const f = document.querySelector('.footer');
f.classList.add('main');
f.classList.remove('main');

const g = document.querySelector('ol');
const newLine = document.createElement('li');
newLine.innerText = 'four';
x.append(newLine);

const listOfItems = document.querySelector('ol').querySelectorAll('li');
for (let item of listOfItems){
    item.style.color = "green";
}

const removeFooter = document.querySelector('div.footer').remove();