const input         = document.getElementById('inpFile')
const outOriginal   = document.getElementById('original')
// const outPreview    = document.getElementById('preview')
// var simplemde = new SimpleMDE({ element: document.getElementById("preview") });
const reader        = new FileReader()
let outputBlob, 
    fileContents, 
    fileExt, 
    fileName
let arr             = []
const author        = "dsmith73"
const separator     = "\n\n---\n\n"
const footer        = `\n_Wireframe template created by:_ ***${author}***\n`

//simplemde.toTextArea();
//simplemde = null;

input.addEventListener('change', e => {
    // leveraging https://flaviocopes.com/filereader for v2  
    fileContents = input.files[0]
    fileExt = fileContents.name.match(/.+\.(\S+)$/)[1]
    fileExt.toLowerCase()
    fileName = fileContents.name.match(/(.+)\.\S+$/)[1]
    outputBlob = new Blob([fileContents])
    // console.log("fileContents says: ", fileContents)

	reader.onload = event => {
        const text = reader.result
        // console.log(text)
	}

	reader.onerror = (e) => {
        console.error(e)
	}
    commentStyle(fileExt, e)
	
})



// document.addEventListener('dragover', function (e) {
//     e.preventDefault()
//     e.stopPropagation()
// }, false)
// document.addEventListener('drop', function (e) {
//     e.preventDefault()
//     e.stopPropagation()
//     console.log(e.dataTransfer.files)
//     handleFiles(e.dataTransfer.files)
// }, false)








