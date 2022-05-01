const fs = require('fs')
const path = require('path')
const nodePath = path.join(__dirname, 'notes.json')

const getNotes = (collBack) => {
    fs.readFile(nodePath, (err, content) => {
        if (err)
            throw new Error(err)
        try {
            let data = JSON.parse(content)
            collBack(data);
        } catch (e) {
            collBack([])
        }
    })
}
const saveNotes = (notes) => {
    fs.writeFile(nodePath, JSON.stringify(notes), err => {
        if (err)
            throw new Error(err)
    })
}

const addNote = (title, text) => {
    getNotes((notes) => {
        const duplicate = notes.find(note => note.title === title)
        if (duplicate) {
            console.log("Заметка с таки title уже существует");
        } else {
            notes.push({title, text})
            saveNotes(notes)
            console.log(notes);
        }
    })
}
const listNotes = () => {
    getNotes(notes => {
        notes.length ? console.log(notes) : console.log("Список заметок пуст")
    })
}
const getNote = (title) => {
    getNotes((notes) => {
        if (notes.length) {
            const findNote = notes.find(note => note.title === title)
            findNote ? console.log(`${findNote.title}: ${findNote.text}`) : console.log(`Заметка "${title}" не найдена`)
        } else {
            console.log("Список заметок пуст")
        }
    })
}
const updateNotes = (title, text) => {
    getNotes((notes) => {
        if (notes.length) {
            const findNote = notes.find(note => note.title === title)
            if (findNote) {
                deleteNote(title)
                addNote(title, text)
                console.log(`Заметка "${title}" изменена`)
            } else {
                console.log(`Заметка "${title}" не найдена`)
            }
        } else {
            console.log("Список заметок пуст")
        }
    })
}
const deleteNote = (title) => {
    getNotes((notes) => {
        if (notes.length) {
            const findNote = notes.find(note => note.title === title)
            if (findNote) {
                const newNotes = notes.filter(note => note.title !== title)
                saveNotes(newNotes)
                console.log(`Заметка "${title}" удалена`)
            } else {
                console.log(`Заметка "${title}" не найдена`)
            }
        } else {
            console.log("Список заметок пуст")
        }
    })
}

module.exports = {
    addNote, listNotes, getNote, deleteNote, updateNotes
}

