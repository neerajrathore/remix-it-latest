import { LinksFunction } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import newNoteStyles from '~/components/NewNote.css?url';

function NewNote() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting"; // Check if the form is currently being submitted.

  // useActionData() retrieves data returned from the action function (in the parent NotesPage component).
  // It helps access validation errors or messages returned after the form submission.
  const actionData: any = useActionData();

  return (
    // The <Form> component automatically submits to the current route's action function.
    <Form method="post" id="note-form">
      {/* Display any validation message or error from the action function */}
      {actionData?.message && <p>{actionData.message}</p>}

      <p>
        <label htmlFor="title">Title</label>
        {/* The 'name' attribute is important for form submission, as it corresponds to the form field's key. */}
        <input type="text" id="title" name="title" required />
      </p>

      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>

      <div className="form-actions">
        {/* The button text changes dynamically based on the submission state. */}
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Note'}
        </button>
      </div>
    </Form>
  );
}

export default NewNote;

// The `links` function adds the CSS file that styles the form and its components.
export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: newNoteStyles }];
};
