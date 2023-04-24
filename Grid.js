const row = 4;
const col = 20;
const gap = 2;

export default class Grid {
    constructor(gridboard) {
        gridboard.style.setProperty("--row", row);
        gridboard.style.setProperty("--col", `${col}vmin`);
        gridboard.style.setProperty("--gap", `${gap}vmin`);
        this.box =createBoard(gridboard).map((b)=>{

        })
    }
}

class Box {
    constructor(box, x, y) {
        this.box = box;
        this.x = x;
        this.y = y;
    }
}

function createBoard(gridboard) {
    let boxes = [];
    for (let i = 0; i < row * row; i++) {
        let box = document.createElement('div');
        // box.innerHTML = 0;
        box.classList.add('box');
        gridboard.append(box);
        boxes.push(box);
    }
    return boxes;
    // randomBox();
    // randomBox();
}