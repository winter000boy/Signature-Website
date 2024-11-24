document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    const colorPicker = document.getElementById('colorPicker');
    const canvasColor = document.getElementById('canvasColor');
    const fontSizePicker = document.getElementById('fontSizePicker');
    const clearButton = document.getElementById('clearButton');
    const saveButton = document.getElementById('saveButton');
    const retrieveButton = document.getElementById('retrieveButton');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Initialize canvas with background color
    ctx.fillStyle = canvasColor.value || '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set color for drawing
    colorPicker.addEventListener('change', (event) => {
        ctx.strokeStyle = event.target.value;
    });

    // Change canvas background color
    canvasColor.addEventListener('change', (event) => {
        ctx.fillStyle = event.target.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    // Set font size and line width
    fontSizePicker.addEventListener('change', (event) => {
        ctx.lineWidth = event.target.value;
    });

    // Start drawing
    canvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        lastX = event.offsetX;
        lastY = event.offsetY;
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
            lastX = event.offsetX;
            lastY = event.offsetY;
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    // Clear the canvas
    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = canvasColor.value || '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    // Save the canvas to localStorage
    saveButton.addEventListener('click', () => {
        const dataURL = canvas.toDataURL();
        localStorage.setItem('canvasContents', dataURL);
        const link = document.createElement('a');
        link.download = 'signature.png';
        link.href = dataURL;
        link.click();
    });

    // Retrieve saved canvas from localStorage
    retrieveButton.addEventListener('click', () => {
        const savedCanvas = localStorage.getItem('canvasContents');
        if (savedCanvas) {
            const img = new Image();
            img.src = savedCanvas;
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            };
        }
    });
});
