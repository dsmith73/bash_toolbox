// https://api.datamuse.com/words?max=10&sp=g????  
// provide max 10 results  
// word starts with g (randomize?)
// ???? - word has 4 additional characters (5 total)

// generate random letter btn a-z  
// get difficulty/length (4-11 letters total)
// select random word from returned array  

const maxResults = 10
const datamuseURL = "https://api.datamuse.com/words?"
let wordOfTheDay

function generateRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}

function getRandomWord() {
    const randomLetter = generateRandomLetter()

    let s = []
    for (i=1; i < gridWidth; i++) {
        s.push("?")
    }

    let questionmark = s.toString().replace(/,/g,"")
    let result
    
    // Query datamuse API for Word
    let response = fetch(`${datamuseURL}max=${maxResults}&sp=${randomLetter}${questionmark}`)
                    .then(res => res.json())
                    .then(data => {
                        result = data[Math.floor(Math.random() * data.length)].word
                        return result
                        });  
    return response
}

async function implementWord() {
    wordOfTheDay = await getRandomWord()
//     console.log(wordOfTheDay)
    return wordOfTheDay
}





// function getWord() {
    // Scrape website for Random Word (OLDER Method)
    // let resultPattern = /(?:result\W+\w\W)(\w+)(?:\W)/mi
    // let wordLen = "length/" + randLength
    // let result
    // const baseURL = "https://www.randomwordgenerator.org/Word/generate/quantity/1/"
    // let response = fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(baseURL + wordLen)}`)
    //                     .then(response => {
    //                         if (response.ok) return response.json()
    //                         throw new Error('Network response was not ok.')
    //                     })
    //                     .then(data => {
    //                         result = data.contents.match(resultPattern)[1]
    //                         return result
    //                     })

    // // console.log(response)
    // // console.log(result)
    // return response

    // Query API for Random Word (OLD Method)
//     const baseURL = "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength="
//     const wordLen = gridWidth
//     const exclusion = "&excludePartOfSpeech=interjection%2Cpreposition%2Cabbreviation%2Caffix%2Carticle%2Cauxiliary-verb%2Cconjunction%2Cdefinite-article%2Cfamily-name%2Cgiven-name%2Cidiom%2Cimperative%2Cnoun-posessive%2Cpast-participle%2Cphrasal-prefix%2Cproper-noun%2Cproper-noun-plural%2Cproper-noun-posessive%2Csuffix%2Cverb-intransitive%2Cverb-transitive"
//     let response = fetch(baseURL+wordLen+'&maxLength='+wordLen+exclusion+'&api_key='+apiKey)
//                     .then(res => res.json())
//                     .then(data => {
//                         result = data.word
//                         return result
//                         });    
//     return response
// }

// async function decipherWord() {
//     targetWord = await getWord()
//     const regExp = /[-,']/g;                
//     console.log(targetWord)
//     // if targetWord contains a - or ', get a new word  
//     if(regExp.test(targetWord)) await getWord()
//     console.log(targetWord)
//     return targetWord
// }
