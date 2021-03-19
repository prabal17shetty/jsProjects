let row = 9;
let col = 9;
let numberOfBomb = 10;
window.random = [];
let points = 0;

for (let i = 0; i < numberOfBomb; i++) {
    let temp = Math.floor(Math.random() * 81) + 1;
    while (window.random.includes(temp)) {
        temp = Math.floor(Math.random() * 81) + 1;
    }
    window.random.push(temp);
}
function removeEL() {
    for (let i = 1; i <= (row * col); i++) {
        let cell = document.getElementById('cell_' + i);
        cell.removeEventListener('click', clicked);
    }
}
function colourChange(x) {
    let cell = document.getElementById('cell_' + x);
    cell.style.backgroundColor = 'green';
    cell.removeEventListener('click', clicked);
}
function showBomb() {
    for (let i = 0; i < numberOfBomb; i++) {
        let cell = document.getElementById('cell_' + window.random[i]);
        cell.style.backgroundImage = 'url(https://img.icons8.com/emoji/48/000000/bomb-emoji.png)';
        cell.style.backgroundColor = 'red';
        cell.style.backgroundSize = 'cover';
    }
}
function result(msg) {
    removeEL();
    showBomb();
    if (msg == 'win') {
        document.getElementById('resultDisplay').innerHTML = 'win';
    }
    else {
        document.getElementById('resultDisplay').innerHTML = 'game over';
    }
}
function isBombClicked(x) {
    if (window.random.includes(x)) {
        return true;
    }
    return false;
}
function clicked(e) {
    let currCell = Number(e.target.getAttribute('id').substr(5));
    let bombClicked = isBombClicked(currCell);
    if (bombClicked) {
        result('game over');
    }
    else {
        points++;
        document.getElementById('gameScore').innerHTML = points;
        colourChange(currCell);
    }
    if (points == 71) {
        result('win');
    }
}
function reset() {
    for (let i = 1; i <= (row * col); i++) {
        let cell = document.getElementById('cell_' + i);
        cell.addEventListener('click', clicked);
        cell.removeAttribute('style');
    }
    document.getElementById('resultDisplay').innerHTML = "";
    document.getElementById('gameScore').innerHTML = "0";
    points = 0;
    while (window.random.length > 0) {
        window.random.pop();
    }
    for (let i = 0; i < numberOfBomb; i++) {
        let temp = Math.floor(Math.random() * 81) + 1;
        while (window.random.includes(temp)) {
            temp = Math.floor(Math.random() * 81) + 1;
        }
        window.random.push(temp);
    }
}
for (let i = 0; i < row; i++) {
    let newRow = document.createElement('div');
    newRow.setAttribute('id', 'grid-row');
    for (let j = 1; j <= col; j++) {
        let id = (9 * i) + j;
        let newCell = document.createElement('div');
        newCell.className = 'grid-cell';
        newCell.setAttribute('id', 'cell_' + id);
        newCell.addEventListener('click', clicked);
        newRow.appendChild(newCell);
    }
    document.getElementById('grid').appendChild(newRow);
}