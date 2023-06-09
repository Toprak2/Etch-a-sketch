//global page elements
const mainGrid = document.querySelector(".main-grid");
const eraseButton=document.querySelector("#erase");
const clearButton =document.querySelector("#clear");
const resetButton =document.querySelector("#reset");
const newGridRange = document.querySelector("#new-grid-range");
const confirmButton =document.querySelector("#confirm");
let downloadButton= document.querySelector("#download");
let brushButton=document.querySelector("#brush");  
const showGridButton=document.querySelector("#showGrid");
const transparentDownloadButton =document.querySelector("#download-transparent");
const whiteDownloadButton= document.querySelector("#download-white");
const dropdown = document.querySelector(".dropdown");
const brushSizeRange=document.querySelector("#brush-size-range");
const brushSizeNumber=document.querySelector("#brush-size-number");
const eraserSizeRange=document.querySelector("#eraser-size-range");
const eraserSizeNumber=document.querySelector("#eraser-size-number");

//global variables
let brushSelected=true; 
let leftClickedOnTile=false;
let amount=16;
let brushSize=1;
let eraserSize=1;
let eraseSelected=false;
let rainbowMode=false;
const rainbowColors= ["rgb(255,0,0)","rgb(255,127,0)","rgb(255,255,0)","rgb(0,255,0)","rgb(0,0,255)","rgb(75,0,130)","rgb(148,0,211)"];
//event listeners
mainGrid.addEventListener("mouseleave",function(){
    leftClickedOnTile=false;
})

document.querySelector("#rainbow").addEventListener("click",function(){
    if(rainbowMode){
        rainbowMode=false;
    }
    else{
        rainbowMode=true;
    }
    this.classList.toggle("selected");
})

brushSizeRange.addEventListener("input",function(){
    let size = parseInt(this.value);
    brushSize=size;
    brushSizeNumber.value=size;
});

brushSizeNumber.addEventListener("input",function(){
    let size = parseInt(this.value);
    brushSize=size;
    brushSizeRange.value=size;  
});

eraserSizeRange.addEventListener("input",function(){
    let size = parseInt(this.value);
    eraserSize=size;
    eraserSizeNumber.value=size;
});

eraserSizeNumber.addEventListener("input",function(){
    let size = parseInt(this.value);
    eraserSize=size;
    eraserSizeRange.value=size;  
});
newGridRange.addEventListener("input",function(){
   let displayText= document.querySelector("#new-grid-value");
   let value =newGridRange.value;
   let newText = value+"X"+value;
   displayText.textContent =newText;
})

confirmButton.addEventListener("click",function(){
    let value=parseInt(newGridRange.value);
    resetGrid();
    createGrid(value);
    amount=value;
    if(showGridButton.classList.contains("selected")){
        showGrid();
    }
})

//add functionality to reset button
resetButton.addEventListener("click",function(){
    resetGrid();
    createGrid();
    if(showGridButton.classList.contains("selected")){
        showGrid();
    }
});

brushButton.addEventListener("click",function(){
    brushSelected=true;
    eraseSelected=false;
    document.querySelector("#erase").classList.remove("selected");
    document.querySelector("#brush").classList.add("selected");
    document.querySelector("#brush-size").classList.remove("hide");
    document.querySelector("#eraser-size").classList.add("hide");
  })

//remove the color effect from the tiles 
clearButton.addEventListener("click",function(){
    const coloredSquares = document.querySelectorAll(".colored");
    coloredSquares.forEach(function(square){
        square.style.removeProperty("background-color");
        square.classList.remove("colored");
    }); 
});

//download buttons open a dropdown
downloadButton.addEventListener("mouseenter",function(){
    document.getElementById("download-dropdown").classList.toggle("show-dropdown");

});

