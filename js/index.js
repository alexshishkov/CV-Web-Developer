import i18Obj from '../JS/translate.js';


// burger-js
const header__nav = document.querySelector('.header__nav');
const hamburger = document.querySelector('.hamburger');
const elementsArray  = document.querySelectorAll ('.header__item');

function toggleMenu() {
    hamburger.classList.toggle('open');
    header__nav.classList.toggle('header__nav_active');
}

function toggleMenuHumburger() {
    hamburger.classList.toggle('open');
    header__nav.classList.toggle('header__nav_active');
    if (theme === 'light') {
        header__nav.classList.toggle('light-theme')
    }
}
hamburger.addEventListener('click', toggleMenuHumburger);


elementsArray.forEach(function(elem) {
    elem.addEventListener('click', toggleMenu)
});

// portfolio-images
const portfolioBtns = document.querySelector('.portfolio__buttons');
const portfolioImages = document.querySelectorAll('.portfolio__card');

portfolioBtns.addEventListener('click', changeImage);

function changeImage(event) {
    if(event.target.classList.contains('portfolio__button')) {
        portfolioImages.forEach(( img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
    }
}

function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    seasons.forEach((e) => {
        for(let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${e}/${i}.jpg`;
        }
    })
}
preloadImages();



// active button portfolio
const portfolioBtn = document.querySelectorAll('.active__button');

portfolioBtn.forEach(function(elem) {
    elem.addEventListener('click', changeClassActive)
});

function changeClassActive(e) {
    for (let i = 0; i < portfolioBtn.length; i++) {
        portfolioBtn[i].classList.remove('active')
    }
    e.target.classList.add('active')
}


//  translate

let languageEn = document.querySelector('.languageEn');
let languageRu = document.querySelector('.languageRu');


languageEn.addEventListener('click', () => getTranslate('en'))
languageRu.addEventListener('click', () => getTranslate('ru'))

function getTranslate(lang) {
    const text = document.querySelectorAll('[data-i18]');
    text.forEach((el) => {
            el.textContent = i18Obj[lang][el.getAttribute('data-i18')]
        }
    )
    localStorage.setItem('lang', lang)
}


//  change theme
const body = document.querySelector('body')
const themeBtn = document.querySelector('.header__theme-button');
const skills = document.querySelector('.skills');
const portfolio = document.querySelector('.portfolio');
const video = document.querySelector('.video');
const price = document.querySelector('.price');
const footer = document.querySelector('.footer__wrapper');
const portfolioButton = document.querySelectorAll('.portfolio__button')
const line = document.querySelectorAll('.line')


themeBtn.addEventListener('click',  () =>  changeTheme(themeArr, portfolioButton, theme) )

const themeArr = [
    skills,
    portfolio,
    video,
    price,
];

let theme = 'dark';

let changeTheme = (themeArr, portfolioButton) => {
    line.forEach((e) => {
            e.classList.toggle('light-themeHamburger')
        }
    )
    themeArr.forEach((e) => {
        e.classList.toggle('light-theme');
    })
    portfolioButton.forEach((e) => {
        e.classList.toggle('lightPortfolioButton')
    })
    body.classList.toggle('light-body')
    footer.classList.toggle('light-footer')
    if (theme === 'dark') {
        theme = 'light'
    } else theme = 'dark'
}

// Local storage start

function setLocalStorage() {
    localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('theme')) {
        const theme = localStorage.getItem('theme');
        if (theme === 'light') {
            changeTheme(themeArr, portfolioButton);
        }
    }
    if (localStorage.getItem('lang')) {
        const lang = localStorage.getItem('lang');
        if (lang === 'en') {
            getTranslate('en')
        } else if (lang === 'ru') {
            getTranslate('ru')
        }
    }
}
window.addEventListener('load', getLocalStorage)

// Local storage end

// creation video for task js30# start

const player = document.querySelector('.video__player')
const videoPlayer = player.querySelector('.viewer')
const toggleButtons = player.querySelectorAll('.toggleButton')
const controlProgress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const volume = player.querySelector('.video__player-volume');
const mute = document.querySelector('.video__button-mute');
const menu = document.querySelector('.video__player-control');

function open () {
    menu.classList.add('openControl')
}

function togglePlay () {
    toggleButtons.forEach((e) => {
        e.classList.toggle('pause');
    })
    if (videoPlayer.paused) {
        videoPlayer.play()
        updateProgress()
    } else {
        videoPlayer.pause()
    }
}

function updateProgress() {
    let progress = videoPlayer.currentTime / videoPlayer.duration;
    progressBar.style.flexBasis = progress * 100 + '%';
}

videoPlayer.ontimeupdate = updateProgress;

controlProgress.onclick = videoProgress;

function videoProgress(event) {
    let widthProgress = this.offsetWidth;
    let currentPosition = event.offsetX;
    this.value = 100 * currentPosition / widthProgress;
    videoPlayer.pause();
    videoPlayer.currentTime = videoPlayer.duration * (currentPosition / widthProgress);
    videoPlayer.play()
    updateProgress()
}

function updateVolume() {
    this.style.background =  this.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, #dae82b ${this.value}%, #c8c8c8 ${this.value}%, #c8c8c8 100%)`
    console.log(this.style.background)
    if (this.value == 0) {
        mute.classList.add('mute');
    } else {
        mute.classList.remove('mute');
    }
    videoPlayer.volume = this.value / 100;
}

function updateMute () {
    mute.classList.toggle('mute');
    if(mute.classList.contains('mute')) {
        videoPlayer.volume = 0
    } else {
        videoPlayer.volume = 0.5
    }
}
toggleButtons.forEach((button) => {
    button.addEventListener('click', open)
})
videoPlayer.addEventListener('click', () => {togglePlay(); open()});
toggleButtons.forEach((e) => {
    e.addEventListener('click', togglePlay);
});
volume.addEventListener('input', updateVolume);
mute.addEventListener('click', updateMute)