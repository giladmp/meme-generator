'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['a', 'b'] },
    { id: 3, url: 'img/3.jpg', keywords: ['c', 'b'] },
    { id: 4, url: 'img/4.jpg', keywords: ['c', 'b'] },
    { id: 5, url: 'img/5.jpg', keywords: ['c', 'b'] },
]
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'lorem ipsum',
            size: 30,
            align: 'left',
            color: 'red'
        },
        {
            txt: 'dolor sit amet',
            size: 45,
            align: 'right',
            color: 'blue'
        }
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[0].txt = txt
    renderMeme()
}
