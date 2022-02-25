


function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.innerHTML);
    // console.log(ev)
}
  
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    // put the letter in the div, add data-state=active and data-letter=letter  
    ev.target.innerHTML = data
    ev.target.dataset.state = "active"
    ev.target.dataset.letter = data
}