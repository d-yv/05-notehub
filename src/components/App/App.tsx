import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [debouncedText] = useDebounce(searchText, 500);
  const [page, setPage] = useState(1);

  // Запрос через react-query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', debouncedText, page],
    queryFn: () => fetchNotes(page, debouncedText),
    enabled: debouncedText.trim() !== '', // не дергать API если поле пустое
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchText={searchText} onUpdate={setSearchText} />

        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {(error as Error).message}</p>}

        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}

        <button className={css.button}>Create note +</button>
      </header>

      <main>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {(error as Error).message}</p>}
        {!isLoading && !isError && data?.notes?.length === 0 && (
          <p>No notes found</p>
        )}
        {data?.notes && data.notes.length > 0 && (
          <NoteList notes={data.notes} />
        )}
      </main>
    </div>
  );
}
