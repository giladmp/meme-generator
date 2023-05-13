'use strict'

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
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Wenn ihr wollt',
            size: 60,
            align: 'center',
            color: 'white',
            stroke: 'black',
            posX: 250,
            posY: 62.5,
        },
        {
            txt: 'ist es kein Märchen',
            size: 40,
            align: 'center',
            color: 'white',
            stroke: 'black',
            posX: 250,
            posY: 437.5,
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

function setAlignText(pos) {
    gMeme.lines[gMeme.selectedLineIdx].align = pos
}

function setLineToFocus(x, y) {
    const lineNumToFocus = gMeme.lines.findIndex(line => {
        return y > line.posY - line.size / 2 && y < line.posY + line.size / 2
    })
    if (lineNumToFocus === -1) {
        return
    } else {
        gMeme.selectedLineIdx = lineNumToFocus
    }
}