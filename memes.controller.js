'use strict'

function renderSavedMemes() {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')

    const memes = getSavedMemes()
    let img = new Image()
    img.src = memes[memes.length - 1]
    img.onload = () => {
        ctx.drawImage(img, 0, 0, 150, 150)
    }
}



