import { permanentRedirect } from "next/navigation";

/** Отдельные карточки декоров отключены — ведём пользователя сразу на расчёт. */
type PageProps = {
  params: Promise<{ group: string; slug: string }>;
};

export default async function StoneDetailRedirect(_props: PageProps) {
  permanentRedirect("/calculator");
}