//removing cursor from the dropdown hides the dropdown menu
dropdown.addEventListener("mouseleave",function(){
let dropdowns = document.getElementsByClassName("dropdown-content");
let i;
for (i = 0; i < dropdowns.length; i++) {
  let openDropdown = dropdowns[i];
  if (openDropdown.classList.contains('show-dropdown')) {
    openDropdown.classList.remove('show-dropdown');
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
document.querySelector("#eraser-size").classList.remove("hide");
document.querySelector("#brush-size").classList.add("hide");
});

showGridButton.addEventListener("click",function(){
    showGrid();
    this.classList.toggle("selected");
 })


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
    InitEraser();
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
document.querySelector("#upload").addEventListener("change",function(event){
    const imageFile = URL.createObjectURL(event.target.files[0]);
    createImage(imageFile, convertImage);
})
function createImage(imageFile, callback) {
    
    const image = document.createElement('img');
    image.onload = () => callback(image);
    image.setAttribute('src', imageFile);
  };
  
function convertImage(image) {

    const canvas = drawImageToCanvas(image);
    if(canvas.height>100){
        alert("Please enter an image with 100x100 max pixel size");
        return;
    }
    const ctx = canvas.getContext('2d',);
    let result = [];
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            result.push([]);
        let data = ctx.getImageData(x, y, 1, 1).data;
        let index=y*canvas.height+x;
        result[index].push(data[0]);
        result[index].push(data[1]);
        result[index].push(data[2]);
        }
    }

    let length = Math.sqrt(result.length);
    resetGrid();
    amount=length;
    createGrid(length);
    let squares =document.querySelectorAll(".square");
    squares =Array.from(squares);
    for(let index=0;index<result.length;index++){

        let r= result[index][0];
        let g = result[index][1];
        let b =result[index][2];
        let rgb=`rgb(${r},${g},${b})`;
       
        squares[index].style.backgroundColor=rgb;
        squares[index].classList.add("colored");
    }
}


function drawImageToCanvas(image) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
    return canvas;
}


function InitEraser(){
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => square.addEventListener("mousedown",function(e){
        if(eraseSelected){
            e.preventDefault();
            erase(this);
            leftClickedOnTile=true;
        }
    }));
    squares.forEach(square =>square.addEventListener("mouseenter",function(){
        if(eraseSelected){
            if(leftClickedOnTile){
                erase(this);
            }
         }
    }) );

        squares.forEach(square =>square.addEventListener("mouseup",function(){
            if(eraseSelected){
                leftClickedOnTile=false;
            }
        }))

}
function erase(currentDiv){

    let squares = document.querySelectorAll(".square");
    squares = Array.from(squares);
    let height=Math.sqrt(squares.length);
    let index =squares.indexOf(currentDiv);
    for(let i=eraserSize-1;i>-eraserSize;i--){
        if(i>0){
            for(let j=eraserSize-i-1;j>-(eraserSize-i);j--){
                let divToDraw=index+j+height*i;
    
                //check if the element we are trying to reach is inside the array's bounds
                if((divToDraw)<squares.length && (index+j+height)>-1){
                    
                    let divYPos= Math.trunc(divToDraw/height);
                    let rowToDraw=Math.trunc((index+height*i)/height);
                    if(divYPos===rowToDraw){
                        squares[divToDraw].style.removeProperty("background-color");
                        squares[divToDraw].classList.remove("colored");
                    }
                }
            }
        }
        if(i===0){
            for(let j=eraserSize-1;j>=-(eraserSize-1);j--){
                let divToDraw=index+j+height*i;
    
                //check if the element we are trying to reach is inside the array's bounds
                if((divToDraw)<squares.length && (index+j+height)>-1){
                    let divYPos= Math.trunc(divToDraw/height);
                    let rowToDraw=Math.trunc((index+height*i)/height);
                    if(divYPos===rowToDraw){
                    squares[divToDraw].style.removeProperty("background-color");
                    squares[divToDraw].classList.remove("colored");
                    }
                }
            }
        }
        if(i<0){
            for(let j=eraserSize+i-1;j>-(eraserSize+i);j--){
                let divToDraw=index+j+height*i;
    
                //check if the element we are trying to reach is inside the array's bounds
                    if((divToDraw)>-1){
                        //if the divs are above the grid don't draw
                        if(index+height*i<0){
                            continue;
                        }
                        let divYPos= Math.trunc(divToDraw/height);
                        let rowToDraw=Math.trunc((index+height*i)/height);
                        if(divYPos===rowToDraw){
                        squares[divToDraw].style.removeProperty("background-color");
                        squares[divToDraw].classList.remove("colored");
                        }
                    }
                }
            }
        }
    }

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


 let getNextColorIndex =(function (){
    let index=0;
    
    return function(){if(index===7){
        index=0;
    }return index++;};
 })();

