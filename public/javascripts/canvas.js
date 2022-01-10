const canvas = document.querySelector('canvas.drawing__board');
const canvasCtx = canvas.getContext('2d');
canvasCtx.save();
let defaultColor = '#000000';
let defaultWidth = 10;
let serverData;

window.addEventListener('load', () => {
    if (!isChrome()) {
        document.querySelector('input[name="brush color"]').remove();
    } else {
        document.querySelector('input[name="unsupported color"]').remove();
    }

    elementResize(canvas);

    let activeDraw = false;

    const startPosition = () => {
        canvasCtx.beginPath();
        activeDraw = true;
    }
    const endPosition = () => {
        serverData = canvasCtx;
        canvasCtx.closePath();
        console.log('end');

        activeDraw = false;
    }

    function draw(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!activeDraw) return;

        canvasCtx.lineWidth = defaultWidth;
        canvasCtx.lineCap = "round";
        canvasCtx.lineJoin = "round";
        canvasCtx.strokeStyle = defaultColor;
        canvasCtx.imageSmoothingQuality = "high";
        canvasCtx.lineTo((e.clientX - canvas.getBoundingClientRect().left), (e.clientY - canvas.getBoundingClientRect().top));
        canvasCtx.stroke();
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);


    if (isChrome()) {
        document.querySelector('#brush__color').addEventListener('change', function(e) {
            console.log(e)
            defaultColor = e.path[0].value;
        });
    } else {
        document.querySelector('#unsupported__color').addEventListener('change', function(e) {
            console.log(e);
            defaultColor = e.target.value;
        });
    }
    document.querySelector('#brush__width').addEventListener('change', function(e) {
        console.log(e)
        defaultWidth = e.path[0].value;
    });
    document.querySelector('.clear__btn').addEventListener('click', function(e) {
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    });
});


/* Dynamic sizing */
window.addEventListener('resize', (e) => {
    console.log(canvasCtx.restore())
    canvasCtx.restore();
    elementResize(canvas);
});

function elementResize(element) {
    element.width = (window.innerWidth / 100 * 90);
    element.height = (window.innerHeight / 100 * 75);
}



const isChrome = () => {
    if (navigator.userAgent.indexOf("Chrome") != -1) {
        return true;
    } else {
        return false;
    }
}


function sendLines() {

    socket.emit("sendLinesToServer", canvas.toDataURL());
}