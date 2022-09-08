import i18Obj from '../JS/translate.js';

// burger start

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

// burger end

//  translate start

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

//  translate end

//  change theme start
const main = document.querySelector('main')
const footer = document.querySelector('footer');
const themeBtn = document.querySelector('.header__theme-button');
const buttons = document.querySelectorAll('.button')
const nameInfo = document.querySelector('.name__info');
const nameImgs = document.querySelectorAll('.img');
const nameImg = document.querySelector('.name__img');
const nameSection = document.querySelector('.name__wrapper');
const themeButton = document.querySelector('.header__theme-button');
const inputs = document.querySelectorAll('.contact__input');








themeBtn.addEventListener('click',  () =>  changeTheme(themeArr, theme) )

const themeArr = [
    main,
    footer,
    nameInfo,
    nameSection
];

let theme = 'light';

let changeTheme = (themeArr) => {
    themeArr.forEach((e) => {
        e.classList.toggle('dark-theme');
    })
    buttons.forEach((e) => {
        e.classList.toggle('dark-button')
    })
    nameImgs.forEach((e) => {
        e.classList.toggle('name__img-dark')
    })
    inputs.forEach((e) => {
        e.classList.toggle('dark-footer-input')
    })
    nameImg.classList.toggle('dark-img')
    themeButton.classList.toggle('dark-button-theme')
    if (theme === 'light') {
        theme = 'dark'
    } else theme = 'light'
}


//  change theme end

// Local storage start

function setLocalStorage() {
    localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('theme')) {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            changeTheme(themeArr);
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
