import { DiaryEntry, DiaryInput } from './diary-types';

const STORAGE_KEY = 'diary_entries_v1';

type DiaryStorageAdapter = {
  list: () => Promise<DiaryEntry[]>;
  getById: (id: string) => Promise<DiaryEntry | null>;
  create: (input: DiaryInput) => Promise<DiaryEntry>;
  update: (id: string, input: DiaryInput) => Promise<DiaryEntry | null>;
  remove: (id: string) => Promise<boolean>;
};

const parseEntries = (raw: string | null): DiaryEntry[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as DiaryEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

const readStore = (): DiaryEntry[] => {
  if (typeof window === 'undefined') return [];
  return parseEntries(localStorage.getItem(STORAGE_KEY));
};

const writeStore = (entries: DiaryEntry[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

const sortDesc = (entries: DiaryEntry[]) =>
  [...entries].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));

export const localDiaryStorage: DiaryStorageAdapter = {
  async list() {
    return sortDesc(readStore());
  },

  async getById(id) {
    return readStore().find((item) => item.id === id) ?? null;
  },

  async create(input) {
    const now = new Date().toISOString();
    const entry: DiaryEntry = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      content: input.content.trim(),
      createdAt: now,
      updatedAt: now,
    };
    const updated = [entry, ...readStore()];
    writeStore(updated);
    return entry;
  },

  async update(id, input) {
    let found: DiaryEntry | null = null;
    const updated = readStore().map((item) => {
      if (item.id !== id) return item;
      found = {
        ...item,
        title: input.title.trim(),
        content: input.content.trim(),
        updatedAt: new Date().toISOString(),
      };
      return found;
    });
    if (!found) return null;
    writeStore(updated);
    return found;
  },

  async remove(id) {
    const before = readStore();
    const after = before.filter((item) => item.id !== id);
    if (before.length === after.length) return false;
    writeStore(after);
    return true;
  },
};

// future upgrade path:
// export const remoteDiaryStorage: DiaryStorageAdapter = { ...Supabase/Firebase/Postgres adapters }
export const diaryStorage = localDiaryStorage;
