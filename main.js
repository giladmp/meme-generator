'use strict'

function onInit() {
    window.addEventListener('resize', () => setCanvasSize())
    
    setCanvasSize()
    renderMeme()
    renderGallery()
}

function setCanvasSize() {
    const elCanvas = document.querySelector('canvas');
    // const maxWidth = 499;
    // const maxHeight = 499;
    // const width = Math.min(maxWidth, window.innerWidth * 0.4);
    // const height = Math.min(maxHeight, window.innerWidth * 0.4);
    // elCanvas.width = width;
    // elCanvas.height = height;
    elCanvas.width = 500
    elCanvas.height = 500
    renderMeme()
}

function renderMeme() {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    const meme = getMeme()
    const { selectedImgId, selectedLineIdx, lines } = meme

    img.src = `assets/img/${selectedImgId}.jpg`
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

        ctx.drawImage(img, x, y, imgWidth, imgHeight)
        renderFocus(ctx, selectedLineIdx)
        renderLine(ctx, lines[0], selectedLineIdx, canvas.height / 8)
        renderLine(ctx, lines[1], selectedLineIdx, canvas.height * 7 / 8)
        // renderLine(ctx, lines[2])
        renderUserTxtInput(lines[selectedLineIdx])
    }
}

function renderLine(ctx, line, selectedLineIdx, pos = canvas.width / 2) {
    const { size, color, txt, align, stroke } = line

    ctx.font = `${size}px impact`
    ctx.textBaseline = 'middle'
    ctx.textAlign = align
    ctx.fillStyle = color
    ctx.strokeStyle = stroke
    ctx.lineWidth = 2.5
    const posX = align === 'center' ? canvas.width / 2 : align === 'left' ? canvas.width / 50 : canvas.width * 49 / 50
    const posY = pos

    ctx.strokeText(txt, posX, posY)
    ctx.fillText(txt, posX, posY)
}

function renderFocus(ctx, lineIdx) {
    const rectWidth = canvas.width
    const rectHeight = canvas.height
    ctx.fillStyle = 'rgba(0, 0, 0, 0.33)'
    const posX = 0
    const posY = lineIdx === 0 ? rectHeight / 8 - 17.5 : rectHeight * 7 / 8 - 17.5

    ctx.fillRect(posX, posY, rectWidth, 35)
}

function renderUserTxtInput(line) {
    const elText = document.querySelector('.dashboard input')
    // elText.value = lines[selectedLineIdx].text
    elText.value = line.txt
}

function onUserType(event) {
    let txt = event.target.value
    setLineTxt(txt)
    renderMeme()
}

// function onMenuClick() {
//     //NOW: toggles between pages
//     //TODO: set full functionality
//     const elGallery = document.querySelector('.gallery')
//     const elEditor = document.querySelector('.editor')
//     const elMemes = document.querySelector('.memes')

//     let i = 0
//     i === 2 ? i = 0 : i++ 
//     elGallery.classList.toggle('hidden', i === 0 || i === 2)
//     elEditor.classList.toggle('hidden', i === 0 || i === 1)
//     elMemes.classList.toggle('hidden', i === 1 || i === 2)
// }

function showFillColorPalate() {
    const colorInput = document.querySelector('button .fill')
    colorInput.click()
}

function showStrokeColorPalate() {
    const colorInput = document.querySelector('button .stroke')
    colorInput.click()
}

function onChangeFillColor(event) {
    let color = event.target.value
    setLineFillColor(color)
    renderMeme()
}

function onChangeStrokeColor(event) {
    let color = event.target.value
    setLineStrokeColor(color)
    renderMeme()
}

function onIncreaseFont() {
    setFontIncrease()
    renderMeme()
}

function onDecreaseFont() {
    setFontDecrease()
    renderMeme()
}

function onAddLine() {
    console.log('add line')
}

function onSwitchLine() {
    setSwitchLineFocus()
    renderMeme()
}

function onAlignTxt(pos) {
    setAlignText(pos)
    renderMeme()
}
