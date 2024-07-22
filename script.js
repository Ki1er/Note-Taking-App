// -----Variables-----
var form = document.getElementById('add-frm');
var items = document.getElementById('items');
var ntitle = document.getElementById('n-title');
var nbody = document.getElementById('n-body');
var tableDiv = document.getElementById('tbl-div');
var search = document.getElementById('srch');
var resetBtn = document.getElementById('reset');

var noteCount = 0;
var newNote = '';
var isUpdate = false;
var record = '';
var note = '';

// -----Events-----
// For Page Loads
window.onload = updateTable;

// For Form Submit
form.addEventListener('submit', addNote);

// For Search
search.addEventListener('keyup', searchNotes);

// For Remove
items.addEventListener('click', removeNote);

// For View & Update
items.addEventListener('click', viewNUpdateNote);

// For Reset
resetBtn.addEventListener('click', resetAll);

// -----Functions-----

// Update table
function updateTable(){
    // Display the table when notes get added
    if(noteCount > 0){
        tableDiv.style.display = '';

        // Update note
        if(isUpdate){
            note.firstChild.textContent = ntitle.value;
            note.lastChild.textContent = nbody.value;
            // Reset update and notecount
            isUpdate = false;
            noteCount--;
        }
        // Add a new note
        else{
            items.appendChild(newNote);
        }
    }
    else{
        tableDiv.style.display = 'none';
    }
}

// Add Note
function addNote(e){
    // Stop initial behaviour
    e.preventDefault();

    // Validate inputs
    if(ntitle.value == '' || nbody.value == ''){
        alert("Please fill all fields!");
    }
    else{
        // Create a new note record

        // New tr
        var tr = document.createElement('tr');
        tr.className = 'item';

        // New td for title and body
        var td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(ntitle.value));
        var span = document.createElement('span');
        span.className = 'note-body';
        span.appendChild(document.createTextNode(nbody.value));
        td1.appendChild(span);

        // New td for view
        var td2 = document.createElement('td');
        td2.className = 'btcellv';
        var btn1 = document.createElement('button');
        btn1.appendChild(document.createTextNode('View'));
        btn1.setAttribute('id','vw');
        td2.appendChild(btn1);

        // New td for delete
        var td3 = document.createElement('td');
        td3.className = 'btcelld';
        var btn2 = document.createElement('button');
        btn2.appendChild(document.createTextNode('Delete'));
        btn2.setAttribute('id','del');
        td3.appendChild(btn2);

        // Add all tds to tr
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        // Increment note count
        noteCount++;

        // Set new note
        newNote = tr;

        // Add or Update the note of the table
        updateTable();
    }

    // Reset all
    resetAll();
}

// Remove Note
function removeNote(e){
    if(e.target.id === 'del'){
        if(confirm("Are you sure?")){
            // Delete notes
            var tr = e.target.parentElement.parentElement;
            items.removeChild(tr);

            // Update table
            noteCount--;
            if(noteCount === 0){
                updateTable();
            }
        }
    }
}

// Search Notes
function searchNotes(e){
    // Text to lower case
    var searchTxt = e.target.value.toLowerCase();

    // Get list
    var list = items.getElementsByClassName('item');

    // Convert to an array
    var listArr = Array.from(list);
    listArr.forEach(function(item){
        // Get title
        var noteTitle = item.firstChild.textContent;
        // Match
        if(noteTitle.toLowerCase().indexOf(searchTxt) != -1){
            item.style.display = '';
        }
        else{
            item.style.display = 'none';
        }
    });
}

// View & Update Note
function viewNUpdateNote(e){
    if(e.target.id === 'vw'){
      // Get the element values & update input fields
      record = e.target.parentElement.parentElement;
      note = record.firstChild;
      ntitle.value = note.firstChild.textContent;
      nbody.value = note.lastChild.textContent;
      isUpdate = true;
    }
}

// Reset All
function resetAll(){
    ntitle.value = '';
    nbody.value = '';
    isUpdate = false;
    newNote = '';
}