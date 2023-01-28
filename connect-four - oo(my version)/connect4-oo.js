class Game{
    constructor(h,w,p1,p2){
        this.height = h;
        this.width = w;
        this.players = [p1, p2];
        this.currPlayer = this.players[0];
        this.makeBoard();
        this.makeHtmlBoard();
    }
    
    makeBoard(){
        this.board =[];
        for(let i = 0; i<this.height;i++){
            this.board.push(Array.from({ length: this.width }));
        }
    }

    makeHtmlBoard(){
        const htmlBoard = document.querySelector(`#board`);
        const top = document.createElement(`tr`);
        top.setAttribute(`id`, `column-top`);
        this.handleGameClick = this.handleClick.bind(this);
        top.addEventListener(`click`, this.handleGameClick);

        for(let x = 0; x<this.width; x++){
            let headCell = document.createElement(`td`);
            headCell.setAttribute(`id`, x);
            top.append(headCell);
        }
        htmlBoard.append(top);

        for(let y=0;y<this.height;y++){
            const row = document.createElement(`tr`);
            for(let x=0; x<this.width; x++){
                const cell = document.createElement(`td`);
                cell.setAttribute(`id`, `${y}-${x}`);
                row.append(cell);
            }
            htmlBoard.append(row);
        }
    }

    findSpotForCol(x){
        for (let y = this.height - 1; y>=0 ; y--){
            if(!this.board[y][x]){
                return y;
            }
        }
        return null;
    }

    placeInTable(y, x){
        const piece = document.createElement(`div`);
        piece.classList.add(`piece`);
        piece.style.backgroundColor = this.currPlayer.color;

        const place = document.getElementById(`${y}-${x}`);
        place.append(piece);
    }

    endGame(msg){
        setTimeout(() => {
            alert(msg);
        }, 1);
        const top = document.querySelector(`#column-top`);
        top.removeEventListener(`Click`, this.handleGameClick);
    }

    handleClick(evt){
        let x = +evt.target.id;
        const y = this.findSpotForCol(x);
        if(y === null){
            return;
        }       
        
        this.board[y][x] = this.currPlayer;
        this.placeInTable (y, x);
        
        if(this.checkForWin()){
            return this.endGame(`${this.currPlayer.color} won!`);
        }
        if(this.board.every(row => row.every(cell => cell))) return this.endGame(`Draw`);

        this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
        
    }

    checkForWin(){
        const _win = cells =>
        cells.every(
          ([y, x]) =>
            y >= 0 &&
            y < this.height &&
            x >= 0 &&
            x < this.width &&
            this.board[y][x] === this.currPlayer
        );
  
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
    
                if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                    return true;
                }
            }
        }
    }
}

class Player{
    constructor(color){
        this.color = color;
    }
}

document.getElementById(`start`).addEventListener(`click`, () => {
    let p1 = new Player(document.getElementById(`p1-color`).value);
    let p2 = new Player(document.getElementById(`p2-color`).value);
    new Game (6,7,p1,p2);
})
document.documentElement.style.backgroundColor = `black`;