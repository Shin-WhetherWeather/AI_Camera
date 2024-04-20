imageRight = document.getElementById("imageRight");
imageLeft = document.getElementById("imageLeft");
var calcWidth = imageRight.width;
var calcHeight = imageRight.height;

var width = imageRight.naturalWidth;
var height = imageRight.naturalHeight;



//var ratio = imageRight.naturalWidth/imageRight.naturalHeight;

button = document.getElementById("button");



function blurImage(image, blurAmount){
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


function startAnim(){
    cycleComplete = false;
    delta = 2;
    blurIndex = 2;
    id = setInterval(blurAnim, 50);
}


function blurAnim(){
    if(blurIndex >= 50 && cycleComplete == false){
        imageRight.src="back.jpg";
        imageLeft.src="Photo1.jpg";
        delta = -2;
        cycleComplete = true;
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


button.addEventListener('click', function(){startAnim()});

