import { json, Link, useLoaderData } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";
import styles from "~/styles/note-details.css?url"

// below function must be default export to handle get request for this route
export default function NoteDetailsPage() {

    // after loader function data will be available in useLoaderData
    const note: any = useLoaderData()
    return (
        <main id="note-details">
            <header>
                <nav>
                    <Link to={"/notes"}>Back to notes</Link>
                </nav>
                <h1>{note.title}</h1>
            </header>
            <p id="note-details-content">{note.content}</p>
        </main>
    )
}

// load data for a component on the backend
export async function loader({ params }: any) {
    const storedNotes = await getStoredNotes()
    const selectedNote = storedNotes.find((item: any) => item.id === params.noteId)
    if (!selectedNote) {
        console.log("not found note");

        // throw json({ message: 'note not found' }, {
        //     status: 404,
        //     statusText: "Not Found"
        // });
    }
    return selectedNote
}

export function meta({ data }: any) {
    console.log(data, "..................");

    // if (!data) {
    //   return {};
    // }

    // return {
    //   title: data.title,
    //   description: 'Manage your notes with ease.',
    // };
}

export function links() {
    return [{ rel: 'stylesheet', href: styles }]
}