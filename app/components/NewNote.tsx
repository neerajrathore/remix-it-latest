import { LinksFunction } from '@remix-run/node';
import newNoteStyles from '~/components/NewNote.css?url';

function NewNote() {
  return (
    //it will automatically send the request to currently active path.
    <form method="post" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button>Add Notes</button>
      </div>
    </form>
  );
}

export default NewNote;

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: newNoteStyles }];
}
