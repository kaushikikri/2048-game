// import Grid from "./Grid.js";

// const gridboard = document.querySelector('.grid');
// const grid = new Grid(gridboard);

document.addEventListener('DOMContentLoaded', () => {
    let score = document.getElementById('score');
    let res = document.querySelector('.result');
    const grid = document.querySelector('.grid');
    let max = 0;
    let width = 4;
    let boxes = [];


    // create the board on webpage
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            let box = document.createElement('div');
            box.innerHTML = 0;
            box.classList.add('box');
            grid.appendChild(box);
            boxes.push(box);
        }
        randomBox();
        randomBox();
    }

    //create random boxes
    function randomBox() {
        let rand = Math.floor(Math.random() * boxes.length);
        if (boxes[rand].innerHTML == 0) {
            boxes[rand].innerHTML = 2;
            loose();
        }
        else
            randomBox();
    }

    //start lostening to keyup events
    document.addEventListener('keyup', controls);

    function controls(e) {
        if (e.key == 'ArrowRight') {
            keyRight();
        }
        else if (e.key == 'ArrowLeft') {
            keyLeft();
        }
        else if (e.key == 'ArrowUp') {
            keyUp();
        }
        else if (e.key == 'ArrowDown') {
            keyDown();
        }
    }

    //when right key is pressed
    function keyRight() {
        right();
        combineRow();
        right();
        randomBox();
    }

    //when leftt key is pressed
    function keyLeft() {
        left();
        combineRow();
        left();
        randomBox();
    }

    //when down key is pressed
    function keyDown() {
        down();
        combinecol();
        down();
        randomBox();
    }

    //when up key is pressed
    function keyUp() {
        up();
        combinecol();
        up();
        randomBox();
    }

    //add adjecent equal elements in row
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (boxes[i].innerHTML === boxes[i + 1].innerHTML) {
                let total = parseInt(boxes[i].innerHTML) + parseInt(boxes[i + 1].innerHTML);
                boxes[i + 1].innerHTML = 0;
                boxes[i].innerHTML = total;
            }
        }
        win();
        max++;
        score.innerHTML = max;
    }

    //add adjecent equal elements in column
    function combinecol() {
        for (let i = 0; i < 12; i++) {
            if (boxes[i].innerHTML === boxes[i + width].innerHTML) {
                let total = parseInt(boxes[i].innerHTML) + parseInt(boxes[i + width].innerHTML);
                boxes[i + width].innerHTML = 0;
                boxes[i].innerHTML = total;
            }
        }
        win();
        max++;
        score.innerHTML = max;
    }


    //swipe right
    function right() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 == 0) {
                let a = boxes[i].innerHTML;
                let b = boxes[i + 1].innerHTML;
                let c = boxes[i + 2].innerHTML;
                let d = boxes[i + 3].innerHTML;
                let square = [parseInt(a), parseInt(b), parseInt(c), parseInt(d)];

                let newS = square.filter(num => num);
                let missing = Array(4 - newS.length).fill(0);
                let finals = missing.concat(newS);

                boxes[i].innerHTML = finals[0];
                boxes[i + 1].innerHTML = finals[1];
                boxes[i + 2].innerHTML = finals[2];
                boxes[i + 3].innerHTML = finals[3];
            }
        }
    }

    //swipe left
    function left() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 == 0) {
                let a = boxes[i].innerHTML;
                let b = boxes[i + 1].innerHTML;
                let c = boxes[i + 2].innerHTML;
                let d = boxes[i + 3].innerHTML;
                let square = [parseInt(a), parseInt(b), parseInt(c), parseInt(d)];

                let newS = square.filter(num => num);
                let missing = Array(4 - newS.length).fill(0);
                let finals = newS.concat(missing);

                boxes[i].innerHTML = finals[0];
                boxes[i + 1].innerHTML = finals[1];
                boxes[i + 2].innerHTML = finals[2];
                boxes[i + 3].innerHTML = finals[3];

            }
        }
    }

    //swipe down
    function down() {
        for (let i = 0; i < 4; i++) {
            let a = boxes[i].innerHTML;
            let b = boxes[i + width].innerHTML;
            let c = boxes[i + width * 2].innerHTML;
            let d = boxes[i + width * 3].innerHTML;
            let square = [parseInt(a), parseInt(b), parseInt(c), parseInt(d)];

            let newS = square.filter(num => num);
            let missing = Array(4 - newS.length).fill(0);
            let finals = missing.concat(newS);

            boxes[i].innerHTML = finals[0];
            boxes[i + width].innerHTML = finals[1];
            boxes[i + (width * 2)].innerHTML = finals[2];
            boxes[i + (width * 3)].innerHTML = finals[3];
        }
    }

    //swipe up
    function up() {
        for (let i = 0; i < 4; i++) {
            let a = boxes[i].innerHTML;
            let b = boxes[i + width].innerHTML;
            let c = boxes[i + width * 2].innerHTML;
            let d = boxes[i + width * 3].innerHTML;
            let square = [parseInt(a), parseInt(b), parseInt(c), parseInt(d)];

            let newS = square.filter(num => num);
            let missing = Array(4 - newS.length).fill(0);
            let finals = newS.concat(missing);

            boxes[i].innerHTML = finals[0];
            boxes[i + width].innerHTML = finals[1];
            boxes[i + (width * 2)].innerHTML = finals[2];
            boxes[i + (width * 3)].innerHTML = finals[3];
        }
    }

    //check for win
    function win() {
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].innerHTML == 2048) {
                boxes[i].classList.add('win');
                res.innerHTML = "You Won!";
                document.removeEventListener('keyup', controls);
                setTimeout(() => {
                    boxes[i].classList.remove('win');
                    reset();
                }, 2000);
            }
        }
        return false;
    }

    //check for loose
    function loose() {
        let count = 0;
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].innerHTML == 0) {
                count++;
            }
        }
        if (count == 0) {
            res.innerHTML = "You loose!";
            document.removeEventListener('keyup', controls);
            setTimeout(reset, 2000);
        }
        return false;
    }

    //reset
    function reset() {
        res.innerHTML = "";
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].innerHTML = 0;
        }
        randomBox();
        randomBox();
        document.addEventListener('keyup', controls);

    }

    //everything starts from here only
    createBoard();
})