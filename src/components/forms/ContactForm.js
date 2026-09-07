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

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
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
    setUploadProgress(10);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    files.forEach((file) => formData.append("files", file));

    try {
      setUploadProgress(40);
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      setUploadProgress(80);
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || { form: data.error || "Submission failed" });
        setStatus("error");
        setUploadProgress(0);
        return;
      }

      setUploadProgress(100);
      setStatus("success");
      setSuccessMessage(data.message || "Your enquiry has been sent successfully.");
      setForm(initialForm);
      setFiles([]);
    } catch {
      setStatus("error");
      setErrors({ form: "Network error. Please try again or contact us directly." });
      setUploadProgress(0);
    }
  };

  if (status === "success") {
    return (
      <div className="border border-green-200 bg-green-50 p-8 text-center" role="status">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-green-100 text-green-600">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800">Enquiry Sent</h3>
        <p className="mt-2 text-green-700">{successMessage}</p>
        <button
          type="button"
          className="mt-6 text-sm font-semibold text-brand-red hover:underline"
          onClick={() => {
            setStatus("idle");
            setUploadProgress(0);
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {errors.form && (
        <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          {errors.form}
        </div>
      )}

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

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">
            First Name <span className="text-brand-red">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-brand-red focus:outline-none"
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-700">
            Last Name <span className="text-brand-red">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-brand-red focus:outline-none"
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-brand-red focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            Email <span className="text-brand-red">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-brand-red focus:outline-none"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-brand-red focus:outline-none"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-medium text-gray-700">
            Service
          </label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-brand-red focus:outline-none"
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
          Message <span className="text-brand-red">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-brand-red focus:outline-none"
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      <FileUpload
        files={files}
        setFiles={setFiles}
        error={fileError}
        setError={setFileError}
      />

      {status === "submitting" && uploadProgress > 0 && (
        <div role="progressbar" aria-valuenow={uploadProgress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-2 w-full bg-gray-200">
            <div
              className="h-2 bg-brand-red transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Uploading...</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Send Enquiry"}
      </Button>
    </form>
  );
}
