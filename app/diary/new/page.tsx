'use client';

import { useRouter } from 'next/navigation';
import { DiaryForm } from '@/components/diary/DiaryForm';
import { diaryStorage } from '@/lib/diary-storage';

export default function NewDiaryPage() {
  const router = useRouter();

  return (
    <section className="diary-shell">
      <h1 className="page-title">新建日记</h1>
      <DiaryForm
        submitLabel="保存日记"
        draftKey="diary_new_draft"
        onSubmit={async (value) => {
          const item = await diaryStorage.create(value);
          router.push(`/diary/${item.id}`);
        }}
      />
    </section>
  );
}
