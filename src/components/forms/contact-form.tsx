"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./contact-form.module.scss";

type ContactFormProps = {
  source: string;
  compact?: boolean;
  className?: string;
};

const submissionSteps = ["Проверяем данные", "Формируем заявку", "Отправляем на почту менеджеру"];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ContactForm({ source, compact = false, className }: ContactFormProps) {
  const router = useRouter();
  const isStaticDemo = process.env.NEXT_PUBLIC_STATIC_DEMO === "true";
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    setActiveStep(1);
    setProgress(20);
    await wait(180);
    setActiveStep(2);
    setProgress(52);

    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      productType: String(formData.get("productType") ?? "не указан"),
      dimensions: String(formData.get("dimensions") ?? "не указаны"),
      comment: String(formData.get("message") ?? "без комментария"),
      source
    };

    if (isStaticDemo) {
      setActiveStep(3);
      setProgress(100);
      setStatus("success");
      await wait(350);
      router.push("/thank-you");
      router.refresh();
      return;
    }

    setActiveStep(3);
    setProgress(84);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setProgress(100);
      setStatus("success");
      await wait(450);
      router.push("/thank-you");
      router.refresh();
      return;
    }

    setProgress(0);
    setActiveStep(0);
    setStatus("error");
  }

  return (
    <form
      className={`card stack ${className ?? ""}`.trim()}
      action={async (formData) => {
        await handleSubmit(formData);
      }}
    >
      <div className="stack" style={{ gap: 8 }}>
        <span className="eyebrow">Заявка на расчет</span>
        <strong>Получите расчет по вашим размерам</strong>
      </div>
      <div className="form-grid">
        <input className="field" name="name" placeholder="Имя" required />
        <input className="field" name="phone" placeholder="Телефон" required />
        <input className="field" name="email" placeholder="Email" type="email" required />
      </div>
      <div className="form-grid">
        <select className="select" name="productType" defaultValue="countertop" required>
          <option value="countertop">Столешница</option>
          <option value="window-sill">Подоконник</option>
          <option value="reception">Ресепшн / коммерческая поверхность</option>
          <option value="other">Другое изделие</option>
        </select>
        <input className="field" name="material" value="Кварцевый агломерат" readOnly />
        <input className="field" name="dimensions" placeholder="Размеры, например 3000x600 мм" required />
      </div>
      <textarea
        className="textarea"
        name="message"
        placeholder={compact ? "Кратко опишите задачу" : "Комментарий к заявке: цвет, бренд камня, сроки монтажа"}
        required
      />
      <label className="pill">
        <input name="botCheck" required type="checkbox" />
        &nbsp;Подтверждаю, что я не робот
      </label>
      <label className="stack">
        <span className="form-note">Эскиз или фото проекта (опционально)</span>
        <input className="field" name="attachment" type="file" />
      </label>
      <div className={styles.statusWrap}>
        <div className={styles.timeline}>
          {submissionSteps.map((step, index) => {
            const isActive = status === "submitting" && index < activeStep;
            return (
              <div key={step} className={`${styles.step} ${isActive ? styles.stepActive : ""}`}>
                <span className={styles.stepDot} />
                <span>{step}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.progress}>
          <motion.div
            className={styles.progressBar}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
      </div>
      <div className="btn-row">
        <button className="button" disabled={status === "submitting"} type="submit">
          {status === "submitting" ? "Отправка..." : "Отправить заявку"}
        </button>
        <span className="form-note">
          {status === "success"
            ? isStaticDemo
              ? "Демо-режим: форма проверена, отправка в CRM отключена."
              : "Заявка принята. Мы свяжемся с вами."
            : status === "error"
              ? "Не удалось отправить форму. Попробуйте еще раз."
              : "Нажимая кнопку, вы соглашаетесь с обработкой персональных данных."}
        </span>
      </div>
    </form>
  );
}
