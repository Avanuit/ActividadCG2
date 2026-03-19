const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');
const cursor = document.getElementById('cursor');
const sliders = document.querySelectorAll('input[type="range"]');

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let pos = { x: mouse.x, y: mouse.y };
let color = { r: 0, g: 0, b: 0, a: 1 };

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function addTexture() {
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = 'rgba(255,255,255,0.02)';
    for(let i=0; i<100; i++) {
        ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 2, 2);
    }
    ctx.globalCompositeOperation = 'source-over';
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const gridSize = 12;
    const cols = Math.ceil(canvas.width / gridSize);
    const rows = Math.ceil(canvas.height / gridSize);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            ctx.fillStyle = (r + c) % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
            ctx.fillRect(c * gridSize, r * gridSize, gridSize, gridSize);
        }
    }

    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    addTexture();

    pos.x += (mouse.x - pos.x) * 0.4;
    pos.y += (mouse.y - pos.y) * 0.4;

    cursor.style.left = `${pos.x}px`;
    cursor.style.top = `${pos.y}px`;

    requestAnimationFrame(render);
}

function updateValues(e) {
    if (e) {
        if (e.target.id === 'r') {
            color.r = e.target.value;
            document.getElementById('valR').innerText = color.r;
        } else if (e.target.id === 'g') {
            color.g = e.target.value;
            document.getElementById('valG').innerText = color.g;
        } else if (e.target.id === 'b') {
            color.b = e.target.value;
            document.getElementById('valB').innerText = color.b;
        } else if (e.target.id === 'a') {
            color.a = e.target.value;
            document.getElementById('valA').innerText = color.a;
        }
    } else {
        color.r = document.getElementById('r').value;
        color.g = document.getElementById('g').value;
        color.b = document.getElementById('b').value;
        color.a = document.getElementById('a').value;
        document.getElementById('valR').innerText = color.r;
        document.getElementById('valG').innerText = color.g;
        document.getElementById('valB').innerText = color.b;
        document.getElementById('valA').innerText = color.a;
    }
    
    const toHex = (c) => parseInt(c).toString(16).padStart(2, '0');
    const aHex = toHex(Math.round(color.a * 255));
    const hex = `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}${aHex}`.toUpperCase();
    
    document.getElementById('hex-code').innerText = hex;
    document.getElementById('rgb-display').innerText = `RGBA(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}

sliders.forEach(s => s.addEventListener('input', updateValues));

updateValues();
render();