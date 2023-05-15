'use strict'

var gCanvas
var gCtx
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gCanvas = document.getElementById('canvas')
    gCtx = gCanvas.getContext('2d')
    showEditor()
    addListeners()
    renderGallery()
    renderMeme()
}

function renderMeme() {
    const img = new Image()
    gCanvas.width = 500
    gCanvas.height = 500
    const imgSrc = getImgSrc()
    const meme = getMeme()
    const { selectedLineIdx, lines } = meme
    img.src = imgSrc

    img.onload = () => {
        let imgWidth = img.width
        let imgHeight = img.height

        const aspectRatio = imgWidth / imgHeight

        if (imgWidth > gCanvas.width) {
            imgWidth = gCanvas.width
            imgHeight = imgWidth / aspectRatio
        }
        if (imgHeight > gCanvas.height) {
            imgHeight = gCanvas.height
            imgWidth = imgHeight * aspectRatio
        }

        const x = (gCanvas.width - imgWidth)
        const y = (gCanvas.height - imgHeight)

        gCtx.drawImage(img, x, y, imgWidth, imgHeight)
        renderFocus(selectedLineIdx, lines)
        for (let i = 0; i < lines.length; i++) {
            renderLine(lines[i])
        }
        renderUserTxtInput(lines[selectedLineIdx])
    }
}

function renderLine(line) {
    const { size, color, txt, align, stroke, pos } = line

    gCtx.font = `${size}px impact`
    gCtx.textAlign = align
    gCtx.fillStyle = color
    gCtx.strokeStyle = stroke
    gCtx.lineWidth = 2.5
    gCtx.textBaseline = 'middle'

    gCtx.strokeText(txt, pos.x, pos.y)
    gCtx.fillText(txt, pos.x, pos.y)
}

function renderFocus(lineIdx, lines) {
    const rectWidth = gCanvas.width
    gCtx.fillStyle = 'rgba(0, 0, 0, 0.3)'
    let posX = 0
    let posY = lines[lineIdx].pos.y - lines[lineIdx].size / 2
    let rectHeight = lines[lineIdx].size

    gCtx.fillRect(posX, posY, rectWidth, rectHeight)
}

function addListeners() {
    window.addEventListener('resize', () => renderMeme())
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (getLineClicked(pos) < 0) return
    setLineDrag(true)
    gStartPos = pos
    // document.body.style.cursor = 'grabbing'
    renderMeme()
}

function onMove(ev) {
    const { lines, selectedLineIdx } = getMeme()
    if (!lines[selectedLineIdx].isDragged) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    // document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
    // if (gTouchEvs.includes(ev.type)) {
    //     ev.preventDefault()
    //     ev = ev.changedTouches[0]
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft,
    //         y: ev.pageY - ev.target.offsetTop
    //     }
    // }
    return pos
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
    addLine()
    renderMeme()
}

function onSwitchLine() {
    setSwitchLineFocus()
    renderMeme()
}

function onAlignTxt(align) {
    setAlignText(align)
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    setSwitchLineFocus()
    renderMeme()
}