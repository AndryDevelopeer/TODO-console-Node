const yargs = require('yargs')
const pkg = require('./package.json')
const notes = require('./notes')

yargs.version(pkg.version)

yargs.command({
    command: 'add',
    describe: 'Добавить новую заметку',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Название заметки'
        },
        text: {
            type: 'string',
            demandOption: true,
            describe: 'Текст заметки'
        }
    },
    handler({title, text}) {
        notes.addNote(title, text)
    }
})

yargs.command({
    command: 'list',
    description: 'Получить все заметки',
    handler() {
        notes.listNotes()
    }
})

yargs.command({
    command: 'get',
    description: 'Получить заметку',
    title: {
        type: 'string',
        demandOption: true,
        describe: 'Название заметки'
    },
    handler({title}) {
        notes.getNote(title)
    }
})

yargs.command({
    command: 'update',
    description: 'Обновить заметку',
    title: {
        type: 'string',
        demandOption: true,
        describe: 'Название заметки'
    },
    handler({title, text}) {
        notes.updateNotes(title, text)
    }
})

yargs.command({
    command: 'delete',
    description: 'Удалить заметку',
    title: {
        type: 'string',
        demandOption: true,
        describe: 'Название заметки'
    },
    handler({title}) {
        notes.deleteNote(title)
    }
})

yargs.parse()
