const input         = document.getElementById('inpFile')
const outOriginal   = document.getElementById('original')
// const outPreview    = document.getElementById('preview')
// var simplemde = new SimpleMDE({ element: document.getElementById("preview") });
const reader        = new FileReader()
let   outputBlob, 
      templateBlob, 
      fileExt, 
      fileName
const author        = "dsmith73"
const separator     = "\n\n---\n\n"
const footer        = `\n_Wireframe template created by:_ ***${author}***\n`

//simplemde.toTextArea();
//simplemde = null;

input.addEventListener('change', function(e) {
    // console.log(input.files)
    fileExt = input.files[0].name.match(/.+\.(\S+)$/)[1]

    fileExt.toLowerCase()
    // console.log("File Extension: ", fileExt)

    commentStyle(fileExt, e)

}, false)

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








