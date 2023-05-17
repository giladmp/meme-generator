'use strict'

var gSavedMemes = []
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [
    { id: 1, url: './assets/img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: './assets/img/2.jpg', keywords: ['a', 'b'] },
    { id: 3, url: './assets/img/3.jpg', keywords: ['c', 'b'] },
    { id: 4, url: './assets/img/4.jpg', keywords: ['c', 'b'] },
    { id: 5, url: './assets/img/5.jpg', keywords: ['c', 'b'] },
    { id: 6, url: './assets/img/6.jpg', keywords: ['c', 'b'] },
    { id: 7, url: './assets/img/7.jpg', keywords: ['c', 'b'] },
    { id: 8, url: './assets/img/8.jpg', keywords: ['c', 'b'] },
    { id: 9, url: './assets/img/9.jpg', keywords: ['c', 'b'] },
    { id: 10, url: './assets/img/10.jpg', keywords: ['c', 'b'] },
    { id: 11, url: './assets/img/11.jpg', keywords: ['c', 'b'] },
    { id: 12, url: './assets/img/12.jpg', keywords: ['c', 'b'] },
    { id: 13, url: './assets/img/13.jpg', keywords: ['c', 'b'] },
    { id: 14, url: './assets/img/14.jpg', keywords: ['c', 'b'] },
    { id: 15, url: './assets/img/15.jpg', keywords: ['c', 'b'] },
    { id: 16, url: './assets/img/16.jpg', keywords: ['c', 'b'] },
    { id: 17, url: './assets/img/17.jpg', keywords: ['c', 'b'] },
    { id: 18, url: './assets/img/18.jpg', keywords: ['c', 'b'] },
]
var gMeme = {
    selectedImgId: 7,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Wenn ihr wollt',
            size: 60,
            color: 'white',
            stroke: 'black',
            pos: { x: 250, y: 62.5 },
            isDragged: false,
            align: 'center'
        },
        {
            txt: 'ist es kein Märchen',
            size: 40,
            color: 'white',
            stroke: 'black',
            pos: { x: 250, y: 437.5 },
            isDragged: false,
            align: 'center'
        }
    ]
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function getImgSrc() {
    const imgIdx = gImgs.findIndex(img => img.id === gMeme['selectedImgId'])
    return gImgs[imgIdx]['url']
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    return
}

function setLineFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
    return
}

function setLineStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = color
    return
}

function setImg(imgId) {
    gMeme.selectedImgId = +imgId
}

function setFontIncrease() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2.5
}

function setFontDecrease() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 2.5
}

function setSwitchLineFocus() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}

function setAlignText(align) {
    switch (align) {
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = 500 / 50
            break
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = 500 / 2
            break
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = 500 * 49 / 50
            break
    }
    gMeme.lines[gMeme.selectedLineIdx].align = align

}

function setLineDrag(isDrag) {
    if (gMeme.selectedLineIdx >= 0) {
        gMeme.lines[gMeme.selectedLineIdx].isDragged = isDrag
    }
}

function getLineClicked(clickedPos) {
    const lineClicked = gMeme.lines.findIndex(line => {
        return (clickedPos.y > line.pos.y - line.size / 2) &&
            (clickedPos.y < line.pos.y + line.size / 2)
    })
    if (lineClicked >= 0) gMeme.selectedLineIdx = lineClicked
    return lineClicked
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function addLine() {
    const line = {
        txt: 'Lorem ipsum',
        size: 50,
        color: 'white',
        stroke: 'black',
        pos: { x: 250, y: 250 },
        isDragged: false,
        align: 'center'
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine(el) {
    if (gMeme.lines.length > 1) {
        gMeme.lines.splice([gMeme.selectedLineIdx], 1)
    } else {
        return blinkButtonRed(el)
    }
}

function setUnchooseLine() {
    gMeme.selectedLineIdx = -1
}

function isLineChosen() {
    return gMeme.selectedLineIdx >= 0
}

function saveMemeToStorage(canvas) {
    const data = canvas.toDataURL()
    gSavedMemes.push(data)
    saveToStorage('memesDB', gSavedMemes)
}

function getSavedMemes() {
    const memes = loadFromStorage('memesDB')
    return memes
}