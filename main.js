'use strict'

function onInit() {
    window.addEventListener('resize', () => renderMeme())
    
    showEditor()
    renderMeme()
    renderGallery()
}

function renderMeme() {
    const img = new Image()
    const elCanvas = document.getElementById('canvas')
    const ctx = elCanvas.getContext('2d')
    elCanvas.width = 500
    elCanvas.height = 500
    const imgSrc = getImgSrc()
    const meme = getMeme()
    const { selectedImgId, selectedLineIdx, lines } = meme
    img.src = imgSrc
    
    img.onload = () => {
        let imgWidth = img.width
        let imgHeight = img.height

        const aspectRatio = imgWidth / imgHeight

        if (imgWidth > elCanvas.width) {
            imgWidth = elCanvas.width
            imgHeight = imgWidth / aspectRatio
        }
        if (imgHeight > elCanvas.height) {
            imgHeight = elCanvas.height
            imgWidth = imgHeight * aspectRatio
        }

        const x = (elCanvas.width - imgWidth)
        const y = (elCanvas.height - imgHeight)

        ctx.drawImage(img, x, y, imgWidth, imgHeight)
        renderFocus(ctx, selectedLineIdx, lines)
        renderLine(ctx, lines[0], selectedLineIdx, elCanvas.height / 8)
        renderLine(ctx, lines[1], selectedLineIdx, elCanvas.height * 7 / 8)
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
    // const posX = align === 'center' ? canvas.width / 2 : align === 'left' ? canvas.width / 50 : canvas.width * 49 / 50
    let posX
    if (align === 'center') {
        posX = canvas.width / 2
    } else if (align === 'left') {
        posX = canvas.width / 50
    } else if (align === 'right') {
        posX = canvas.width * 49 / 50
    } else {
        // else
    }
    const posY = pos

    ctx.strokeText(txt, posX, posY)
    ctx.fillText(txt, posX, posY)
}

function renderFocus(ctx, lineIdx, lines) {
    
    const rectWidth = canvas.width
    const rectHeight = canvas.height
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
    const posX = 0
    let posY 
    if (lineIdx === 0) {
        posY = rectHeight / 8 - lines[lineIdx].size / 2
    } else if (lineIdx === 1) {
        posY = rectHeight * 7 / 8 - lines[lineIdx].size / 2
    }

    ctx.fillRect(posX, posY, rectWidth, lines[lineIdx].size)
}

function onCanvasClick(event) {
    console.log(event);
    let x = event.offsetX
    let y = event.offsetY
    setLineToFocus(x, y)
    renderMeme()
}

function showGallery() {
    hideAllPages()
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('hidden')
}

function showEditor() {
    hideAllPages()
    const elEditor = document.querySelector('.editor')
    elEditor.classList.remove('hidden')
}

function hideAllPages() {
    const elGallery = document.querySelector('.gallery')
    const elEditor = document.querySelector('.editor')
    const elMemes = document.querySelector('.memes')

    elGallery.classList.add('hidden')
    elEditor.classList.add('hidden')
    elMemes.classList.add('hidden')
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
