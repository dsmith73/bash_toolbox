const hero = document.querySelector('.hero')
const aboutMe = document.querySelector('.aboutMe')
const myProjects = document.querySelector('.myProjects')
const contactMe = document.querySelector('.contactMe')
const slider = document.querySelector('.slider')
const logo = document.querySelector('#logo')
const toggleContainer = document.querySelector('.toggle-container')
const hamburger = document.querySelector('.hamburger')
const lines = document.querySelector('.line')
const l1 = document.querySelector('.l1')
const l2 = document.querySelector('.l2')
const l3 = document.querySelector('.l3')
const headline = document.querySelector('.headline')
const navLinks = document.querySelector('.nav-links')
const links = document.querySelectorAll('.nav-links li')


const tl = new TimelineMax()

if (hero) {
    tl.fromTo(hero, 1, { height: "0%" }, { height: "80%", ease: Power2.easeInOut }
    ).fromTo(hero, 1.2, { width: "100%" }, { width: "80%", ease: Power2.easeInOut }
    ).fromTo(slider, 1.2, { x: "-100%" }, { x: "0%", ease: Power2.easeInOut }, "-=1.2"     // how many seconds earlier to start the animation  
    ).fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5"
    ).fromTo(hamburger, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5"
    ).fromTo(headline, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5"
    ).fromTo(toggleContainer, 0.1, { opacity: 0 }, { opacity: 1 }
    )
}

if (aboutMe) {
    tl.fromTo(aboutMe, 1, { height: "0%" }, { height: "80%", ease: Power2.easeInOut }
    ).fromTo(aboutMe, 1.2, { width: "100%" }, { width: "90%", ease: Power2.easeInOut }
    ).fromTo(aboutMe, 1.2, { background: "linear-gradient(to bottom, rgb(124, 124, 124), rgb(26, 26, 36))" }, { background: "rgba(0,0,0,0)", ease: Power2.easeInOut }, "-=1.2"
    ).fromTo(slider, 1.2, { x: "100%" }, { x: "0%", ease: Power2.easeInOut }, "-=2.2"     // how many seconds earlier to start the animation  
    ).fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5"
    ).fromTo(hamburger, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5"
    ).fromTo(toggleContainer, 0.1, { opacity: 0 }, { opacity: 1 }
    )
}

if (myProjects) {
    tl.fromTo(myProjects, 1, { height: "0%" }, { height: "90%", ease: Power2.easeInOut }
    ).fromTo(myProjects, 1.2, { width: "100%" }, { width: "90%", ease: Power2.easeInOut }
    ).fromTo(myProjects, 1.2, { background: "linear-gradient(to bottom, rgb(124, 124, 124), rgb(26, 26, 36))" }, { background: "rgba(0,0,0,0)", ease: Power2.easeInOut }, "-=1.2"
    ).fromTo(slider, 1.2, { y: "-100%" }, { y: "0%", ease: Power2.easeInOut }, "-=1.2"     // how many seconds earlier to start the animation  
    ).fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5"
    ).fromTo(hamburger, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5"
    ).fromTo(toggleContainer, 0.1, { opacity: 0 }, { opacity: 1 }
    )
}

if (contactMe) {
    tl.fromTo(contactMe, 1, { height: "0%" }, { height: "80%", ease: Power2.easeInOut }
    ).fromTo(contactMe, 1.2, { width: "100%" }, { width: "80%", ease: Power2.easeInOut }
    ).fromTo(contactMe, 1.2, { background: "linear-gradient(to bottom, rgb(124, 124, 124), rgb(26, 26, 36))" }, { background: "rgba(0,0,0,0)", ease: Power2.easeInOut }, "-=1.2"
    ).fromTo(slider, 1.2, { y: "100%" }, { y: "0%", ease: Power2.easeInOut }, "-=1.2"     // how many seconds earlier to start the animation  
    ).fromTo(hamburger, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5"
    ).fromTo(toggleContainer, 0.1, { opacity: 0 }, { opacity: 1 }
    )
}


// hamburger nav animation  
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open')
    navLinks.classList.toggle('open')
    links.forEach(link => {
        link.classList.toggle('fade')
    })
})


// Dark-Mode  
var checkbox = document.querySelector('input[name=theme]');

checkbox.addEventListener('change', function() {
    if (this.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}


