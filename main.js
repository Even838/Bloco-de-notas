document.addEventListener('DOMContentLoaded', (event) => {
    const noteTitle = document.getElementById('noteTitle');
    const noteArea = document.getElementById('noteArea');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    const savedNotesContainer = document.getElementById('savedNotes');

    const loadNotes = () => {
        savedNotesContainer.innerHTML = '';
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            noteDiv.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
            noteDiv.addEventListener('click', () => {
                noteTitle.value = note.title;
                noteArea.value = note.content;
                saveBtn.dataset.index = index;
            });
            savedNotesContainer.appendChild(noteDiv);
        });
    };

    // Load saved notes from localStorage
    loadNotes();

    // Save note to localStorage
    saveBtn.addEventListener('click', () => {
        const title = noteTitle.value.trim();
        const content = noteArea.value.trim();
        if (title && content) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            if (saveBtn.dataset.index !== undefined) {
                notes[saveBtn.dataset.index] = { title, content };
                delete saveBtn.dataset.index;
            } else {
                notes.push({ title, content });
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            noteTitle.value = '';
            noteArea.value = '';
            loadNotes();
            alert('Nota salva!');
        } else {
            alert('Por favor, preencha o título e o conteúdo da nota.');
        }
    });

    // Clear note inputs
    clearBtn.addEventListener('click', () => {
        noteTitle.value = '';
        noteArea.value = '';
        delete saveBtn.dataset.index;
    });
});