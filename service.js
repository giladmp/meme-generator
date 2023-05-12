'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [
    { id: 1, url: './assets/img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: './assets/img/2.jpg', keywords: ['a', 'b'] },
    { id: 3, url: './assets/img/3.jpg', keywords: ['c', 'b'] },
    { id: 4, url: './assets/img/4.jpg', keywords: ['c', 'b'] },
    { id: 5, url: './assets/img/5.jpg', keywords: ['c', 'b'] },
]
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Wenn ihr wollt',
            size: 35,
            align: 'center',
            color: 'white',
            stroke: 'black'
        },
        {
            txt: 'ist es kein Märchen',
            size: 25,
            align: 'center',
            color: 'white',
            stroke: 'black'
        }
    ]
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
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
    gMeme.selectedImgId = imgId
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