// const input         = document.getElementById('length')
const output   = document.getElementById('password')
let pwlen = 11
const password = []
let response

let symbols = ".?],{+*:[$#@}=!"
let numbers = "6781235904"
let letters = "poikFGRTEYWQmnjuyhbcIOPxdeaqHJKLUBwszVCXZAvgtrfSD"


// You can change the length of the password by adding a search parameter to the URL  
// ?length=17  
// ex. https://password.com/index.html?length=17  


function createPWD() {
    let pwLen = pwlen - 1
    password.push(letters[Math.floor(Math.random() * letters.length)])
    const char = [symbols, numbers, letters]
    for (let i=0; i<pwLen; i++) {
        let randChar = char[Math.floor(Math.random() * char.length)]
        password.push(randChar[Math.floor(Math.random() * randChar.length)])
    }
    response = password.join("")
    console.log(response)
    output.innerHTML = response
}


function getParameters() {
    let urlString = document.URL // window.location.href
    let paramString = urlString.split('?')[1]
    let queryString = new URLSearchParams(paramString)
    console.log('url: ',urlString,'\nparam: ', paramString, '\nquery: ', queryString)
    for(let pair of queryString.entries()) {
        console.log( pair[0] + ": " + pair[1])
        // IF url includes value for length, set pwlen = length
        if (pair[0] === "length" && pair[1]) pwlen = pair[1]
        
    }
    createPWD()
}


getParameters()


