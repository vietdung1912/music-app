const $ = document.querySelector.bind(document)
const $$ = document.querySelector.bind(document)


const nameSong = $('.name-song')
const nameSinger = $('.name-singer')
const btnTogglePlay = $('.btn-toggle-play')
const btnRepeat = $('.btn-repeat')
const btnRandom = $('.btn-shuffle')
const prevBtn = $('.btn-backward')
const nextBtn = $('.btn-forward')
const audio = $('audio')
const thumb= $('.cd-thumb')
const progress = $('.progress')

const button = $$('.btn-toggle-play')

// btnPlay.onclick() = function(audio) {
//     audio.play()
// }

songs = [
    {
        name: 'Amadeus',
        singer: 'Euphoria',
        path: './assets/music/n1.mp3',
        image: './assets/img/n1.png'
    },
    {
        name: 'ANH THÍCH EM',
        singer: 'Linh Hee',
        path: './assets/music/n2.mp3',
        image: './assets/img/n2.png'
    },
    {
        name: 'Con Đường Bình Phàm',
        singer: 'TikTok',
        path: './assets/music/n4.mp3',
        image: './assets/img/n4.png'
    },
    {
        name: 'Disfigure ',
        singer: 'NSC',
        path: './assets/music/n5.mp3',
        image: './assets/img/n5.png'
    },
    {
        name: 'Jim Yosef - Eclipse',
        singer: 'NCS',
        path: './assets/music/n6.mp3',
        image: './assets/img/n6.png'
    },
    {
        name: 'Jim Yosef - Link ',
        singer: 'NCS',
        path: './assets/music/n7.mp3',
        image: './assets/img/n7.png'
    },
    {
        name: 'Julius Dreisig',
        singer: 'NCS',
        path: './assets/music/n8.mp3',
        image: './assets/img/n8.png'
    },
    {
        name: 'Way Back Home',
        singer: 'SHAUN',
        path: './assets/music/n9.mp3',
        image: './assets/img/n9.png'
    },
    {
        name: 'Fearless ',
        singer: 'NCS',
        path: './assets/music/n10.mp3',
        image: './assets/img/n10.png'
    }
]

let isPlaying = true
let isRepeat = false
let isRandom = false
let currentIndex = 0
let currentSong

const cdThumbAnimate = thumb.animate([
    {transform: 'rotate(360deg)'}
], {
    duration: 10000,
    iterations: Infinity
})

function setCurrentSong() {
    currentSong = songs[currentIndex]
    audio.src = currentSong.path
    nameSong.innerHTML = currentSong.name
    nameSinger.innerHTML = currentSong.singer
    thumb.style.backgroundImage = `url('${currentSong.image}')`
    button.children[0].classList.add('hidden')
    button.children[1].classList.remove('hidden')
    audio.play()
    cdThumbAnimate.play()
}



setCurrentSong()

prevBtn.onclick = function() {
    if (isRandom) {
        randomSong()
    }
    else {
        prevSong()
    }
    setCurrentSong()
}

nextBtn.onclick = function() {
    if (isRandom) {
        randomSong()
    }
    else {
        nextSong()
    }
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
    button.children[0].classList.toggle('hidden')
    button.children[1].classList.toggle('hidden')
}

audio.ontimeupdate = function() {
    if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = progressPercent
    }
}

audio.onended = function() {
    if (isRepeat) {
        audio.play()
    }
    else if (isRepeat){

    }
    console.log(isRepeat)
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