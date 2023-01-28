class Game {
    constructor(h, w, p1, p2){
        this.players = [p1, p2];
        this.height = h;
        this.width = w;
        this.currPlayer = this.players[0];
        this.makeBoard();
        this.makeHtmlBoard();
    }

    makeBoard(){
        this.board = []
        for (let y = 0; y < this.height; y++) {
            this.board.push(Array.from({ length: this.width }));
          }
    }

    makeHtmlBoard(){
        const board = document.getElementById('board');
        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');
        this.handleGameClick = this.handleClick.bind(this);

        top.addEventListener('click', this.handleGameClick);

        for (let x = 0; x < this.width; x++) {
            const headCell = document.createElement('td');
            headCell.setAttribute('id', x);
            top.append(headCell);
          }
        board.append(top);

        for(let y = 0; y < this.height; y++){
            const row = document.createElement('tr');
            for(let x = 0; x < this.width; x++){
                const cell = document.createElement('td');
                cell.setAttribute(`id`, `${y}-${x}`);
                row.append(cell);
            }
            board.append(row);
        }
    }

    findSpotForCol(x){
        for (let y = this.height - 1; y>=0 ;y--){
            if(!this.board[y][x]){
                return y;
            }
        }
        return null;
    }

    placeInTable(y, x){
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.style.backgroundColor = this.currPlayer.color;
    
        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    }

    endGame(msg){
        alert(msg);
        const top = document.querySelector(`column-top`);
        top.removeEventListener(`Click`, this.handleGameClick);
    }

    handleClick(evt){
        const x = +evt.target.id;
        const y = this.findSpotForCol(x);
        if(y===null){
            return;
        }
        
        this.board[y][x] = this.currPlayer;
        this.placeInTable (y, x);
        if(this.board.every(row => row.every(cell => cell))){
            return this.endGame(`Tie!`);
        }
        if(this.checkForWin()){
            return this.endGame(`The ${this.currPlayer.color} player won!`);
        }
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
            // get "check list" of 4 cells (starting here) for each of the different
            // ways to win
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
    
            // find winner (only checking each win-possibility as needed)
                if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                    return true;
                }
            }
    }
    }
}
  
class Player{
    constructor (color){
        this.color = color;
    }
}

document.getElementById("start-game").addEventListener('click', ()=> {
    let p1 = new Player(document.getElementById(`p1-color`).value);
    let p2 = new Player(document.getElementById(`p2-color`).value);
    new Game(6, 7, p1, p2);
});