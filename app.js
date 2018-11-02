function drawBaseImage(imagePath) {
    var canvas = document.getElementById("playboard"),
        ctx = canvas.getContext("2d"),
        baseImg = new Image();
    baseImg.src = imagePath;
    baseImg.onload = function() {
        ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);
        //superImposeUpflowers();
    }
}

function superImposeUpflowers() {
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        baseCtx = document.getElementById("playboard").getContext("2d"),
        upImg = new Image(),
        upimgPixels,
        downimgPixels,
        superimPixels;
    canvas.setAttribute("width", 487);
    canvas.setAttribute("height", 487);
    upImg.src = "si/upFlow.jpg";
    upImg.onload = function() {
        ctx.drawImage(upImg, 0, 0, canvas.width, canvas.height);
        upimgPixels = ctx.getImageData(0,0,canvas.width,canvas.height);
        downimgPixels = baseCtx.getImageData(0,0,960,328);
        superimPixels = ctx.createImageData(960, 328);
        var superimArr = superimPixels.data,
            upimArr = upimgPixels.data,
            downArr = downimgPixels.data,
            newPix = 0;
        for(var i = 0; i < 328; i++) {
            for(var j = 0; j < 960; j++) {
                var supPix = i*960*4 + j*4;
                if((j+1)%2 == 0 || (i+1)%2 == 0) {
                    superimArr[supPix + 0] = upimArr[newPix++];
                    superimArr[supPix + 1] = upimArr[newPix++];
                    superimArr[supPix + 2] = upimArr[newPix++];
                    superimArr[supPix + 3] = upimArr[newPix++];
                } else {
                    superimArr[supPix + 0] = downArr[supPix + 0];
                    superimArr[supPix + 1] = downArr[supPix + 1];
                    superimArr[supPix + 2] = downArr[supPix + 2];
                    superimArr[supPix + 3] = downArr[supPix + 3];
                }
            }
        }
        /*for(var i in upimArr) {
            si = parseInt(i) + (parseInt(i/4) + 1)*4;
            sialt = parseInt(i) + (parseInt(i/4))*4;
            superimArr[si] = upimArr[i];
            superimArr[sialt] = downArr[sialt];
        }*/
        baseCtx.putImageData(superimPixels, 0, 0);
    }
}

drawBaseImage("si/downFlow.jpg");
