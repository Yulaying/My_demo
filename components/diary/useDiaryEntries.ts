'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { diaryStorage } from '@/lib/diary-storage';
import { DiaryEntry, DiaryInput } from '@/lib/diary-types';

type UseDiaryEntriesResult = {
  entries: DiaryEntry[];
  loading: boolean;
  query: string;
  dateFilter: string;
  filteredEntries: DiaryEntry[];
  setQuery: (query: string) => void;
  setDateFilter: (date: string) => void;
  refresh: () => Promise<void>;
  createEntry: (input: DiaryInput) => Promise<DiaryEntry>;
  updateEntry: (id: string, input: DiaryInput) => Promise<DiaryEntry | null>;
  deleteEntry: (id: string) => Promise<boolean>;
};

export const useDiaryEntries = (): UseDiaryEntriesResult => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await diaryStorage.list();
    setEntries(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const filteredEntries = useMemo(() => {
    return entries.filter((item) => {
      const text = `${item.title} ${item.content}`.toLowerCase();
      const matchKeyword = query ? text.includes(query.toLowerCase()) : true;
      const matchDate = dateFilter ? item.updatedAt.startsWith(dateFilter) : true;
      return matchKeyword && matchDate;
    });
  }, [entries, query, dateFilter]);

  const createEntry = useCallback(async (input: DiaryInput) => {
    const created = await diaryStorage.create(input);
    await refresh();
    return created;
  }, [refresh]);

  const updateEntry = useCallback(async (id: string, input: DiaryInput) => {
    const updated = await diaryStorage.update(id, input);
    await refresh();
    return updated;
  }, [refresh]);

  const deleteEntry = useCallback(async (id: string) => {
    const deleted = await diaryStorage.remove(id);
    await refresh();
    return deleted;
  }, [refresh]);

  return {
    entries,
    loading,
    query,
    dateFilter,
    filteredEntries,
    setQuery,
    setDateFilter,
    refresh,
    createEntry,
    updateEntry,
    deleteEntry,
  };
};
