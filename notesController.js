const chalk = require('chalk');
const Note = require('./models/note');

const getNotes = async () => {
  const notes = await Note.find();
  return notes;
};

const addNote = async (title, owner) => {
  await Note.create({ title, owner });

  console.log(chalk.bgGreen('Note was added'));
};

const updateNote = async (id, updatedNote, owner) => {
  const result = await Note.updateOne(
    { _id: id, owner },
    { title: updatedNote.title }
  );

  if (result.matchedCount === 0) {
    throw new Error('No note to edit');
  }

  console.log(chalk.bgBlue('Note was edited'));
};

const removeNote = async (id, owner) => {
  const result = await Note.deleteOne({ _id: id, owner });

  if (result.matchedCount === 0) {
    throw new Error('No note to delete');
  }

  console.log(chalk.bgRed('Note was deleted'));
};

module.exports = {
  addNote,
  removeNote,
  getNotes,
  updateNote,
};
