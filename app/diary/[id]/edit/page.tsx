'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DiaryForm } from '@/components/diary/DiaryForm';
import { diaryStorage } from '@/lib/diary-storage';
import { DiaryEntry } from '@/lib/diary-types';

export default function EditDiaryPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const data = await diaryStorage.getById(params.id);
      setEntry(data);
      setLoading(false);
    };
    void run();
  }, [params.id]);

  if (loading) return <section className="diary-shell card card-pad">加载中...</section>;

  if (!entry)
    return (
      <section className="diary-shell card card-pad">
        <p>未找到要编辑的日记。</p>
      </section>
    );

  return (
    <section className="diary-shell">
      <h1 className="page-title">编辑日记</h1>
      <DiaryForm
        submitLabel="保存修改"
        draftKey={`diary_edit_draft_${entry.id}`}
        initialValue={{ title: entry.title, content: entry.content }}
        onSubmit={async (value) => {
          await diaryStorage.update(entry.id, value);
          router.push(`/diary/${entry.id}`);
        }}
      />
    </section>
  );
}
