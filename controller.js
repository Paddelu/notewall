var notes = [];
var notenumber = 0;
var names = [];

function note(name,content,color){
    this.name = name;
    this.content = content;
    this.color = color;
}

function newNote(){
    var notename = prompt("Note name");
    names.push(notename);
    while(hasDuplicates(names) || notename.length > 25){
        console.log(notename.length);
        names.pop();
        notename = prompt("Note name");
        names.push(notename);
    }
    var mynote = new note(notename,prompt("Note content"),prompt("note color"));
    notes.push(mynote);
    var visualNote = document.createElement("div");
    visualNote.setAttribute("class","drag draggable");
    visualNote.setAttribute("id",mynote.name);
    document.getElementById("parentdiv").appendChild(visualNote);
    document.getElementById(mynote.name).innerHTML = "";
    var h = document.createElement("H2") 
    h.setAttribute("class","text-center");
    var t = document.createTextNode(mynote.name.toUpperCase());    
    h.appendChild(t);
    visualNote.appendChild(h);
    document.getElementById(mynote.name).innerHTML += mynote.content;
    document.getElementById(mynote.name).style.backgroundColor= mynote.color;
    document.getElementById(mynote.name).title = mynote.name;
    console.log("that was note number: "+notenumber);
    notenumber++;
    console.log(notes[0].name);
    
}

function hasDuplicates(array) {
    console.log((new Set(array)).size !== array.length);
    return (new Set(array)).size !== array.length;
}

// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
         endOnly: true,
         elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;