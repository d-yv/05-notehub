import css from './NoteList.module.css';
// import type { Note } from '../../types/note';

// interface NoteListProps {
//   notes: Note[];
// }

// export default function NoteList({ notes }: NoteListProps) {
//   return (
//     <ul className={css.list}>
//       {notes.map(note => (
//         <li key={note.id} className={css.listItem}>
//           <h2 className={css.title}>{note.title}</h2>
//           <p className={css.content}>{note.content}</p>
//           <div className={css.footer}>
//             <span className={css.tag}>{note.tag}</span>
//             <button className={css.button}>Delete</button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate: removeNote } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      // после удаления — обновляем список заметок
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={() => removeNote(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
