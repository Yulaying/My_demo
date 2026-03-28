'use client';

import Link from 'next/link';
import { DiaryEntry } from '@/lib/diary-types';
import { formatDateTime } from '@/lib/date';

type Props = {
  entry: DiaryEntry;
  onDelete: () => Promise<void>;
};

export function DiaryDetail({ entry, onDelete }: Props) {
  return (
    <article className="card card-pad diary-shell">
      <header>
        <h1 className="page-title">{entry.title}</h1>
        <p className="muted">创建于：{formatDateTime(entry.createdAt)}</p>
        <p className="muted">最近编辑：{formatDateTime(entry.updatedAt)}</p>
      </header>
      <div className="content-block">{entry.content}</div>
      <div className="action-row">
        <Link href="/diary" className="touch-button touch-button--secondary">
          返回列表
        </Link>
        <Link href={`/diary/${entry.id}/edit`} className="touch-button touch-button--primary">
          编辑
        </Link>
        <button
          className="touch-button touch-button--danger"
          onClick={async () => {
            const confirmed = confirm('确认删除这篇日记吗？此操作不可撤销。');
            if (!confirmed) return;
            await onDelete();
          }}
          type="button"
        >
          删除
        </button>
      </div>
    </article>
  );
}
