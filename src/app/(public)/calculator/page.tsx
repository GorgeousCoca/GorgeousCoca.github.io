import { CalculatorForm } from "@/components/forms/calculator-form";
import { PageHero } from "@/components/ui/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Калькулятор стоимости изделий из кварцевого агломерата",
  description: "Онлайн-калькулятор для предварительного расчета столешницы, подоконника или мойки из кварцевого агломерата.",
  path: "/calculator"
});

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Калькулятор"
        title="Предварительный расчет стоимости"
        description="Изменяйте размеры, материал, толщину и дополнительные опции. Стоимость обновляется мгновенно и помогает перейти к предметной заявке."
      />
      <section className="section">
        <div className="container">
          <CalculatorForm />
        </div>
      </section>
      <section className="section">
        <div className="container grid grid-3">
          <div className="card stack">
            <span className="eyebrow">1</span>
            <h3>Быстрый ориентир</h3>
            <p>Калькулятор помогает понять бюджет еще до детального замера и подбора декора.</p>
          </div>
          <div className="card stack">
            <span className="eyebrow">2</span>
            <h3>Переход к точной смете</h3>
            <p>После расчета можно сразу отправить заявку и прикрепить фото объекта.</p>
          </div>
          <div className="card stack">
            <span className="eyebrow">3</span>
            <h3>Учет реальных нюансов</h3>
            <p>Финальная стоимость зависит от кромок, вырезов, логистики и сложности монтажа.</p>
          </div>
        </div>
      </section>
    </>
  );
}
