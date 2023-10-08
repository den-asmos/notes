const remove = async (id) => {
  await fetch(`/${id}`, {
    method: 'DELETE',
  });
};

const edit = async (id, updatedNote) => {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNote),
  });
};

document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest('li').remove();
    });
  } else if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;
    const newTitle = prompt('Enter new title');

    const updatedNote = {
      id,
      title: newTitle,
    };

    edit(id, updatedNote).then(() => {
      const span = document.getElementById(id);
      span.textContent = newTitle;
    });
  }
});
