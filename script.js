const mainGrid = document.querySelector(".main-grid");
console.log(mainGrid.clientWidth);

let padding =100;
function createGrid(divAmount=16){
   
    for(let i=0;i<divAmount*divAmount;i++){
        const square = document.createElement("div");
        square.classList.add("square");

        let squareWidth=(mainGrid.clientWidth-padding) / divAmount;

        square.style.width=`${squareWidth}px`;
        square.style.height=`${squareWidth}px`;
        mainGrid.appendChild(square);
    }
    addHover();
}   

createGrid();

function addHover(){
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => square.addEventListener("mouseenter",function(){
        this.classList.add("hover");
    }));
}

const resetButton =document.querySelector(".reset");
resetButton.addEventListener("click",function(){
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.remove());
    createGrid();
});

