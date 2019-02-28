/*
what are you decoding?
images?
how?
take an Image
then take another image
use some algorithm to calculate position of the new pixels on existing image canvas 
*/

/*
What inputs would you take?
1. canvas location - element id
2. new image
3. decoding algorithm
*/

function getImgData(id, imgSrc, decodeLaw) {
    var imgElem = document.createElement("img"),
        imgCanvas = document.createElement("canvas"),
        imgCtx = imgCanvas.getContext("2d");
    imgElem.src = imgSrc;
    imgElem.crossOrigin = "Anonymous";
    imgElem.onload = function() {
        imgCanvas.width = imgElem.width;
        imgCanvas.height = imgElem.height;
        imgCtx.drawImage(imgElem, 0, 0);
        var imgData = imgCtx.getImageData(0, 0, imgCanvas.width, imgCanvas.height),
            imgPixData = imgData.data,
            imgInfo = {
                width: imgCanvas.width,
                height: imgCanvas.height,
                data: imgPixData
            };
        mergeImage(id, imgInfo, decodeLaw);
    };
}

function mergeImage(id, imgData, decodeLaw) {
    var baseCanvas = document.getElementById(id),
        baseCtx = baseCanvas.getContext("2d"),
        baseWd = baseCanvas.width,
        baseHt = baseCanvas.height,
        baseImgData = baseCtx.getImageData(0, 0, baseWd, baseHt),
        baseData = baseImgData.data;
    
    var dImgWd = baseWd * 2,
        dImgHt = baseHt * 2;
    
    var dImgElem = document.createElement("canvas"),
        dImgCtx = dImgElem.getContext("2d");
    dImgElem.width = dImgWd;
    dImgElem.height = dImgHt;
    dImgElem.setAttribute('id', 'upsampled');
    var dImgData = dImgCtx.getImageData(0, 0, dImgWd, dImgHt),
        dData = dImgData.data;
    
    // This piece is for one and one row column gap
    /*for(var i = 0; i <= baseWd*4; i=i+4) {
        for(var j = 0; j <= baseWd*4; j=j+4) {
            var index = i*baseWd + j;
            dData[2*index + i*baseWd*4] = baseData[index];
            dData[2*index + i*baseWd*4 + 1] = baseData[index + 1];//baseData[baseIndex + 1];
            dData[2*index + i*baseWd*4 + 2] = baseData[index + 2];//baseData[baseIndex + 2];
            dData[2*index + i*baseWd*4 + 3] = 255;
        }        
    }*/
    
    // simple superimposing algorithm
    var baseIndex = 0;
    for(var i = 0; i <= dImgWd*4; i=i+4) {
        for(var j = 0; j <= dImgHt*8; j=j+4) {
            var index = i*dImgWd + j;
            if(i % 8 == 0 && j % 8 == 0) {
                var baseIndex = i*dImgWd/4 + j/2;
                dData[index] = baseData[baseIndex];
                dData[index + 1] = baseData[baseIndex + 1];//baseData[baseIndex + 1];
                dData[index + 2] = baseData[baseIndex + 2];//baseData[baseIndex + 2];
                dData[index + 3] = 255;
            } else {
                dData[index] = 255;
                dData[index + 1] = 0;
                dData[index + 2] = 0;
                dData[index + 3] = 255;
            }
        }
    }
    /*for(var i = 0; i <= dImgWd*4; i=i+4) {
        for(var j = 0; j <= dImgHt*8; j=j+4) {
            if(i % 8 == 0 && j % 8 == 0) {
                var index = i*dImgWd + j;
                dData[index] = 255;
                dData[index + 1] = 0;
                dData[index + 2] = 0;
                dData[index + 3] = 255;
            }            
        }
    }*/
    
    /*for(var i = 0; i < baseData.length; i=i+4) {
        dData[2*i] = baseData[i];
        dData[2*i + 1] = baseData[i + 1];
        dData[2*i + 2] = baseData[i + 2];
        dData[2*i + 3] = 255;
    }*/
    
    dImgCtx.putImageData(dImgData, 0, 0);
    document.body.appendChild(dImgElem);
    
    
}

/*getQuadrapledIndex(i, j, wd) {
    return 2*wd*i + j;
}

getRGBA(data, i, j, wd) {
    var r = data[i*wd + j],
        g = data[i*wd + j + 1],
        b = data[i*wd + j + 2],
        a = data[i*wd + j + 3];
    return [r, g, b, a];
}*/



