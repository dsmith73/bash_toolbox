// Future work - 
/*
  * remove slashes from beginning of lines  
  * remove slash * & * slash  
*/

function slashStyle(e) {
    reader.onload = e => {
        let file = reader.result
        arr = file.match(/(?:\/(?=\*)\W+|\/(?=\*\n))([^`]+?)(?:\*(\/))|(?:\/(?=\/)\W+(.+)(\n|$))/gmi)
        arr.unshift("# " + fileName, separator)
        arr.push(separator, footer)
        outOriginal.innerHTML = arr.join('  \r\n')
        console.log("arr: ", arr)
        // simplemde.value(outOriginal.innerHTML)      // Turn on to use Markdown editor  
    }
    reader.onerror = (e) => alert(e.target.error.name)
    reader.readAsText(outputBlob)
    // console.log("OUT", outOriginal, "ARR", arr.join('  \r\n'))
}

// SLASH_STYLE   : "  \n{{ item | regex_findall('(?:\\/(?=\\*)\\W+|\\/(?=\\*\\n))([^`]+?)(?:\\*(\\/))|(?:\\/(?=\\/)\\W+(.+)\\n)') | join('  \n') }}  \n  \n  "

