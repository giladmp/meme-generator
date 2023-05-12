'use strict'

function renderGallery() {
    const elContainer = document.querySelector('.img-container')
    const imgs = getImgs()
    
    const strHTMLs = imgs.map(img => {
        return `<img src="${img.url}" id="${img.id}" onclick="onSelectImg(this.id)" alt="">`
    })
    
    elContainer.innerHTML = strHTMLs.join('')
}

function onSelectImg(imgId) {
    setImg(imgId)
    renderMeme()
    onMenuClick()
}

