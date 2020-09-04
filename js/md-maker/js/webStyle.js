// Future work - 
/*
  * 
*/

function webStyle(e) {
    reader.onload = e => {
        let file = reader.result
        arr = file.match(/<!-+(?=-+>)?\s*\n*\s*(.+?)\W*\n*\W*-->|<meta([^>]*)/gsi)
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

// WEB_STYLE     : "  \n{{ item | regex_findall('(?:<!-\\W+|<!-\\W+\\n)([^>]*)(?:\\W+->|\\n\\W+->|\\W+\\n\\W+->)') | join('  \n') }}  \n  \n  "
// # Pull meta from html files
// META_STYLE    : "  \n{{ item | regex_findall('<meta(.+)>') | join('  \n') }}  \n  \n  "
