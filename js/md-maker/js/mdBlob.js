
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

