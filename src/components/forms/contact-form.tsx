"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ContactFormProps = {
  source: string;
  compact?: boolean;
};

export function ContactForm({ source, compact = false }: ContactFormProps) {
  const router = useRouter();
  const isStaticDemo = process.env.NEXT_PUBLIC_STATIC_DEMO === "true";
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");

    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      source
    };

    if (isStaticDemo) {
      setStatus("success");
      router.push("/thank-you");
      router.refresh();
      return;
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setStatus("success");
      router.push("/thank-you");
      router.refresh();
      return;
    }

    setStatus("error");
  }

  return (
    <form
      className="card stack"
      action={async (formData) => {
        await handleSubmit(formData);
      }}
    >
      <div className="form-grid">
        <input className="field" name="name" placeholder="Имя" required />
        <input className="field" name="phone" placeholder="Телефон" required />
        <input className="field" name="email" placeholder="Email" type="email" required />
      </div>
      <textarea
        className="textarea"
        name="message"
        placeholder={compact ? "Кратко опишите задачу" : "Опишите изделие, размеры, материал и желаемые сроки"}
        required
      />
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
