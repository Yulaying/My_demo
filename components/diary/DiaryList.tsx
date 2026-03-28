'use client';

import Link from 'next/link';
import { DiaryCard } from './DiaryCard';
import { useDiaryEntries } from './useDiaryEntries';

export function DiaryList() {
  const { filteredEntries, loading, query, dateFilter, setDateFilter, setQuery } = useDiaryEntries();

  return (
    <section className="diary-shell">
      <header className="card card-pad">
        <h1 className="page-title">我的日记</h1>
        <p className="muted">按时间倒序展示，可搜索关键词和按日期筛选。</p>
        <div className="field-grid">
          <label className="field">
            <span>搜索</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="输入标题或正文关键词"
            />
          </label>
          <label className="field">
            <span>日期筛选</span>
            <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
          </label>
        </div>
        <Link href="/diary/new" className="button-primary">
          + 新建日记
        </Link>
      </header>

      {loading ? <div className="card card-pad">正在加载日记...</div> : null}

      {!loading && filteredEntries.length === 0 ? (
        <div className="card card-pad empty-state">
          <p>还没有匹配的日记，写下第一篇吧。</p>
          <Link href="/diary/new" className="button-secondary">
            去创作
          </Link>
        </div>
      ) : null}

      {!loading && filteredEntries.map((entry) => <DiaryCard key={entry.id} entry={entry} />)}
    </section>
  );
}
