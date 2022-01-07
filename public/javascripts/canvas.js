const canvas = document.querySelector('canvas.drawing__board');
const canvasCtx = canvas.getContext('2d');
canvasCtx.save();
let defaultColor = '#000000';
let defaultWidth = 10;
let serverData;
window.addEventListener('load', () => {


    elementResize(canvas);

    let activeDraw = false;

    const startPosition = () => {
        canvasCtx.beginPath();
        activeDraw = true;
    }
    const endPosition = () => {
        serverData = canvasCtx;
        canvasCtx.closePath();
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

    document.querySelector('#brush__color').addEventListener('change', function(e) {
        console.log(e)
        defaultColor = e.path[0].value;
    });
    document.querySelector('#brush__width').addEventListener('change', function(e) {
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