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
    changeColor();
}   
//When page loads create the default grid
createGrid();

//Clear the grid
function resetGrid(){
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.remove());
}
let leftClickedOnTile=false;
//changes the color of the div
function changeColor(){
    const colorPicker=document.querySelector(".color-picker");
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.addEventListener("mousedown",function(e){
            e.preventDefault();
            this.style.backgroundColor=`${colorPicker.value}`;
            this.classList.add("colored");
            leftClickedOnTile=true;
    }));
    squares.forEach(square =>square.addEventListener("mouseenter",function(){
        if(leftClickedOnTile){
            this.style.backgroundColor=`${colorPicker.value}`;
            this.classList.add("colored");
        }
    }) );
    squares.forEach(square =>square.addEventListener("mouseup",function(){
        leftClickedOnTile=false;
    }))

}
mainGrid.addEventListener("mouseleave",function(){
    leftClickedOnTile=false;
})

//add functionality to reset button
const resetButton =document.querySelector(".reset");
resetButton.addEventListener("click",function(){
    resetGrid();
    createGrid();
});

let amount=16;
// ask user to input a number create a grid based on that number
const newButton = document.querySelector(".new");
newButton.addEventListener("click",function(){
    amount=prompt("enter a number between 0-100");  
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

//remove the color effect from the tiles 
const clearButton =document.querySelector(".clear");
clearButton.addEventListener("click",function(){
    const coloredSquares = document.querySelectorAll(".colored");
    coloredSquares.forEach(function(square){
        square.style.removeProperty("background-color");
        square.classList.remove("colored");
    }); 
});

//save function
function createImage(divAmount){
    let canvas=document.createElement("canvas");
    let ctx=canvas.getContext("2d");

    canvas.height=divAmount;
    canvas.width=divAmount;
    
    let imgData=ctx.getImageData(0,0,divAmount,divAmount);
    let data= imgData.data;
 
    let Squares = document.querySelectorAll(".square");
    Squares = Array.from(Squares);
    let j=0;
    for(let i=0;i<data.length;i+=4){

        if(Squares[j].style.backgroundColor){
            let rgb =Squares[j].style.backgroundColor.match(/\d+/g);
            data[i]=parseInt(rgb[0]);
            data[i+1]=parseInt(rgb[1]);
            data[i+2]=parseInt(rgb[2]);
            data[i+3]=255; 
        }
        else{
            data[i]=255;
            data[i+1]=255;
            data[i+2]=255;
            data[i+3]=255; 
        }    
        j++;
    }
    ctx.putImageData(imgData,0,0);
    
    let image = new Image();

    image.src= canvas.toDataURL();
    document.body.appendChild(canvas);
    download(image.src,"name1");
}
//download button adds the image to the screen for now
let downloadButton= document.querySelector(".download");
downloadButton.addEventListener("click",function(){
    createImage(amount);
    
})

var download = function(href, name){
    var link = document.createElement('a');
    link.download = name;
    link.style.opacity = "0";
    document.body.appendChild(link);
    link.href = href;
    link.click();
    link.remove();
  }