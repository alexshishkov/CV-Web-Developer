import i18Obj from '../JS/translate.js';

// burger start

const nav = document.querySelector('.header__nav');
const hamburger = document.querySelector('.hamburger');
const arrayLinks  = document.querySelectorAll ('.header__item');
const arrow = document.querySelector('.arrow');
const lines = document.querySelectorAll('.line');

function toggleMenu() {
    hamburger.classList.toggle('open');
    nav.classList.toggle('header__nav_active');
}

function toggleMenuHumburger() {
    hamburger.classList.toggle('open');
    nav.classList.toggle('header__nav_active');
    if (theme === 'dark') {
        nav.classList.add('dark-theme')
    }
}
hamburger.addEventListener('click', toggleMenuHumburger);

arrayLinks.forEach(function(elem) {
    elem.addEventListener('click', toggleMenu)
});

arrow.addEventListener('click', () => {
    nav.classList.remove('header__nav_active');
    hamburger.classList.remove('open');
} )

window.addEventListener('scroll', () => {
    if (theme === 'light') {
        lines.forEach((elem) => {
            window.scrollY > 140 && window.scrollY < 600 ? elem.classList.add("white-burger") : elem.classList.remove("white-burger") 
        })
    }
});

// burger end

//  translate start

let languageEn = document.querySelector('.languageEn');
let languageRu = document.querySelector('.languageRu');
const inputName = document.querySelector(".contact__input-name");
const email = document.querySelector(".contact__input-email");
const subject = document.querySelector(".subject");

languageEn.addEventListener('click', () => translation('en'))
languageRu.addEventListener('click', () => translation('ru'))

function translation(lang) {
    const text = document.querySelectorAll('[data-i18]');
    text.forEach((el) => {
            el.textContent = i18Obj[lang][el.getAttribute('data-i18')]
            inputName.placeholder = i18Obj[lang].inputName
            email.placeholder = i18Obj[lang].email
            subject.placeholder = i18Obj[lang].subject
        }
    )
    localStorage.setItem('lang', lang)
}

//  translate end

//  change theme start

const themeButton = document.querySelector('.header__theme-button');
const main = document.querySelector('main')
const footer = document.querySelector('footer');
const buttons = document.querySelectorAll('.button')
const nameInfo = document.querySelector('.name__info');
const contacts = document.querySelectorAll('.name__info-contact')
const Imgs = document.querySelectorAll('.img');
const skillsImgs = document.querySelectorAll('.skills__skill-img');
const nameImg = document.querySelector('.name__img');
const nameSection = document.querySelector('.name__wrapper');
const inputs = document.querySelectorAll('.contact__input');
const portfolioCardName = document.querySelectorAll('.portfolio__card-name');
const headerLink = document.querySelectorAll('.header__link');

themeButton.addEventListener('click',  () =>  changeTheme(themeArr, theme) )

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
    contacts.forEach((e) => {
        e.classList.toggle('dark-card-name')
    })
    Imgs.forEach((e) => {
        e.classList.toggle('name__img-dark')
    })
    skillsImgs.forEach((e) => {
        e.classList.toggle('name__img-dark')
    })
    inputs.forEach((e) => {
        e.classList.toggle('dark-footer-input')
    })
    portfolioCardName.forEach((e) => {
        e.classList.toggle('dark-card-name')
    })
    if(window.screen.width < 750) {
        headerLink.forEach((e) => {
            e.classList.toggle('dark-card-name')
        })
        nav.classList.toggle('dark-theme')
    }
    nameImg.classList.toggle('dark-img')
    themeButton.classList.toggle('dark-button-theme')
    if (theme === 'light') {
        theme = 'dark'
    } else theme = 'light'
}

window.addEventListener('resize', function() {
    changingNavigationFromScreenWidth();
  });

  function changingNavigationFromScreenWidth() {
    var w = window.innerWidth;
    if (w > 750) {
        hamburger.classList.remove('open');
        nav.classList.remove('header__nav_active');
        nav.classList.remove('dark-theme');
        headerLink.forEach((e) => {
            e.classList.remove('dark-card-name')
        })
    } else if(w < 750 && theme === 'dark') {
        headerLink.forEach((e) => {
            e.classList.add('dark-card-name')
        })
        nav.classList.add('dark-theme');
    }
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
            translation('en')
        } else if (lang === 'ru') {
            translation('ru')
        }
    }
}

window.addEventListener('load', getLocalStorage)

// Local storage end

// email start

let form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      let status = document.getElementById("my-form-status");
      let data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)

// email end