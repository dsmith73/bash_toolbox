function hashStyle(e) {
    fileName = input.files[0].name.match(/(.+)\.\S+$/)[1]
    let fileContents = input.files[0]
    // console.log("fileContents says: ", fileContents)
    let lines, arr = []

    outputBlob = new Blob([fileContents])

    reader.addEventListener("loadend", (e) => {
        let file = e.target.result
        lines = [file.split(/\r\n|\n/).toString().split(",")]
        arr = lines[0].filter(line => 
            line.match(/(#+[^\n]+|\W+name:[^\n]+)/gm)
        )
        arr.unshift("# " + fileName, separator)
        arr.push(separator, footer)
        outOriginal.innerHTML = arr.join('\n')
        // console.log(arr, lines[0])
        // simplemde.value(outOriginal.innerHTML)      // Turn on to use Markdown editor  
    })

    reader.onerror = (e) => alert(e.target.error.name)
    // console.log(makeMD)
    reader.readAsText(outputBlob)
    // console.log("OUT", outOriginal, "ARR", arr.join('\n'))
}


// format the data into a Blob for processing  
function makeMD(outputArr) {
    const data = new Blob([
        outputArr,
    ], 
    { 
        type: 'text/markdown' 
    }) 
    return data
}


// HASH_STYLE    : "  \n{{ item | regex_findall('(?s)(?:#+|- name:\\s+)(.+?)(?:\\n|\\r)|<#(.*?)#>') | join('  \n') }}  \n  \n  "

