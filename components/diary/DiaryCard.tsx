import Link from 'next/link';
import { DiaryEntry } from '@/lib/diary-types';
import { formatDate } from '@/lib/date';

type Props = {
  entry: DiaryEntry;
};

export function DiaryCard({ entry }: Props) {
  return (
    <article className="card card-pad" style={{ animation: 'fadeUp .28s ease both' }}>
      <p className="meta">{formatDate(entry.updatedAt)}</p>
      <h3 className="title-row">{entry.title}</h3>
      <p className="summary">{entry.content.slice(0, 110) || '（空内容）'}</p>
      <Link className="text-link" href={`/diary/${entry.id}`}>
        查看详情 →
      </Link>
    </article>
  );
}
