
function countdown (num){

    let x = setInterval(() => {
        if(num>0){
            console.log(num--);
        }
        else {
            console.log("DONE!");
            clearInterval(x);
        }
    }, 1000);
}

countdown (4);
