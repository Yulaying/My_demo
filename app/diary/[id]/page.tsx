'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DiaryDetail } from '@/components/diary/DiaryDetail';
import { diaryStorage } from '@/lib/diary-storage';
import { DiaryEntry } from '@/lib/diary-types';

export default function DiaryDetailPage() {
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
        <p>未找到这篇日记。</p>
      </section>
    );

  return (
    <section className="diary-shell">
      <DiaryDetail
        entry={entry}
        onDelete={async () => {
          await diaryStorage.remove(entry.id);
          router.push('/diary');
        }}
      />
    </section>
  );
}
