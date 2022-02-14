// https://api.datamuse.com/words?max=10&sp=glass&sl=glass  
// returns word and score (100 = exact match)  
// validate against word spelling and score  
// [
//     {
//     "word": "course",
//     "score": 100,
//     "numSyllables": 1
//     },
//     {
//     "word": "coarse",
//     "score": 100,
//     "numSyllables": 1
//     },
//     {
//     "word": "corse",
//     "score": 100,
//     "numSyllables": 1
//     }
// ]

async function checkWord(guess) {
    let result
    let lookup = await fetch(`${datamuseURL}max=1&sp=${guess.toLowerCase()}&sl=${guess.toLowerCase()}`)
                            .then(res => res.json())
                            .then(data => {
                                if (data.length !== 0) {
                                    // console.log(data)
                                    return data[0].word
                                } else return result
                            });  
    return lookup
}


// const apiKey = "eu6lry3hv0y817gyb4627jzrw0z89e8htb105me8t74uwj7dw"
// // owlBotAPI: "curl --header "Authorization: Token 17deabd641c57a42d2fb7ca914abb7303c0ac4e3" https://owlbot.info/api/v4/dictionary/owl -s | json_pp"
// // https://owlbot.info/api-reference#operation/getWord  
// // lookup each word in dictionary over API call  
// // return state pass/fail 
// // Verify the user submitted word against a dictionary  
// async function checkWord (word) {
//     const baseURL = "https://api.wordnik.com/v4/word.json/"
//     const conditions = "/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false"

//     // const dictionary = "https://api.dictionaryapi.dev/api/v2/entries/en/"
//     // let lookup = await fetch(`${dictionary}${word}`)
//     let lookup = await fetch(`${baseURL}${word}${conditions}&api_key=${apiKey}`)
//     let result = await lookup.ok
//     result != true ? betterLuckNextTime() : true
//     console.log(result)
// }






