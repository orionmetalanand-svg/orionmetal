"use client";

import { useState } from "react";
import { services } from "@/data/services";
import FileUpload from "./FileUpload";
import Button from "@/components/ui/Button";

const initialForm = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  website: "",
};

/** 16px text avoids iOS Safari zoom-on-focus; min-h keeps touch targets comfortable. */
const fieldClass =
  "w-full min-h-12 rounded-xl border border-white/[0.11] bg-white/[0.035] px-4 py-3.5 text-base text-white shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] placeholder:text-brand-faint transition-all duration-300 focus:border-brand-red/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(225,29,46,0.14)] focus:outline-none sm:text-sm";

const labelClass =
  "mb-2.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/60";

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setProgress(15);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    files.forEach((file) => formData.append("files", file));

    try {
      setProgress(45);
      const res = await fetch("/api/contact", { method: "POST", body: formData });
      setProgress(80);

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || { form: data.error || "Submission failed" });
        setStatus("error");
        setProgress(0);
        return;
      }

      setProgress(100);
      setStatus("success");
      setSuccessMessage(data.message || "Your enquiry has been sent successfully.");
      setForm(initialForm);
      setFiles([]);
    } catch {
      setStatus("error");
      setErrors({ form: "Network error. Please try again or contact us directly." });
      setProgress(0);
    }
  };

  if (status === "success") {
    return (
      <div
        className="panel relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-10 sm:py-14"
        role="status"
      >
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-brand-red/25 bg-brand-red/12 text-brand-red-bright">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h3 className="mt-7 text-xl font-extrabold text-white sm:text-2xl">Enquiry Sent</h3>
        <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-[1.75] text-brand-muted sm:text-sm">
          {successMessage}
        </p>
        <button
          type="button"
          className="mt-8 text-[10.5px] font-bold uppercase tracking-[0.2em] text-brand-red transition-colors hover:text-brand-red-bright"
          onClick={() => {
            setStatus("idle");
            setProgress(0);
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="panel relative space-y-6 overflow-hidden rounded-3xl p-5 sm:p-8"
      noValidate
    >
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

      <div>
        <h2 className="text-xl font-extrabold text-white sm:text-2xl">Send an Enquiry</h2>
        <p className="mt-2.5 text-[13px] text-brand-muted">
          Fields marked <span className="text-brand-red">*</span> are required.
        </p>
      </div>

      {errors.form && (
        <div
          className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3.5 text-[13.5px] text-red-300"
          role="alert"
        >
          {errors.form}
        </div>
      )}

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First Name <span className="text-brand-red">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            autoComplete="given-name"
            placeholder="John"
            className={fieldClass}
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && <p className="mt-1.5 text-xs text-red-400">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last Name <span className="text-brand-red">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            autoComplete="family-name"
            placeholder="Smith"
            className={fieldClass}
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && <p className="mt-1.5 text-xs text-red-400">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={form.company}
            onChange={handleChange}
            autoComplete="organization"
            placeholder="Your company"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-brand-red">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="you@company.com.au"
            className={fieldClass}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            autoComplete="tel"
            placeholder="04XX XXX XXX"
            className={fieldClass}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="service" className={labelClass}>
            Service Required
          </label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className={`${fieldClass} appearance-none`}
          >
            <option value="" className="bg-brand-black">
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.name} className="bg-brand-black">
                {s.name}
              </option>
            ))}
            <option value="Other" className="bg-brand-black">
              Other / Multiple
            </option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-brand-red">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Describe your project — materials, quantities, dimensions, finish and timeline."
          className={`${fieldClass} resize-y`}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
      </div>

      <FileUpload files={files} setFiles={setFiles} error={fileError} setError={setFileError} />

      {status === "submitting" && progress > 0 && (
        <div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-red to-brand-red-bright transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-faint">
            Uploading… {progress}%
          </p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </Button>
    </form>
  );
}
