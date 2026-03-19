const colorBox = document.getElementById('color-box');
const sliders = document.querySelectorAll('input[type="range"]');

function updateColor() {
    const r = document.getElementById('r').value;
    const g = document.getElementById('g').value;
    const b = document.getElementById('b').value;

    document.getElementById('valR').innerText = r;
    document.getElementById('valG').innerText = g;
    document.getElementById('valB').innerText = b;

    const rgbString = `rgb(${r}, ${g}, ${b})`;
    colorBox.style.backgroundColor = rgbString;
    
    document.getElementById('rgb-display').innerText = rgbString;

    const toHex = (c) => parseInt(c).toString(16).padStart(2, '0');
    document.getElementById('hex-code').innerText = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

sliders.forEach(s => s.addEventListener('input', updateColor));

updateColor();