function draw(currentDiv){

 
const colorPicker=document.querySelector(".color-picker");
let squares = document.querySelectorAll(".square");
squares = Array.from(squares);
let height=Math.sqrt(squares.length);
let index =squares.indexOf(currentDiv);
if(rainbowMode){
    
    for(let i=brushSize-1;i>-brushSize;i--){

        
        if(i>0){
            for(let j=brushSize-i-1;j>-(brushSize-i);j--){
                let divToDraw=index+j+height*i;

                //check if the element we are trying to reach is inside the array's bounds
                if((divToDraw)<squares.length && (index+j+height)>-1){
                    
                    let divYPos= Math.trunc(divToDraw/height);
                    let rowToDraw=Math.trunc((index+height*i)/height);
                    if(divYPos===rowToDraw){
                        squares[divToDraw].style.backgroundColor=rainbowColors[getNextColorIndex()];
                        squares[divToDraw].classList.add("colored");
                    }
                }
            }
        }
        if(i===0){
            for(let j=brushSize-1;j>=-(brushSize-1);j--){
                let divToDraw=index+j+height*i;

                //check if the element we are trying to reach is inside the array's bounds
                if((divToDraw)<squares.length && (index+j+height)>-1){
                    let divYPos= Math.trunc(divToDraw/height);
                    let rowToDraw=Math.trunc((index+height*i)/height);
                    if(divYPos===rowToDraw){
                    squares[divToDraw].style.backgroundColor=rainbowColors[getNextColorIndex()];
                    squares[divToDraw].classList.add("colored");
                    }
                }
            }
        }
        if(i<0){
            for(let j=brushSize+i-1;j>-(brushSize+i);j--){
                let divToDraw=index+j+height*i;

                //check if the element we are trying to reach is inside the array's bounds
                    if((divToDraw)>-1){
                        //if the divs are above the grid don't draw
                        if(index+height*i<0){
                            continue;
                        }
                        let divYPos= Math.trunc(divToDraw/height);
                        let rowToDraw=Math.trunc((index+height*i)/height);
                        if(divYPos===rowToDraw){
                        squares[divToDraw].style.backgroundColor=rainbowColors[getNextColorIndex()];
                        squares[divToDraw].classList.add("colored");
                        }
                    }
                }
            }
        }
}
else{
    for(let i=brushSize-1;i>-brushSize;i--){
        if(i>0){
            for(let j=brushSize-i-1;j>-(brushSize-i);j--){
                let divToDraw=index+j+height*i;

                //check if the element we are trying to reach is inside the array's bounds
                if((divToDraw)<squares.length && (index+j+height)>-1){
                    
                    let divYPos= Math.trunc(divToDraw/height);
                    let rowToDraw=Math.trunc((index+height*i)/height);
                    if(divYPos===rowToDraw){
                        squares[divToDraw].style.backgroundColor=`${colorPicker.value}`;
                        squares[divToDraw].classList.add("colored");
                    }
                }
            }
        }
        if(i===0){
            for(let j=brushSize-1;j>=-(brushSize-1);j--){
                let divToDraw=index+j+height*i;

                //check if the element we are trying to reach is inside the array's bounds
                if((divToDraw)<squares.length && (index+j+height)>-1){
                    let divYPos= Math.trunc(divToDraw/height);
                    let rowToDraw=Math.trunc((index+height*i)/height);
                    if(divYPos===rowToDraw){
                    squares[divToDraw].style.backgroundColor=`${colorPicker.value}`;
                    squares[divToDraw].classList.add("colored");
                    }
                }
            }
        }
        if(i<0){
            for(let j=brushSize+i-1;j>-(brushSize+i);j--){
                let divToDraw=index+j+height*i;

                //check if the element we are trying to reach is inside the array's bounds
                    if((divToDraw)>-1){
                        //if the divs are above the grid don't draw
                        if(index+height*i<0){
                            continue;
                        }
                        let divYPos= Math.trunc(divToDraw/height);
                        let rowToDraw=Math.trunc((index+height*i)/height);
                        if(divYPos===rowToDraw){
                        squares[divToDraw].style.backgroundColor=`${colorPicker.value}`;
                        squares[divToDraw].classList.add("colored");
                        }
                    }
                }
            }
        }
}
}
function handleImageUpload() 
{

var image = document.getElementById("open-file").files[0];

    var reader = new FileReader();

    reader.onload = function(e) {
      document.getElementById("display-image").src = e.target.result;
    }

    reader.readAsDataURL(image);

} 




