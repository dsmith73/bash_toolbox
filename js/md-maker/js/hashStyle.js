function hashStyle(e) {
    reader.onload = e => {
        let file = reader.result
        // arr = file.match(/(#+[^\t\n\r]*$|\W+name:[^\n\t\r]*$)/gmi)
        arr = file.match(/(?:#+|- name:\s+)(.+?)(?:\n|\r|\r\n)|<#(.*?)#>|\"{3}(.*?)\"{3}/isg)
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

// HASH_STYLE    : "  \n{{ item | regex_findall('(?s)(?:#+|- name:\\s+)(.+?)(?:\\n|\\r)|<#(.*?)#>') | join('  \n') }}  \n  \n  "
