const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

const getNotes = async () => {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });

  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
};

const addNote = async (title) => {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen('Note was added'));
};

const printNotes = async () => {
  const notes = await getNotes();

  console.log(chalk.bgBlue('Here is the list of notes:'));
  notes.forEach((note) => {
    console.log(note.id, chalk.blue(note.title));
  });
};

const updateNote = async (id, updatedNote) => {
  const notes = await getNotes();
  notes.map((note) => {
    if (note.id === id) {
      note.title = updatedNote.title;
    }

    return note;
  });

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgBlue('Note was edited'));
};

const removeNote = async (id) => {
  const notes = await getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);

  await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
  console.log(chalk.bgRed('Note was deleted'));
};

module.exports = {
  addNote,
  removeNote,
  getNotes,
  updateNote,
};
