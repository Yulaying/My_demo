import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="hero">
      <p className="hero-tag">Personal Journal</p>
      <h1>记录今天，也收藏未来</h1>
      <p>
        这是属于你的日记空间。
      </p>
      <div className="hero-actions">
        <Link href="/diary" className="button-primary">
          查看日记
        </Link>
        <Link href="/diary/new" className="button-secondary">
          立即写作
        </Link>
      </div>
    </section>
  );
}
