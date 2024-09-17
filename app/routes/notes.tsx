import { LinksFunction } from '@remix-run/node';
import { json, Link, redirect, useLoaderData } from '@remix-run/react';
import { getStoredNotes, storeNotes } from '~/data/notes'
import NewNote, { links as newNoteStyle } from '~/components/NewNote';
import NoteList, { links as notesListStyle } from '~/components/display-notes/NoteList'
// don't do import NewNoteStyle from '~/components/NewNote.css' instead use surfacing style

export default function NotesPage() {
  // access data returned by loader 
  const notes = useLoaderData();

  // we don't show loading spinner while data is being loaded 
  // remix only serves the finished pages once data has been loaded
  console.log(notes, 'useLoaderData');
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
// after action trigger, loader also calls to get updated data
export async function loader() {
  console.log("loader function");
  const notes = await getStoredNotes()
  // you can also do that this remix does under the hood 
  // return new Response(JSON.stringify(notes), {headers: {"Content-Type": "application/json"}})

  // return new error response 
  if(!notes || notes.length === 0){
    // throw to generate error response not return
    // throw new Response()
    throw json({ message: 'error occurred' }, {
      status: 404,
      statusText: "not found"
    })
  }

  return notes  // same as above json(notes)
}

// remix will be looking for this keyword just like links reserved
// we are using web standard objects and methods like request is formed by browser
// runs on backend
// backend request(going to route also trigger fetch request) trigger this action function
export async function action(data: any) {
  console.log("action function");

  // console.log(data.request.formData());
  const formData = await data.request.formData()
  const noteData = Object.fromEntries(formData)
  console.log(noteData, formData, Object.entries(formData), Object.fromEntries(formData));

  // validation
  if (noteData.title.trim().length < 5) {
    return { message: "enter more than 5 character" }
  }

  // getting existing notes
  const existingNotes = await getStoredNotes()
  noteData.id = new Date().toISOString()
  const updatedNotes = existingNotes.concat(noteData)
  await storeNotes(updatedNotes)

  // slowing backend calls a little bit
  await new Promise<void>((res, rej) => {
    setTimeout(() => {
      res()
    }, 1000)
  })
  return redirect('/notes')
}

// surfacing styles 
export const links: LinksFunction = () => {
  return [...newNoteStyle(), ...notesListStyle()]
}

// more specific return related to notes route
export function ErrorBoundary() {
  return (
    <main className="error">
      <h1>error occurred in notes page </h1>
      <p><Link to={'/'}>Back</Link></p>
    </main>
  )
}