import { LinksFunction } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import newNoteStyles from '~/components/NewNote.css?url';

function NewNote() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const actionData: any = useActionData()
  
  return (
    //it will automatically send the request to currently active path.
    <Form method="post" id="note-form">
      {actionData?.message && <p>{actionData.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button disabled = {isSubmitting}>{isSubmitting? 'Adding...':'Add Notes'}</button>
      </div>
    </Form>
  );
}

export default NewNote;

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: newNoteStyles }];
}
