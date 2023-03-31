const mainGrid = document.querySelector(".main-grid");
console.log(mainGrid.clientWidth);

let padding =100;
function createGrid(divAmount=16){

    const squareWidth=(mainGrid.clientWidth-padding) / divAmount;

    for(let i=0;i<divAmount*divAmount;i++){
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width=`${squareWidth}px`;
        square.style.height=`${squareWidth}px`;
        mainGrid.appendChild(square);
    }
    addHover();
}   

createGrid();

function resetGrid(){
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.remove());
}

function addHover(){
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => square.addEventListener("mouseenter",function(){
        this.classList.add("hover");
    }));
}

const resetButton =document.querySelector(".reset");
resetButton.addEventListener("click",function(){
    resetGrid();
    createGrid();
});

const newButton = document.querySelector(".new");

newButton.addEventListener("click",function(){
    let amount=prompt("enter the row number");
    if(!isNaN(amount)){
        amount = parseFloat(amount);
        if(Number.isInteger(amount)){
            resetGrid();
            createGrid(amount);
        }
        else{
            alert("please enter an integer");
        }
    }
    else{
        alert("please enter an integer");
    }
})

