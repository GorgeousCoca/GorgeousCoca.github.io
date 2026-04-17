import Link from "next/link";

export default function ThankYouPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="card stack">
          <span className="eyebrow">Заявка отправлена</span>
          <h1>Спасибо за обращение</h1>
          <p>Мы получили вашу заявку и свяжемся с вами после обработки запроса.</p>
          <div className="btn-row">
            <Link className="button" href="/">
              На главную
            </Link>
            <Link className="button-secondary" href="/portfolio">
              Посмотреть проекты
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
