const mainGrid = document.querySelector(".main-grid");

function Initialize(){
   
   
    for(let i=0;i<16;i++){
        const square = document.createElement("div");
        square.classList.add("square");
        mainGrid.appendChild(square);
    }
}   
Initialize();