//global page elements
const mainGrid = document.querySelector(".main-grid");
const eraseButton=document.querySelector("#erase");
const clearButton =document.querySelector("#clear");
const resetButton =document.querySelector("#reset");
const newButton = document.querySelector("#new");
let downloadButton= document.querySelector("#download");
let brushButton=document.querySelector("#brush");  
const showGridButton=document.querySelector("#showGrid");
const transparentDownloadButton =document.querySelector("#download-transparent");
const whiteDownloadButton= document.querySelector("#download-white");
const dropdown = document.querySelector(".dropdown");

//global variables
let brushSelected=true;
let leftClickedOnTile=false;
let amount=16;
let brushSize=1;
let eraseSelected=false;


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
            draw(this);
            leftClickedOnTile=true;
        }
    }));
    squares.forEach(square =>square.addEventListener("mouseenter",function(){
        if(brushSelected){
            if(leftClickedOnTile){
                draw(this);
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
    if(showGridButton.classList.contains("selected")){
        showGrid();
    }
});


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
    if(showGridButton.classList.contains("selected")){
        showGrid();
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
function createAndDownloadImage(divAmount,mode){
    let canvas=document.createElement("canvas");
    let ctx=canvas.getContext("2d");

    canvas.height=divAmount;
    canvas.width=divAmount;

    let imgData=ctx.getImageData(0,0,divAmount,divAmount);
    let data= imgData.data;

    let Squares = document.querySelectorAll(".square");
    Squares = Array.from(Squares);
    let j=0;
    if(mode==="white"){
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
    }else{
        for(let i=0;i<data.length;i+=4){

            if(Squares[j].style.backgroundColor){
                let rgb =Squares[j].style.backgroundColor.match(/\d+/g);
                data[i]=parseInt(rgb[0]);
                data[i+1]=parseInt(rgb[1]);
                data[i+2]=parseInt(rgb[2]);
                data[i+3]=255;
            }
            j++;
        }
    }
    ctx.putImageData(imgData,0,0);

    download(canvas.toDataURL(),"name1");
}
let download = function(href, name){
    let link = document.createElement('a');
    link.download = name;
    link.style.opacity = "0";
    document.body.appendChild(link);
    link.href = href;
    link.click();
    link.remove();
  }

//download buttons open a dropdown
downloadButton.addEventListener("mouseenter",function(){
        document.getElementById("download-dropdown").classList.toggle("show");

});

//removing cursor from the dropdown hides the dropdown menu
dropdown.addEventListener("mouseleave",function(){
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
})

transparentDownloadButton.addEventListener("click",function(){
    createAndDownloadImage(amount,"transparent");
});

whiteDownloadButton.addEventListener("click",function(){
    createAndDownloadImage(amount,"white");
});


eraseButton.addEventListener("click",function(){
    brushSelected=false;
    eraseSelected=true;
    document.querySelector("#erase").classList.add("selected");
    document.querySelector("#brush").classList.remove("selected");
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
    document.querySelector("#erase").classList.remove("selected");
    document.querySelector("#brush").classList.add("selected");
  })

  function showGrid(){
    let squares=document.querySelectorAll(".square");
    squares= Array.from(squares);
    let width=Math.sqrt(squares.length);
    let height=width;

    //if height is even
    if(height%2===0){
        for(let y=0;y<height;y++){
            for(let x=0;x<width;x++){
                let pos=y*height+x;
                if(y%2===0){
                    if(pos%2===0){
                        squares[pos].classList.toggle("grid-gray");
                    }
                }
                else{
                    if(pos%2===1){
                        squares[pos].classList.toggle("grid-gray");
                    }
                }


            }
        }
    }
    //if the height is odd
    else{
        for(let y=0;y<height;y++){
            for(let x=0;x<width;x++){
                let pos=y*height+x;
                if(y%2===0){
                    if(pos%2===0){
                        squares[pos].classList.toggle("grid-gray");
                    }
                }
                else{
                    if(pos%2===0){
                        squares[pos].classList.toggle("grid-gray");
                    }
                }


            }
        }
    }
  }
  showGridButton.addEventListener("click",function(){
    showGrid();
    this.classList.toggle("selected");
  })

 
  function draw(currentDiv){

    const colorPicker=document.querySelector(".color-picker");
    let squares = document.querySelectorAll(".square");
    squares = Array.from(squares);
    let height=Math.sqrt(squares.length);
    let index =squares.indexOf(currentDiv);
    for(let i=brushSize-1;i>-brushSize;i--){
        if(i>0){
            for(let j=brushSize-i-1;j>-(brushSize-i);j--){
                //check if the element we are trying to reach is inside the array's bounds
                if((index+j+height*i)<squares.length && (index+j+height)>-1){
                    
                    squares[index+j+height*i].style.backgroundColor=`${colorPicker.value}`;
                    squares[index+j+height*i].classList.add("colored");
                }
                else{
                    console.log("out");
                }
            }
        }
        if(i===0){
            for(let j=brushSize-1;j>=-(brushSize-1);j--){
                if((index+j+height*i)<squares.length && (index+j+height)>-1){
                    squares[index+j+height*i].style.backgroundColor=`${colorPicker.value}`;
                    squares[index+j+height*i].classList.add("colored");
                }
            }
        }
        if(i<0){
            for(let j=brushSize+i-1;j>-(brushSize+i);j--){
                //check if the element we are trying to reach is inside the array's bounds
                if((index+j+height*i)>-1){
                    console.log(index+j+height*i);
                    squares[index+j+height*i].style.backgroundColor=`${colorPicker.value}`;
                    squares[index+j+height*i].classList.add("colored");
                }
                else{
                    console.log("out");
                }
            }
        }
    }

}



