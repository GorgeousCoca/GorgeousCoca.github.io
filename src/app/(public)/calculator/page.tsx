import { CalculatorForm } from "@/components/forms/calculator-form";
import { PageHero } from "@/components/ui/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Калькулятор стоимости изделий из искусственного камня",
  description: "Онлайн-калькулятор для предварительного расчета столешницы, подоконника или мойки из искусственного камня.",
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
    </>
  );
}
