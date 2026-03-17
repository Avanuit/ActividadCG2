const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');
const cursor = document.getElementById('cursor');
const sliders = document.querySelectorAll('input[type="range"]');

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let pos = { x: mouse.x, y: mouse.y };
let color = { r: 0, g: 0, b: 0 };

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

//primer color del canvas del fondo
function addTexture() {
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = 'rgba(255,255,255,0.02)';
    for(let i=0; i<100; i++) {
        ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 2, 2);
    }
    ctx.globalCompositeOperation = 'source-over';
}

function render() {
    //rempazar fondo con el color seleccionado
    ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    addTexture();

    //larp
    pos.x += (mouse.x - pos.x) * 0.15;
    pos.y += (mouse.y - pos.y) * 0.15;

    cursor.style.left = `${pos.x}px`;
    cursor.style.top = `${pos.y}px`;

    requestAnimationFrame(render);
}

function updateValues() {
    color.r = document.getElementById('r').value;
    color.g = document.getElementById('g').value;
    color.b = document.getElementById('b').value;

    document.getElementById('valR').innerText = color.r;
    document.getElementById('valG').innerText = color.g;
    document.getElementById('valB').innerText = color.b;
    
    const toHex = (c) => parseInt(c).toString(16).padStart(2, '0');
    const hex = `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`.toUpperCase();
    
    document.getElementById('hex-code').innerText = hex;
    document.getElementById('rgb-display').innerText = `RGB(${color.r}, ${color.g}, ${color.b})`;
}

sliders.forEach(s => s.addEventListener('input', updateValues));

// Inicio
updateValues();
render();