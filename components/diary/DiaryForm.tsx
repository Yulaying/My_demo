'use client';

import { useEffect, useMemo, useState } from 'react';
import { DiaryInput } from '@/lib/diary-types';

type Props = {
  initialValue?: DiaryInput;
  submitLabel: string;
  draftKey: string;
  onSubmit: (value: DiaryInput) => Promise<void>;
};

export function DiaryForm({ initialValue, submitLabel, draftKey, onSubmit }: Props) {
  const [title, setTitle] = useState(initialValue?.title ?? '');
  const [content, setContent] = useState(initialValue?.content ?? '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (initialValue) return;
    const draft = localStorage.getItem(draftKey);
    if (!draft) return;
    try {
      const parsed = JSON.parse(draft) as DiaryInput;
      setTitle(parsed.title ?? '');
      setContent(parsed.content ?? '');
    } catch {
      // ignore draft parse error
    }
  }, [draftKey, initialValue]);

  useEffect(() => {
    if (initialValue) return;
    const timer = setTimeout(() => {
      localStorage.setItem(draftKey, JSON.stringify({ title, content }));
    }, 250);
    return () => clearTimeout(timer);
  }, [title, content, draftKey, initialValue]);

  const canSubmit = useMemo(() => title.trim() && content.trim(), [title, content]);

  return (
    <form
      className="card card-pad form"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!canSubmit || saving) return;
        setSaving(true);
        await onSubmit({ title, content });
        localStorage.removeItem(draftKey);
        setMessage('保存成功');
        setSaving(false);
      }}
    >
      <label className="field">
        <span>标题</span>
        <input
          required
          minLength={1}
          maxLength={80}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="今天发生了什么？"
        />
      </label>
      <label className="field">
        <span>正文</span>
        <textarea
          required
          minLength={1}
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="记录你的想法、灵感和感受..."
        />
      </label>
      <div className="form-actions">
        <button className="touch-button touch-button--primary" type="submit" disabled={!canSubmit || saving}>
          {saving ? '保存中...' : submitLabel}
        </button>
        <p className="muted">{message || '支持自动保存草稿。'}</p>
      </div>
    </form>
  );
}
