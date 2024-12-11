const os = require('os');
const path = require('path');
import { ipcRenderer } from 'electron';

document.getElementById('output-path').innerText = path.join(os.homedir(), 'image-shrink');

document.getElementById('image-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const quality = document.getElementById('slider').getAttribute('value');
    const imgPath = document.getElementById('img').files[0].path;

    ipcRenderer.send('image:minimize', {
        imgPath,
        quality,
    });
});
