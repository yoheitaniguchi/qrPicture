{
    'use strict';
    console.log("Hello World!")

    let canvasElement = document.getElementById("canvas");
    let canvas = canvasElement.getContext("2d");
    let img = new Image();

    let outputContainer = document.getElementById("output");
    let outputMessage = document.getElementById("outputMessage");
    let outputData = document.getElementById("outputData");

    canvasElement.hidden = false;
    outputContainer.hidden = false;

    outputData.addEventListener('click',(e) =>{
        console.log(e.currentTarget.innerText);
        console.log("click");
        window.open(e.currentTarget.innerText,'_blank');
    });

    function drawLine(begin, end, color) {
        canvas.beginPath();
        canvas.moveTo(begin.x, begin.y);
        canvas.lineTo(end.x, end.y);
        canvas.lineWidth = 5;
        canvas.strokeStyle = color;
        canvas.stroke();
    }

    function recog() {
        var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height,
             {
                inversionAttempts: "dontInvert",
            });

        if (code) {
            drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
            drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
            drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
            drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");

            outputMessage.hidden = true;
            outputData.parentElement.hidden = false;

            console.log(code.data);
            outputData.innerText = code.data;

        } else {
            outputMessage.hidden = false;
            outputData.parentElement.hidden = true;
        }
    }

    document.getElementById("fileInput").addEventListener('change', (e) => {
        let files = e.target.files;
        if (files.length > 0) {
            img.src = URL.createObjectURL(files[0]);
            img.onload = function() {
                canvasElement.width = img.width;
                canvasElement.height = img.height;
                canvas.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
                recog();
            };
        }
    }, false);
    

}