const mainGrid = document.querySelector(".main-grid");
let eraseSelected=false;
const eraseButton=document.querySelector("#erase");
const clearButton =document.querySelector("#clear");
let leftClickedOnTile=false;
const resetButton =document.querySelector("#reset");
const newButton = document.querySelector("#new");
let downloadButton= document.querySelector("#download");
let brushButton=document.querySelector("#brush");  
let brushSelected=true;

//create 16*16 grid as default otherwise create an enteredAmount*enteredAmount grid
function createGrid(divAmount=16){
    
    const squareWidth=(mainGrid.clientWidth) / divAmount;

    for(let i=0;i<divAmount*divAmount;i++){
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width=`${squareWidth}px`;
        square.style.height=`${squareWidth}px`;
        mainGrid.appendChild(square);
    }
    changeColor();
    erase();
}   
//When page loads create the default grid
createGrid();

//Clear the grid
function resetGrid(){
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.remove());
}

//changes the color of the div
function changeColor(){
    const colorPicker=document.querySelector(".color-picker");
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => square.addEventListener("mousedown",function(e){
        if(brushSelected){
            e.preventDefault();
            this.style.backgroundColor=`${colorPicker.value}`;
            this.classList.add("colored");
            leftClickedOnTile=true;
        }
    }));
    squares.forEach(square =>square.addEventListener("mouseenter",function(){
        if(brushSelected){
            if(leftClickedOnTile){
                this.style.backgroundColor=`${colorPicker.value}`;
                this.classList.add("colored");
            }
        }
    }) );
    squares.forEach(square =>square.addEventListener("mouseup",function(){
        if(brushSelected){
        leftClickedOnTile=false;
        }
    }))

}
mainGrid.addEventListener("mouseleave",function(){
    leftClickedOnTile=false;
})

//add functionality to reset button
resetButton.addEventListener("click",function(){
    resetGrid();
    createGrid();
});

let amount=16;
// ask user to input a number create a grid based on that number

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
    
    download(canvas.toDataURL(),"name1");
}

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

eraseButton.addEventListener("click",function(){
    brushSelected=false;
    eraseSelected=true;

  });

  function erase(){
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => square.addEventListener("mousedown",function(e){
        if(eraseSelected){
            e.preventDefault();
            this.style.removeProperty("background-color");
            this.classList.remove("colored");
            leftClickedOnTile=true;
        }
    }));
    squares.forEach(square =>square.addEventListener("mouseenter",function(){
        if(eraseSelected){
            if(leftClickedOnTile){
                this.style.removeProperty("background-color");
                this.classList.remove("colored");
            }
         }
    }) );

        squares.forEach(square =>square.addEventListener("mouseup",function(){
            if(eraseSelected){
                leftClickedOnTile=false;
            }
        }))
    
  }

  brushButton.addEventListener("click",function(){
    brushSelected=true;
    eraseSelected=false;
  })