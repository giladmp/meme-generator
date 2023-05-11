'use strict'

function onInit() {
    renderMeme()
    renderGallery()

}

function renderMeme() {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    const meme = getMeme()
    const { selectedImgId } = meme
    img.src = `img/${selectedImgId}.jpg`

    img.onload = () => {
        let imgWidth = img.width
        let imgHeight = img.height

        const aspectRatio = imgWidth / imgHeight

        if (imgWidth > canvas.width) {
            imgWidth = canvas.width
            imgHeight = imgWidth / aspectRatio
        }
        if (imgHeight > canvas.height) {
            imgHeight = canvas.height
            imgWidth = imgHeight * aspectRatio
        }

        const x = (canvas.width - imgWidth)
        const y = (canvas.height - imgHeight)

        //Draw img
        ctx.drawImage(img, x, y, imgWidth, imgHeight)

        //Draw text
        renderText(canvas, ctx, meme)
    }
}

function renderText(canvas, ctx, meme) {
    const { lines } = meme
    
    ctx.font = '30px impact'
    ctx.textAlign = 'center'
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    const text = lines[0].txt
    const x = canvas.width / 2
    const y = 30
    ctx.strokeText(text, x, y)
    ctx.fillText(text, x, y)
}

function onUserType(event) {
    let txt = event.target.value
    setLineTxt(txt)
}

function onMenuClick() {
    //NOW: toggles between pages
    //TODO: set full functionality
    const gallery = document.querySelector('.gallery')
    const editor = document.querySelector('.editor')

    gallery.classList.toggle('hidden')
    editor.classList.toggle('hidden')
}