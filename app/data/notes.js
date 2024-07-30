import path from 'path';
import fs from 'fs/promises';

const notesPath = path.join(process.cwd(), 'app', 'notes.json');

export async function getStoredNotes() {
    const rawFileContent = await fs.readFile(notesPath, { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    const storedNotes = data.notes ?? [];
    return storedNotes;
}

export function storeNotes(notes) {
    return fs.writeFile(notesPath, JSON.stringify({ notes: notes || [] }));
}