var bImgWd, bImgHt;
function drawBaseImage(imagePath) {
    var canvas = document.getElementById("playboard"),
        ctx = canvas.getContext("2d"),
        baseImg = new Image();
    baseImg.src = imagePath;
    baseImg.onload = function() {
        bImgWd = baseImg.width;
        bImgHt = baseImg.height;
        ctx.drawImage(baseImg, 0, 0);
        //superImposeUpflowers();
    }
}

function getRgb(arr, wd, ht, x, y) {
    var r = arr[((y-1)*wd + x)*4 + 0],
        g = arr[((y-1)*wd + x)*4 + 1],
        b = arr[((y-1)*wd + x)*4 + 2],
        a = arr[((y-1)*wd + x)*4 + 3];
    return [r, g, b, a];
}

function setRgb(arr, wd, ht, x, y, rgba) {
    arr[((y-1)*wd + x)*4 + 0] = rgba[0];
    arr[((y-1)*wd + x)*4 + 1] = rgba[1];
    arr[((y-1)*wd + x)*4 + 2] = rgba[2];
    arr[((y-1)*wd + x)*4 + 3] = rgba[3];
}

function superImposeUpflowers() {
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        baseCtx = document.getElementById("playboard").getContext("2d"),
        upImg = new Image(),
        upimgPixels,
        downimgPixels,
        superimPixels,
        dispFact = parseInt(document.getElementById("disp-fact").value);
    canvas.setAttribute("width", 480);
    canvas.setAttribute("height", 495);
    upImg.src = "si/upFlow.jpg";
    upImg.onload = function() {
        ctx.drawImage(upImg, 0, 0, 480, 495);
        upimgPixels = ctx.getImageData(0,0,480,495);
        downimgPixels = baseCtx.getImageData(0,0,bImgWd,bImgHt);
        superimPixels = ctx.createImageData(bImgWd*2, bImgHt*2);
        var superimArr = superimPixels.data,
            upimArr = upimgPixels.data,
            downArr = downimgPixels.data,
            newPix = 0,
            downPix = 0;
        for(var j = 0; j < bImgHt*2; j++) {
            for(var i = 0; i < bImgWd*2; i++) {
                var supPix = i*bImgWd*2*4 + j*4;
                if(!(i%2 == 0 && j%2 == 0)) {
                    var x = parseInt(newPix%480),
                        y = parseInt(newPix/480),
                        rgba = getRgb(upimArr, 480, 495, x, y);
                    setRgb(superimArr, bImgWd*2, bImgHt*2, i, j, rgba);
                    newPix++;
                    /*superimArr[supPix + 0] = upimArr[newPix++];
                    superimArr[supPix + 1] = upimArr[newPix++];
                    superimArr[supPix + 2] = upimArr[newPix++];
                    superimArr[supPix + 3] = upimArr[newPix++];*/
                } else {
                    /*superimArr[supPix + 0] = downArr[downPix++];
                    superimArr[supPix + 1] = downArr[downPix++];
                    superimArr[supPix + 2] = downArr[downPix++];
                    superimArr[supPix + 3] = downArr[downPix++];*/
                }
            }
        }
        
        baseCtx.putImageData(superimPixels, 0, 0);
    }
}

drawBaseImage("si/downFlow.jpg");
