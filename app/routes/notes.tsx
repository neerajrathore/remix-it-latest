import { LinksFunction } from '@remix-run/node';
import { Link, redirect } from '@remix-run/react';
import NewNote, {links as newNoteStyle} from '~/components/NewNote';
import { getStoredNotes, storeNotes } from '~/data/notes'
// don't do import NewNoteStyle from '~/components/NewNote.css' instead use surfacing style

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
};

// remix will be looking for this keyword just like links reserved

// we are using web standard objects and methods like request is formed by browser
export async function action(data: any) {
  // console.log(data.request.formData());
  const formData = await data.request.formData()
  console.log(formData, Object.entries(formData), Object.fromEntries(formData));
  const noteData = Object.fromEntries(formData)
  // add validation
  // getting existing notes
  const existingNotes = await getStoredNotes()
  noteData.id = new Date().toISOString()
  const updatedNotes = existingNotes.concat(noteData)
  await storeNotes(updatedNotes)
  return redirect('/notes')
}

// surfacing styles 
export const links: LinksFunction = () => {
  return [...newNoteStyle()]
}