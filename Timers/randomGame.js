function randomGame() {
    let acc=0;

    let x = setInterval(() => {
        let num = Math.floor(Math.random()*100)/100;
        acc++;
        //console.log(num);
        if (num > 0.75){
            console.log(`Number of tries to roll greater than 0.75 is: ${acc}`);
            clearInterval(x);
        }
    }, 1000);
}

randomGame();