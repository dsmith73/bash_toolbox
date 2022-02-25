// snippet to identify letters in the lookupString  
// which do not exist in the targetString   

function findDifferences(targetString, lookupString) {
    let result = ""
    for (let i=0; i < lookupString.length; i++) {
        loop: for (let j=0; j < targetString.length; j++) {
            if (lookupString[i] != targetString[j] && j == targetString.length -1) result += lookupString[i]
            if (lookupString[i] == targetString[j]) break loop
        }
    }
    // return result

    // in this scenario, I want to return 1 random letter from the string  
    // of letters not in the secretCode, to provide a hint to the code breaker.  
    return result[Math.floor(Math.random() * result.length)]
}

// console.log(findDifferences("rygr", "bwgykr"))  // return result gives us "bwk"
