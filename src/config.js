const os = require('os');
const path = require('path');
const { ipcRenderer } = require('electron');

document.getElementById('output-path').innerText = path.join(os.homedir(), 'image-shrink');

const imgUploader = document.getElementById('uploader');
const slider = document.getElementById('slider');
const form = document.getElementById('image-form');

const store = {
    path: '',
}

imgUploader.addEventListener('change', (e) => {
    const path = e.target.files[0].path;
    console.log(e.target.files)
    store.path = path;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const quality = slider.value;

    ipcRenderer.send('image:minimize', {
        path: store.path,
        quality,
    });
});

ipcRenderer.on('image:done', () => {
    /* finished  */
});
