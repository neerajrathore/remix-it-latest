import NewNote, {links as newNoteStyle} from '~/components/NewNote';

// don't do import NewNoteStyle from '~/components/NewNote.css' instead use surfacing style

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
};

// surfacing styles 
export function links() {
  return [...newNoteStyle()]
}