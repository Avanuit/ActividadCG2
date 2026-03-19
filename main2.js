const colorBox = document.getElementById('color-box');
const sliders = document.querySelectorAll('input[type="range"]');
let r = 0, g = 0, b = 0;

function updateColor(e) {
    if (e) {
        if (e.target.id === 'r') {
            r = e.target.value;
            document.getElementById('valR').innerText = r;
        }
        if (e.target.id === 'g') {
            g = e.target.value;
            document.getElementById('valG').innerText = g;
        }
        if (e.target.id === 'b') {
            b = e.target.value;
            document.getElementById('valB').innerText = b;
        }
    } else {
        r = document.getElementById('r').value;
        g = document.getElementById('g').value;
        b = document.getElementById('b').value;
        document.getElementById('valR').innerText = r;
        document.getElementById('valG').innerText = g;
        document.getElementById('valB').innerText = b;
    }

    const rgbString = `rgb(${r}, ${g}, ${b})`;
    colorBox.style.backgroundColor = rgbString;
    
    document.getElementById('rgb-display').innerText = rgbString;

    const toHex = (c) => parseInt(c).toString(16).padStart(2, '0');
    document.getElementById('hex-code').innerText = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

sliders.forEach(s => s.addEventListener('input', updateColor));

updateColor();