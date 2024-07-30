import { LinksFunction } from '@remix-run/node';
import { redirect, useLoaderData } from '@remix-run/react';
import { getStoredNotes, storeNotes } from '~/data/notes'
import NewNote, { links as newNoteStyle } from '~/components/NewNote';
import NoteList, { links as notesListStyle } from '~/components/display-notes/NoteList'
// don't do import NewNoteStyle from '~/components/NewNote.css' instead use surfacing style

export default function NotesPage() {
  // access data returned by loader 
  const notes = useLoaderData();
  console.log(notes, 'notes');
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
};

// whenever we reach to this page and get request is used 
// loader function is used to fetch data
// fetching data is also done on backend
// runs on backend
export async function loader() {
  const notes = await getStoredNotes()
  // you can also do that this remix does under the hood 
  // return new Response(JSON.stringify(notes), {headers: {"Content-Type": "application/json"}})

  return notes  // same as above json(notes)
}

// remix will be looking for this keyword just like links reserved

// we are using web standard objects and methods like request is formed by browser
// runs on backend
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
  return [...newNoteStyle(), ...notesListStyle()]
}