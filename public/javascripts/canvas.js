const canvas = document.querySelector('canvas.drawing__board');
const canvasCtx = canvas.getContext('2d');

let defaultColor = '#000000';
let defaultWidth = 10;
window.addEventListener('load', () => {


    elementResize(canvas);

    let activeDraw = false;

    const startPosition = () => {
        canvasCtx.beginPath();
        activeDraw = true;
    }
    const endPosition = () => {
        canvasCtx.closePath();
        activeDraw = false;
    }

    function draw(e) {
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
    elementResize(canvas);
});

function elementResize(element) {
    element.width = (window.innerWidth / 100 * 90);
    element.height = (window.innerHeight / 100 * 75);
}