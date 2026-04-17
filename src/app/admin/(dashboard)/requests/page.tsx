import { getContactRequests } from "@/lib/site";

export default async function AdminRequestsPage() {
  const requests = await getContactRequests();

  return (
    <div className="stack">
      <div className="card stack">
        <h1>Заявки</h1>
        <p className="muted">Все формы сайта сохраняются в единую ленту заявок.</p>
      </div>

      {requests.length ? (
        requests.map((request) => (
          <article key={request.id} className="card stack">
            <div className="admin-toolbar">
              <div className="stack" style={{ gap: 4 }}>
                <strong>{request.name}</strong>
                <span className="muted">
                  {request.phone} · {request.email}
                </span>
              </div>
              <span className="pill">{request.source}</span>
            </div>
            <p>{request.message}</p>
            <span className="muted">{new Date(request.createdAt).toLocaleString("ru-RU")}</span>
          </article>
        ))
      ) : (
        <div className="card stack">
          <strong>Заявок пока нет</strong>
          <p>После отправки форм с сайта новые обращения появятся здесь автоматически.</p>
        </div>
      )}
    </div>
  );
}
