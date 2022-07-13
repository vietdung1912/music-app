const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const nameSong = $('.name-song')
const btnTogglePlay = $('.btn-toggle-play')
const btnRepeat = $('.btn-repeat')
const btnRandom = $('.btn-shuffle')
const prevBtn = $('.btn-backward')
const nextBtn = $('.btn-forward')
const volumeLowBtn = $('.btn-volume-low')
const volumeHighBtn = $('.btn-volume-high')
const audio = $('audio')
const thumb= $('.cd-thumb')
const progress = $('.progress')
const listSong = $('.list-song')

songs = [
    {
        name: 'Something Just Like This',
        singer: 'The Chainsmokers & Coldplay',
        path: './assets/music/n1.mp3',
        image: './assets/img/n1.PNG'
    },
    {
        name: 'Reality',
        singer: 'Lost Frequencies',
        path: './assets/music/n2.mp3',
        image: './assets/img/n2.PNG'
    },
    {
        name: 'Waiting For Love',
        singer: 'Avicii',
        path: './assets/music/n3.mp3',
        image: './assets/img/n3.PNG'
    },
    {
        name: 'The Nights ',
        singer: 'Avicii',
        path: './assets/music/n4.mp3',
        image: './assets/img/n4.PNG'
    },
    {
        name: 'See You Again',
        singer: 'NCS',
        path: './assets/music/n5.mp3',
        image: './assets/img/n5.PNG'
    },
    {
        name: 'Way Back Home',
        singer: 'SHAUN',
        path: './assets/music/n6.mp3',
        image: './assets/img/n6.PNG'
    },
    {
        name: 'Anh yêu em',
        singer: 'Linh Hee',
        path: './assets/music/n7.mp3',
        image: './assets/img/n7.PNG'
    },
    {
        name: 'Hai mươi hai',
        singer: 'Amee x Hứa Kim Tuyền',
        path: './assets/music/n8.mp3',
        image: './assets/img/n8.PNG'
    },
    {
        name: 'Có hẹn với thanh xuân ',
        singer: 'MONSTAR',
        path: './assets/music/n9.mp3',
        image: './assets/img/n9.PNG'
    }
]

let isPlaying = false
let isRepeat = false
let isRandom = false
let chooseSong = false
let currentIndex = 0
let currentSong

const cdThumbAnimate = thumb.animate([
    {transform: 'rotate(360deg)'}
], {
    duration: 10000,
    iterations: Infinity
})

function renderSong() {
    var htmls = songs.map((song, index) => {
        return `
            <div class="song ${index === currentIndex ? 'active' : ''}" data-index="${index}">
                <h3 class="name">${song.name}</h3>
                <div class="singer">${song.singer}</div>
            </div>
        `
    })
    listSong.innerHTML = htmls.join('')
}

function thumbAnimate() {
    if (isPlaying ) {
        cdThumbAnimate.play()
        btnTogglePlay.children[0].classList.add('hidden')
        btnTogglePlay.children[1].classList.remove('hidden')
    }
    else {
        cdThumbAnimate.pause()
        btnTogglePlay.children[0].classList.remove('hidden')
        btnTogglePlay.children[1].classList.add('hidden')
    }
}

function setCurrentSong() {
    currentSong = songs[currentIndex]
    audio.src = currentSong.path
    nameSong.innerHTML = currentSong.name
    thumb.style.backgroundImage = `url('${currentSong.image}')`
    audio.volume = 0.5
    thumbAnimate()
}

volumeLowBtn.onclick = function() {
    const seekVolume = audio.volume - 0.1
    audio.volume = seekVolume < 0 ? 0 : seekVolume
}

volumeHighBtn.onclick = function() {
    const seekVolume = audio.volume + 0.1
    audio.volume = seekVolume > 1 ? 1 : seekVolume
}

prevBtn.onclick = function() {
    isPlaying = true
    if (isRandom) {
        randomSong()
    }
    else {
        prevSong()
    }
    renderSong()
    setCurrentSong()
}

nextBtn.onclick = function() {
    isPlaying = true
    if (isRandom) {
        randomSong()
    }
    else {
        nextSong()
    }
    renderSong()
    setCurrentSong()
}

btnRepeat.onclick = function() {
    isRepeat = !isRepeat
    btnRepeat.classList.toggle('checked')
}

btnRandom.onclick = function() {
    isRandom = !isRandom
    btnRandom.classList.toggle('checked')
}

btnTogglePlay.onclick = function() {
    if (isPlaying){
        audio.pause()
        cdThumbAnimate.pause()
        isPlaying = false
    }
    else {
        audio.play()
        cdThumbAnimate.play()
        isPlaying = true 
    }
    thumbAnimate()
}

listSong.onclick = function(e) {
    isPlaying = true
    const song = e.target.parentElement
    const list = $$('.song')
    for (var item of list) {
        item.classList.remove('active')
    }
    currentIndex = song.getAttribute("data-index")
    song.classList.add('active')
    setCurrentSong()
}

audio.ontimeupdate = function() {
    if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = progressPercent
    }
}

audio.onended = function() {
    if (isRepeat) {
        renderSong()
        setCurrentSong()
    }
    else if (isRandom){
        randomSong()
        renderSong()
        setCurrentSong()
    }
    else {
        nextSong()
        renderSong()
        setCurrentSong()
    }
}

progress.onchange = function() {
    const seekTime = audio.duration / 100 * progress.value
    audio.currentTime = seekTime
}

function prevSong() {
    currentIndex --
    currentIndex = currentIndex < 0 ? songs.length - 1 : currentIndex
}

function nextSong() {
    currentIndex ++
    currentIndex = currentIndex > songs.length - 1 ? 0 : currentIndex
}

function randomSong() {
    do {
        var random = Math.floor(Math.random()* (songs.length - 1))
    }
    while (currentIndex === random)
    currentIndex = random
}
renderSong()
setCurrentSong()