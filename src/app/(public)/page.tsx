import { HomeAvantgarde } from "@/components/avantgarde/home-avantgarde";
import { getFeaturedData, getSettings } from "@/lib/site";

const workflow = [
  "Обсуждаем задачу, изделие и желаемый бюджет.",
  "Выезжаем на точный замер и согласуем техническое решение.",
  "Подбираем материал, профиль и комплект дополнительных опций.",
  "Изготавливаем изделие на производстве с контролем качества.",
  "Доставляем и монтируем в согласованное время."
];

export default async function HomePage() {
  const [settings, featured] = await Promise.all([getSettings(), getFeaturedData()]);

  return (
    <HomeAvantgarde
      settings={settings}
      featuredProducts={featured.featuredProducts}
      featuredProjects={featured.featuredProjects}
      testimonials={featured.testimonials}
      workflow={workflow}
      manifesto={[
        {
          title: "Работа под ключ",
          text: "От первого замера до финального монтажа и сдачи результата."
        },
        {
          title: "Гарантия на изделия",
          text: "Закрепляем гарантийные обязательства и понятные условия обслуживания."
        },
        {
          title: "Точные сроки",
          text: "Планируем производство без размытых обещаний и лишних переносов."
        },
        {
          title: "Мастерство обработки",
          text: "Работаем со сложными кромками, мойками и нестандартной геометрией."
        },
        {
          title: "Опыт в частных и коммерческих проектах",
          text: "Реализуем кухни, ванные, офисы, стойки reception и общественные зоны."
        },
        {
          title: "Клиентоориентированный подход",
          text: "Подбираем решение не под каталог, а под задачу и интерьер клиента."
        }
      ]}
    />
  );
}
