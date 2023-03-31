const mainGrid = document.querySelector(".main-grid");

//create 16*16 grid as default otherwise create an enteredAmount*enteredAmount grid
function createGrid(divAmount=16){
    let padding =100;
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
//When page loads create the default grid
createGrid();

//Clear the grid
function resetGrid(){
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.remove());
}

//add hover class to the divs
function addHover(){
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => square.addEventListener("mouseenter",function(){
        this.classList.add("hover");
    }));
}

//add functionality to reset button
const resetButton =document.querySelector(".reset");
resetButton.addEventListener("click",function(){
    resetGrid();
    createGrid();
});

// ask user to input a number create a grid based on that number
const newButton = document.querySelector(".new");
newButton.addEventListener("click",function(){
    let amount=prompt("enter a number between 0-100");  
    if(!isNaN(amount)){
        amount = parseFloat(amount);
        if(Number.isInteger(amount)){
            if(amount>100 || amount<0)
            {
                alert("Please enter a number between 0-100");
                return;
            }
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
});

//remove the hover effect from the tiles 
const clearButton =document.querySelector(".clear");
clearButton.addEventListener("click",function(){
    const hoveredSquares = document.querySelectorAll(".hover");
    hoveredSquares.forEach(square => square.classList.remove("hover")); 
});

clearButton.addEventListener("click",function(){
    const hoveredSquares = document.querySelectorAll(".hover");
    hoveredSquares.forEach(square => square.classList.remove("hover")); 
});
