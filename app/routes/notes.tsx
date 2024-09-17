import { LinksFunction } from '@remix-run/node';
import { json, Link, redirect, useLoaderData } from '@remix-run/react';
import { getStoredNotes, storeNotes } from '~/data/notes'
import NewNote, { links as newNoteStyle } from '~/components/NewNote';
import NoteList, { links as notesListStyle } from '~/components/display-notes/NoteList'
// Instead of importing styles directly, use the `links` function to surface CSS from components.

export default function NotesPage() {
  // Access the data returned by the loader function
  const notes = useLoaderData();

  // No loading spinner is needed since Remix only serves pages after data is fully loaded.
  console.log(notes, 'useLoaderData');
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
};

// The loader function runs whenever a GET request is made to this route.
// It fetches data on the server side.
// This also runs again after an action to update the data.
export async function loader() {
  console.log("loader function in notes.tsx");
  const notes = await getStoredNotes();

  // Optionally, you can manually return a Response object, 
  // but Remix automatically wraps the data in a response.
  // Example:
  // return new Response(JSON.stringify(notes), {headers: {"Content-Type": "application/json"}})

  // Return an error response if no notes are found.
  if(!notes || notes.length === 0){
    // Use `throw` to create an error response instead of returning it.
    throw json({ message: 'No notes found in loader' }, {
      status: 404,
      statusText: "Not Found"
    });
  }

  return notes  // The `json()` function wraps the notes data in a JSON response.
}

// The action function handles non-GET requests (e.g., POST) to this route.
// This runs on the server whenever the frontend makes a request, like submitting a form.
export async function action(data: any) {
  console.log("action function");

  // Parse form data sent from the frontend.
  const formData = await data.request.formData()
  const noteData = Object.fromEntries(formData)
  console.log(noteData, formData, Object.entries(formData), Object.fromEntries(formData));

  // Simple validation: Ensure the note title has more than 5 characters.
  if (noteData.title.trim().length < 5) {
    return { message: "Title must be more than 5 characters" }
  }

  // Retrieve existing notes.
  const existingNotes = await getStoredNotes()
  noteData.id = new Date().toISOString() // Assign a unique ID based on the current timestamp.
  
  // Add the new note to the list and store it.
  const updatedNotes = existingNotes.concat(noteData)
  await storeNotes(updatedNotes)

  // Simulate a delay to slow down backend calls.
  await new Promise<void>((res, rej) => {
    setTimeout(() => {
      res()
    }, 1000)
  })
  
  // Redirect the user back to the notes page after saving.
  return redirect('/notes')
}

// Use the `links` function to load styles from different components when this route is accessed.
export const links: LinksFunction = () => {
  return [...newNoteStyle(), ...notesListStyle()]
}

// This ErrorBoundary component renders when there is an error specific to the notes route.
// It shows an error message and a link to return to the homepage.
export function ErrorBoundary() {
  return (
    <main className="error">
      <NewNote />
      <h1>An error occurred on the notes page</h1>
      <p><Link to={'/'}>Back to homepage</Link></p>
    </main>
  )
}