imageRight = document.getElementById("imageRight");
imageLeft = document.getElementById("imageLeft");
var calcWidth = imageRight.width;
var calcHeight = imageRight.height;

var width = imageRight.naturalWidth;
var height = imageRight.naturalHeight;

promptText = document.getElementById("promptText");

console.log()



//var ratio = imageRight.naturalWidth/imageRight.naturalHeight;

button = document.getElementById("button");



function blurImage(image, blurAmount){
    calcWidth = imageRight.width;
    calcHeight = imageRight.height;

    width = imageRight.naturalWidth;
    height = imageRight.naturalHeight;

    var imgString = ""
    if(image == imageRight){
        imgString = "imageRightCanvas";
    }
    else if(image == imageLeft){
        imgString = "imageLeftCanvas";
    }

    if (document.contains(document.getElementById(imgString))) {
        document.getElementById(imgString).remove();
    }

    
    
    var canv = document.createElement('canvas');
    canv.id = imgString;
    canv.style.objectFit = "cover";
    canv.width = width;
    canv.height = height;
    
    
    var ctx = canv.getContext('2d');
    
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.filter = "brightness(" + (100 - blurAmount)/100 + ")";
    
    var sWidth = Math.floor(width/blurAmount);
    var sHeight = Math.floor(height/blurAmount);
    
    ctx.drawImage(image,0,0, sWidth, sHeight);
    ctx.drawImage(canv, 0, 0, sWidth, sHeight, 0, 0, width, height);
    
    image.style.display = 'none';
    canv.style.height = "100%";
    canv.style.width = "100%";
    image.parentNode.insertBefore(canv, image)

}

var id;
var delta;
var blurIndex;
var cycleComplete;
var lastSelection = 1;
var promptId;
var indexText = 0;
var insideText = ""

function startAnim(){
    clearInterval(id);
    clearInterval(promptId);
    cycleComplete = false;
    delta = 2;
    blurIndex = 2;
    id = setInterval(blurAnim, 50);
    indexText = 0;
    promptText.innerText = "";
}

function typeWriter(){
    tempText = insideText.split(" ");
    if(indexText < tempText.length){
        promptText.innerText = promptText.innerText + "  " + tempText[indexText];
        indexText ++;
    }
    else{
        clearInterval(promptId);
    }
}


function blurAnim(){
    if(blurIndex >= 50 && cycleComplete == false){
        let selection = Math.floor(Math.random() * (Object.keys(prompts).length)) + 1;

        while(lastSelection == selection){
            selection = Math.floor(Math.random() * (Object.keys(prompts).length)) + 1;
        }
        lastSelection = selection;
        //Object.keys(prompts).length
        imageRight.src="images/g" + selection + ".jpg";
        imageLeft.src="images/o" + selection + ".jpg";
        delta = -2;
        cycleComplete = true;

        insideText = prompts[selection];

        promptId = setInterval(typeWriter, 100);
    }
    else if(blurIndex <= 1 && cycleComplete){
        
        blurImage(imageRight, 1);
        blurImage(imageLeft, 1);
        clearInterval(id);
        return;
    }
    else{
        blurImage(imageRight, blurIndex);
        blurImage(imageLeft, blurIndex);
        blurIndex = blurIndex + delta;
    }
}

window.onload = function(){button.addEventListener('click', function(){startAnim()});};
