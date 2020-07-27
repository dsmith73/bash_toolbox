const progressBar = document.getElementsByClassName('progress-bar')[0]  // [0] to get first element of this type  
setInterval(() => {
    // get current width and then increment by the amount loaded  
    const computedStyle = getComputedStyle(progressBar)
    const width = parseFloat(computedStyle.getPropertyValue('--pctComplete')) || 0  // default to 0 if null returned  
    progressBar.style.setProperty('--pctComplete', width + .1)
}, 5)   // call the code every 5ms  

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
