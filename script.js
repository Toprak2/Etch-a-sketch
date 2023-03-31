const mainGrid = document.querySelector(".main-grid");

function Initialize(){
   
   
    for(let i=0;i<16;i++){
        const square = document.createElement("div");
        square.classList.add("square");
        mainGrid.appendChild(square);
    }
    addHover();
}   
Initialize();

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
    Initialize();
});