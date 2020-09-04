// Future work - 
/*
  * 
*/

function semicolStyle(e) {
    reader.onload = e => {
        let file = reader.result
        arr = file.match(/;\s*(.+)\n|$/gmi)
        arr.unshift("# " + fileName, separator)
        arr.push(separator, footer)
        outOriginal.innerHTML = arr.join('  \r\n')
        // console.log("arr: ", arr)
        // simplemde.value(outOriginal.innerHTML)      // Turn on to use Markdown editor  
    }
    reader.onerror = (e) => alert(e.target.error.name)
    reader.readAsText(outputBlob)
    // console.log("OUT", outOriginal, "ARR", arr.join('  \r\n'))
}

// SEMICOL_STYLE : "  \n{{ item | regex_findall(';\\W+(.+)') | join('  \n') }}  \n  \n  "

