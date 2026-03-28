import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="hero">
      <p className="hero-tag">Personal Journal</p>
      <h1>记录今天，也收藏未来</h1>
      <p>
        这是一个专为手机浏览优化的日记空间。支持新建、编辑、删除和检索，部署到 Vercel 后可通过公网地址随时访问。
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
